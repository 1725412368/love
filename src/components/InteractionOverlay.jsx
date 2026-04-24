import React, { useEffect, useRef } from 'react';
import './InteractionOverlay.css';

const InteractionOverlay = ({ type, url, onClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (type === 'video' && videoRef.current) {
      // 显式调用 play()
      videoRef.current.play().catch(error => {
        console.error("视频播放失败:", error);
      });
    }
  }, [type, url]);

  return (
    <div className="interaction-overlay" onClick={onClose}>
      <div className="media-container" onClick={e => e.stopPropagation()}>
        {type === 'video' ? (
          <video 
            ref={videoRef}
            src={url} 
            muted // 建议先静音测试
            playsInline
            className="interaction-media"
          />
        ) : (
          <img src={url} className="interaction-media" alt="interaction" />
        )}
        {/* ... */}
      </div>
    </div>
  );}

export default InteractionOverlay;