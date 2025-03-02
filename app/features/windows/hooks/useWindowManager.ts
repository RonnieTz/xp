import { useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks/reduxHooks';
import {
  closeWindow,
  openWindow,
  focusWindow,
  minimizeWindow,
  maximizeWindow,
  unmaximizeWindow,
} from '@/app/features/windows/windowsSlice';
import { addTask, removeTask } from '@/app/features/tasks/tasksSlice';

interface Pos {
  x: number;
  y: number;
}
interface Size {
  width: number;
  height: number;
}

export function useWindowManager(
  windowId: string,
  initialPos: Pos,
  initialSize: Size
) {
  const dispatch = useAppDispatch();
  const { focusedWindow, windowsOrder } = useAppSelector(
    (state) => state.windows
  );
  const isFocused = focusedWindow === windowId;

  const open = () => {
    dispatch(openWindow(windowId));
    dispatch(addTask(windowId));
  };

  const close = () => {
    dispatch(closeWindow(windowId));
    dispatch(removeTask(windowId));
  };

  const focus = () => dispatch(focusWindow(windowId));
  const minimize = () => dispatch(minimizeWindow(windowId));
  const maximize = () => dispatch(maximizeWindow(windowId));
  const unmaximize = () => dispatch(unmaximizeWindow(windowId));

  const [currentPos, setCurrentPos] = useState<Pos>(initialPos);
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef({ mouseX: 0, mouseY: 0, windowX: 0, windowY: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    const dx = e.clientX - startPosRef.current.mouseX;
    const dy = e.clientY - startPosRef.current.mouseY;
    const proposedY = startPosRef.current.windowY + dy;
    // Ensure newY is between 0 and parent's height - 80 (using window.innerHeight as parent's height)
    const newY = Math.min(Math.max(proposedY, 0), window.innerHeight - 80);
    setCurrentPos({
      x: startPosRef.current.windowX + dx,
      y: newY,
    });
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // only initiate dragging if left-click is used (e.button === 0)
    if (e.button !== 0) return;
    startPosRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      windowX: currentPos.x,
      windowY: currentPos.y,
    };
    setIsDragging(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Resizing logic for 8 anchors
  const [currentSize, setCurrentSize] = useState<Size>(initialSize);
  const resizingRef = useRef({
    anchor: '' as
      | ''
      | 'top'
      | 'bottom'
      | 'left'
      | 'right'
      | 'top-left'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-right',
    mouseX: 0,
    mouseY: 0,
    pos: currentPos,
    size: currentSize,
  });

  const MIN_SIZE = 400; // minimum width or height

  const handleResizeMouseMove = (e: MouseEvent) => {
    const { anchor, mouseX, mouseY, pos, size } = resizingRef.current;
    const deltaX = e.clientX - mouseX;
    const deltaY = e.clientY - mouseY;
    let newPos = { ...pos };
    let newSize = { ...size };
    focus();

    if (anchor.includes('top')) {
      let effectiveDeltaY = deltaY;
      if (pos.y + deltaY < 0) {
        effectiveDeltaY = -pos.y; // prevent top from going below 0
      }
      const proposedHeight = size.height - effectiveDeltaY;
      if (proposedHeight < MIN_SIZE) {
        const adjustedDeltaY = size.height - MIN_SIZE;
        newSize.height = MIN_SIZE;
        newPos.y = pos.y + adjustedDeltaY;
        if (newPos.y < 0) newPos.y = 0;
      } else {
        newSize.height = proposedHeight;
        newPos.y = pos.y + effectiveDeltaY;
      }
    }
    if (anchor.includes('bottom')) {
      newSize.height = Math.max(size.height + deltaY, MIN_SIZE);
    }
    if (anchor.includes('left')) {
      const newWidth = size.width - deltaX;
      if (newWidth < MIN_SIZE) {
        const adjustedDeltaX = size.width - MIN_SIZE;
        newSize.width = MIN_SIZE;
        newPos.x = pos.x + adjustedDeltaX;
      } else {
        newSize.width = newWidth;
        newPos.x = pos.x + deltaX;
      }
    }
    if (anchor.includes('right')) {
      newSize.width = Math.max(size.width + deltaX, MIN_SIZE);
    }

    setCurrentPos(newPos);
    setCurrentSize(newSize);
  };

  const handleResizeMouseUp = () => {
    document.removeEventListener('mousemove', handleResizeMouseMove);
    document.removeEventListener('mouseup', handleResizeMouseUp);
  };

  const handleAnchorMouseDown = (
    anchor:
      | 'top'
      | 'bottom'
      | 'left'
      | 'right'
      | 'top-left'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-right',
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    e.preventDefault();
    resizingRef.current = {
      anchor,
      mouseX: e.clientX,
      mouseY: e.clientY,
      pos: currentPos,
      size: currentSize,
    };
    document.addEventListener('mousemove', handleResizeMouseMove);
    document.addEventListener('mouseup', handleResizeMouseUp);
  };

  return {
    open,
    close,
    focus,
    isFocused,
    currentPos,
    currentSize,
    handleMouseDown,
    isDragging,
    handleAnchorMouseDown,
    minimize,
    windowsOrder,
    maximize,
    unmaximize,
  };
}
