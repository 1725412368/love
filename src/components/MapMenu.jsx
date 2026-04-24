import React from 'react';
import './MapMenu.css';
import mapData from '../data/mapData.json';

const MapMenu = ({ onTravel }) => {
  return (
    <div className="map-container">
      <h2 className="map-title">选择前往的地点</h2>
      <div className="location-list">
        {mapData.map(location => (
          <div 
            key={location.id} 
            className="location-card"
            onClick={() => onTravel(location.entryScene)}
          >
            {location.npcId && (
            <div className="npc-avatar-wrapper">
              <img 
                src={`/avatars/${location.npcId}.png`} 
                className="npc-map-avatar" 
                alt="NPC" 
              />
              <div className="pulse-ring"></div> {/* 增加一个呼吸灯特效 */}
            </div>
          )}
            <h3>{location.name}</h3>
            <p>{location.description}</p>
            {location.npcs.length > 0 && (
              <span className="npc-tag">有 NPC 在此</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapMenu;

// import React from 'react';
// import mapData from '../data/mapData.json';
// import './MapMenu.css';

// const MapMenu = ({ onTravel, onBack }) => {
//   return (
//     <div className="map-container">
//       {/* 地图背景图 */}
//       <img src="/backgrounds/campus_map.jpg" className="map-bg" alt="Map" />

//       {/* 返回主界面的按钮 */}
//       <button className="back-home-btn" onClick={onBack}>⬅ 返回房间</button>

//       {mapData.map((location) => (
//         <div 
//           key={location.id}
//           className="location-point"
//           style={{ left: location.x, top: location.y }}
//         >
//           {/* NPC 头像展示 */}
//           {location.npcId && (
//             <div className="npc-avatar-wrapper">
//               <img 
//                 src={`/avatars/${location.npcId}.jpg`} 
//                 className="npc-map-avatar" 
//                 alt="NPC" 
//               />
//               <div className="pulse-ring"></div> {/* 增加一个呼吸灯特效 */}
//             </div>
//           )}

//           {/* 地图交互按钮 */}
//           <button 
//             className="location-btn" 
//             onClick={() => onTravel(location.entryScene)}
//           >
//             <span className="location-name">{location.name}</span>
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MapMenu;