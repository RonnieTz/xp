import React, { useCallback, memo } from 'react';
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

const WindowHeaderWrapper = memo(
  ({
    window,
    isFocused,
    close,
    minimize,
    maximize,
    unmaximize,
    handleMouseDown,
  }: {
    window: WindowEntity;
    isFocused: boolean;
    close: () => void;
    minimize: () => void;
    maximize: () => void;
    unmaximize: () => void;
    handleMouseDown: (e: React.MouseEvent) => void;
  }) => (
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
  )
);

const MemoizedWindowContent = memo(WindowContent);
const MemoizedWindowBorders = memo(WindowBorders);
const MemoizedResizeAnchors = memo(ResizeAnchors);

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

  const disableInteractions = useCallback(
    (e: any) => {
      if (window.hasOpenModal) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    },
    [window.hasOpenModal]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      focus();
    },
    [focus]
  );

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      e.stopPropagation();
      e.preventDefault();
      focus();
      e.dataTransfer.setDragImage(new Image(), 0, 0);
    },
    [focus]
  );

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
      onClick={handleClick}
      onDragStart={handleDragStart}
    >
      <WindowHeaderWrapper
        window={window}
        isFocused={isFocused}
        close={close}
        minimize={minimize}
        maximize={maximize}
        unmaximize={unmaximize}
        handleMouseDown={handleMouseDown}
      />
      <MemoizedWindowContent window={window} currentWidth={currentSize.width} />
      {!window.isMaximized && (
        <>
          <MemoizedWindowBorders isFocused={isFocused} />
          {!window.isModal && (
            <MemoizedResizeAnchors
              handleAnchorMouseDown={handleAnchorMouseDown}
            />
          )}
        </>
      )}
    </div>
  );
};

export default memo(Window);
