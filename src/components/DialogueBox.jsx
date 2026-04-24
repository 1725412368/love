import React, { useRef, useEffect } from 'react';
import './DialogueBox.css';

const DialogueBox = ({ name, text, options, onSelect, charImageInfo, interactionMedia }) => {
  const videoRef = useRef(null);

  // 监听互动媒体变化，自动播放视频
  useEffect(() => {
    if (interactionMedia?.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(err => console.log("视频播放受限:", err));
    }
  }, [interactionMedia]);
console.log("当前立绘信息:", charImageInfo);
console.log("当前互动信息:", interactionMedia);
  return (
    <div className="game-container">
      {/* 角色立绘与视频舞台 */}
      <div className={`character-stage ${charImageInfo?.position || 'center'}`}>
  {interactionMedia ? (
    // 互动视频
    <video 
      key={interactionMedia.url} 
      src={interactionMedia.url}
      className="character-standing interaction-video"
      autoPlay loop playsInline
    />
  ) : (
    // 只有在 charImageInfo 存在时才渲染图片
    charImageInfo && (
      <img 
        key={`${charImageInfo.id}_${charImageInfo.pose}`} 
        src={`/characters/${charImageInfo.id}_${charImageInfo.pose}.jpg`} 
        className="character-standing fade-in" 
        alt={name} 
      />
    )
  )}
</div>

      {/* 对话框主体 */}
      <div className="dialogue-box">
        <div className="character-name">{name}</div>
        <div className="dialogue-text">
          <p>{text}</p>
        </div>
        
        {/* 选项区域 */}
        <div className="options-container">
          {options && options.map((option, index) => (
            <button 
              key={index} 
              className={`option-button ${option.disabled ? 'is-locked' : ''}`}
              onClick={() => onSelect(option)}
            >
              {option.label}
              {option.disabled && <span className="lock-icon"> 🔒</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; // <--- 之前可能漏了这个闭合函数的括号

export default DialogueBox;