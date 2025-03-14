import React from 'react';
import { WindowEntity } from '../windowsState';
import WindowHeader from './WindowHeader';
import WindowContent from './WindowContent';
import './windowStyles.css';
import { useWindowManager } from '../hooks/useWindowManager';
import WindowBorders from './WindowBorders';
import ResizeAnchors from './ResizeAnchors';

interface WindowProps {
  window: WindowEntity;
}

const Window: React.FC<WindowProps> = ({ window }) => {
  const {
    isFocused,
    focus,
    currentPos,
    currentSize,
    handleMouseDown,
    isDragging,
    handleAnchorMouseDown,
    close,
    minimize,
    windowsOrder,
    maximize,
    unmaximize,
  } = useWindowManager(
    window.id,
    { x: window.position.x, y: window.position.y },
    { width: window.size.width, height: window.size.height }
  );

  const style: React.CSSProperties = {
    position: 'absolute',
    top: currentPos.y,
    left: currentPos.x,
    width: currentSize.width,
    height: currentSize.height,
    cursor: isDragging ? 'grabbing' : 'default',
    display: window.isMinimized ? 'none' : 'block',
    zIndex: windowsOrder.indexOf(window.id) + 1,
  };

  if (window.isMaximized) {
    style.top = 0;
    style.left = 0;
    style.width = '100%';
    style.height = '100%';
  }

  const disableInteractions = (e: any) => {
    if (window.hasOpenModal) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  };

  return (
    <div
      className="window-container"
      onDrop={(e) => e.stopPropagation()}
      style={style}
      onDoubleClickCapture={disableInteractions}
      onClickCapture={(e) => {
        focus();
        disableInteractions(e);
      }}
      onContextMenuCapture={disableInteractions}
      onClick={(e) => {
        e.stopPropagation();
        focus();
      }}
      onDragStart={(e) => {
        e.stopPropagation();
        e.preventDefault();
        focus();
        e.dataTransfer.setDragImage(new Image(), 0, 0);
      }}
    >
      <div
        onMouseDown={(e) => {
          handleMouseDown(e);
          if (window.isMaximized) return;
        }}
      >
        <WindowHeader
          isModal={window.isModal || false}
          window={window}
          isFocused={isFocused}
          close={close}
          minimize={minimize}
          maximize={maximize}
          unmaximize={unmaximize}
        />
      </div>
      <WindowContent window={window} currentWidth={currentSize.width} />
      {!window.isMaximized && (
        <>
          <WindowBorders isFocused={isFocused} />
          <ResizeAnchors handleAnchorMouseDown={handleAnchorMouseDown} />
        </>
      )}
    </div>
  );
};

export default Window;
