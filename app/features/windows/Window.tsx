import React from 'react';
import { WindowEntity } from './windowsSlice';

interface WindowProps {
  window: WindowEntity;
}

const Window: React.FC<WindowProps> = ({ window }) => {
  // Added type annotation for the style object
  const style: React.CSSProperties = {
    position: 'absolute', // added absolute positioning
    top: window.position.y, // using top property
    left: window.position.x, // using left property
    width: window.size.width,
    height: window.size.height,
    border: '1px solid black',
    backgroundColor: 'white',
    // zIndex could be handled via the windowsOrder state
  };

  return (
    <div
      style={style}
      className={`window ${window.isMinimized ? 'minimized' : ''}`}
    >
      <div className="window-header">
        <img src={window.iconPath} alt="window icon" className="window-icon" />
        <span className="window-title">{window.entityId}</span>
      </div>
      <div className="window-content">
        {/* Render content based on window.entityId */}
        Content for entity {window.entityId}
      </div>
    </div>
  );
};

export default Window;
