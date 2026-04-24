import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogueBox from './components/DialogueBox';
import StatusPanel from './components/StatusPanel';
import { setActiveCharacter } from './store/npcSlice';
import MapMenu from './components/MapMenu'; // 确保你创建了这个文件
import InteractionOverlay from './components/InteractionOverlay';

// 引入数据和动作
import { increaseAffection, updateMood } from './store/npcSlice';
import dialogueData from './data/dialogueData.json';

function App() {

  // 将初始状态改为 'HOME'
  const [gameState, setGameState] = useState('HOME'); 
  const [sceneId, setSceneId] = useState('');
  
  const dispatch = useDispatch();
  
  // --- 1. 统一管理状态 ---
  // const [gameState, setGameState] = useState('MAP'); // 初始状态设为地图
  // const [sceneId, setSceneId] = useState('start_node'); // 当前剧本ID
  
  // 从 Redux 获取所有 NPC 数据用于属性判定
  const [showInteraction, setShowInteraction] = useState(false);
  const characters = useSelector(state => state.npc.characters);

  // 获取当前剧本和活跃 NPC
  const currentScene = dialogueData[sceneId];
  const activeId = currentScene?.activeId;
  const currentNPC = characters[activeId];

  // 判定是否可以显示互动按钮
  const canInteract = currentScene?.interaction && 
                      currentNPC?.affection >= currentScene.interaction.requiredAffection;

  // --- 2. 逻辑处理核心 ---
  
  // 根据当前的 sceneId 获取剧本内容

  

  // 属性判定函数
  const checkCondition = (condition) => {
    if (!condition) return { met: true };
    const { type, min, target } = condition;
    const currentVal = characters[target][type];
    return { met: currentVal >= min };
  };

  // 处理地图跳转
  const handleTravel = (entrySceneId) => {
    setSceneId(entrySceneId);
    setGameState('DIALOGUE');
    // 根据剧本 ID 的前缀来判断（这是一种简单的技巧）
  if (entrySceneId.startsWith('lin')) {
    dispatch(setActiveCharacter('girl1'));
  } else if (entrySceneId.startsWith('su')) {
    dispatch(setActiveCharacter('girl2'));
  }
  };

  // 处理对话选项点击
  const handleSelect = (option) => {
    // 如果选项是“返回地图”或剧情结束
    setActiveInteraction(null);
    if (option.isEnd) {
      setGameState('HOME');
      return;
    }

    // 处理属性变化
    if (option.impact) {
      const { type, value, target } = option.impact;
      if (type === 'affection') dispatch(increaseAffection({ charId: target, amount: value }));
      if (type === 'mood') dispatch(updateMood({ charId: target, amount: value }));
    }

    // 剧本跳转
    if (option.nextId && dialogueData[option.nextId]) {
      setSceneId(option.nextId);
    } else {
      // 如果没有下一个场景了，默认回地图
      setGameState('MAP');
    }
  };

  // --- 3. 渲染逻辑 ---
  
  // 预处理对话选项（加入禁用判定）
  const processedOptions = currentScene?.options.map(option => ({
    ...option,
    disabled: !checkCondition(option.condition).met
  })) || [];

  const [activeInteraction, setActiveInteraction] = useState(null);

  return (
    <div className="App">
    {/* 状态栏：只有在非家模式下显示 */}
    {gameState !== 'HOME' && <StatusPanel />}

    {/* 核心视图切换 */}
    {(() => {
      switch (gameState) {
        case 'HOME':
          return (
            <div className="home-view">
              <img src="/backgrounds/home_bg.jpg" className="full-bg" alt="home" />
              <div className="home-menu">
                <button className="map-trigger-btn" onClick={() => setGameState('MAP')}>
                  🗺️ 出发（地图）
                </button>
              </div>
            </div>
          );

        case 'MAP':
          return (
            <MapMenu 
              onTravel={handleTravel} 
              onBack={() => setGameState('HOME')} 
            />
          );

        case 'DIALOGUE':
  return currentScene ? (
    <div className="dialogue-screen"> {/* 增加这个容器 */}
      <DialogueBox 
        name={currentScene.name}
        text={currentScene.text}
        options={processedOptions}
        onSelect={handleSelect}
        charImageInfo={currentScene.characterImage}
        interactionMedia={activeInteraction}
      />

      {canInteract && !activeInteraction && (
        <button 
          className="interaction-trigger-btn"
          onClick={() => setActiveInteraction(currentScene.interaction)}
        >
          ✨ {currentScene.interaction.label}
        </button>
      )}

      {activeInteraction && (
        <button 
          className="stop-interaction-btn"
          onClick={() => setActiveInteraction(null)}
        >
          结束互动
        </button>
      )}
    </div>
  ) : null;

        default:
          return null;
      }
    })()}

    {/* 确保这里后面没有多余的 MapMenu 标签了 */}
  </div>
  );
}

export default App;