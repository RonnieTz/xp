import React from 'react';

interface WindowContentProps {
  isMaximized: boolean;
}

const WindowContent: React.FC<WindowContentProps> = ({ isMaximized }) => {
  return (
    <div
      className="window-content"
      style={{
        width: isMaximized ? '100%' : undefined,
        height: isMaximized ? 'calc(100% - 80px)' : undefined,
        left: isMaximized ? 0 : undefined,
      }}
    >
      Content for the window
    </div>
  );
};

export default WindowContent;
