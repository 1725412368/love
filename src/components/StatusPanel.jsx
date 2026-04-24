import React from 'react';
import { useSelector } from 'react-redux';
import './StatusPanel.css';

const StatusPanel = () => {
  // 从 Redux 获取当前选中的角色信息
  const activeId = useSelector((state) => state.npc.activeCharacterId);
  const character = useSelector((state) => state.npc.characters[activeId]);

  
  if (!character) return null;

  // 在 StatusPanel.jsx 中
const getShameColor = (val) => {
  if (val > 80) return '#ff69b4'; // 羞耻度极高时显示粉色
  if (val > 50) return '#ffbcbc'; 
  return '#eee';
};

const affectionPercent = Math.min(100, character.affection);
const handleReset = () => {
  if (window.confirm("确定要删除所有记忆（存档）重新开始吗？")) {
    localStorage.removeItem('sea_king_save');
    window.location.reload(); // 刷新页面重新开始
  }
};

  return (
    <div className="status-panel">
      <h3>{character.name} 的状态</h3>
      <div className="stat-item">
        <span>好感度:</span>
        <div className="bar-bg">
          <div 
            className="bar-fill" 
            style={{ 
              width: `${affectionPercent}%`,
              backgroundColor: affectionPercent >= 50 ? '#ff4d4d' : '#ff6b6b' // 满值时变色提醒
            }}
          ></div>
        </div>
        <span>{character.affection}</span>
      </div>
      <div className="stat-item">
        <span>心情:</span>
        <span>{character.mood}</span>
      </div>
      <div className="stat-item">
        <span>体力:</span>
        <span>{character.stamina}</span>
      </div>
      <div className="stat-item">
        <span>羞耻度:</span>
        <span>{character.shame}</span>
      </div>
      <button onClick={handleReset} style={{marginTop: '10px', fontSize: '10px', opacity: 0.5}}>
  重置游戏
</button>
    </div>
  );
};

export default StatusPanel;