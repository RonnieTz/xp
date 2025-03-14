import { useState, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks/reduxHooks';
import {
  closeWindow,
  openWindow,
  focusWindow,
  minimizeWindow,
  maximizeWindow,
  unmaximizeWindow,
  resetNavigationHistory,
  closeParentModals,
} from '@/app/features/windows/windowsSlice';
import { addTask, removeTask } from '@/app/features/tasks/tasksSlice';
import { useModalWindow } from './useModalWindow';

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
  const { focusedWindow, windowsOrder, windows } = useAppSelector(
    (state) => state.windows
  );
  const { hasActiveModals } = useModalWindow();

  const window = windows.find((w) => w.id === windowId);
  const isModal = window?.isModal || false;
  const parentId = window?.parentId;
  const hasOpenModal = window?.hasOpenModal || false;

  // Get modal windows that belong to this window
  const childModalWindows = windows.filter(
    (w) => w.isModal && w.parentId === windowId && w.isOpen
  );

  // Get the active modal window ID (the top-most one)
  const activeModalId =
    childModalWindows.length > 0
      ? childModalWindows[childModalWindows.length - 1].id
      : null;

  // Focus the active modal instead of this window
  const focusActiveModal = useCallback(() => {
    if (activeModalId) {
      setTimeout(() => {
        dispatch(focusWindow(activeModalId));
      }, 100);
      setTimeout(() => {
        dispatch(focusWindow(''));
      }, 200);
      setTimeout(() => {
        dispatch(focusWindow(activeModalId));
      }, 300);
      setTimeout(() => {
        dispatch(focusWindow(''));
      }, 400);
      setTimeout(() => {
        dispatch(focusWindow(activeModalId));
      }, 500);

      return true;
    }
    return false;
  }, [dispatch, activeModalId]);

  const isFocused = focusedWindow === windowId;

  const open = () => {
    dispatch(openWindow(windowId));
    if (!isModal) {
      dispatch(addTask(windowId));
    }
  };

  const close = () => {
    // If this is a modal window, close it and focus the parent window
    if (isModal && parentId) {
      dispatch(closeWindow(windowId));
      // Focus the parent window after closing the modal
      setTimeout(() => {
        dispatch(focusWindow(parentId));
      }, 10);

      return;
    }

    // If this is a regular window with modals, ask for confirmation
    if (hasActiveModals(windowId)) {
      // This would typically show a confirmation dialog
      // For now, we'll just close all child modals and then the window
      dispatch(closeParentModals(windowId));
    }

    dispatch(resetNavigationHistory(windowId));
    dispatch(closeWindow(windowId));
    dispatch(removeTask(windowId));
  };

  const focus = () => {
    // If this window has an open modal, focus that modal instead
    if (hasOpenModal && focusActiveModal()) {
      return;
    }

    // Only allow focusing if no parent window has an active modal
    // If this is a modal window, it can always be focused
    if (isModal || !parentId) {
      dispatch(focusWindow(windowId));
    } else {
      const parentHasActiveModals = hasActiveModals(parentId);
      if (!parentHasActiveModals) {
        dispatch(focusWindow(windowId));
      }
    }
  };

  const minimize = () => {
    // Modal windows cannot be minimized
    if (!isModal) {
      dispatch(minimizeWindow(windowId));
    }
  };

  const maximize = () => {
    // Modal windows cannot be maximized
    if (!isModal) {
      dispatch(maximizeWindow(windowId));
    }
  };

  const unmaximize = () => {
    // Modal windows cannot be maximized/unmaximized
    if (!isModal) {
      dispatch(unmaximizeWindow(windowId));
    }
  };

  const [currentPos, setCurrentPos] = useState<Pos>(initialPos);
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef({ mouseX: 0, mouseY: 0, windowX: 0, windowY: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    const dx = e.clientX - startPosRef.current.mouseX;
    const dy = e.clientY - startPosRef.current.mouseY;
    const proposedY = startPosRef.current.windowY + dy;
    // Ensure newY is between 0 and parent's height - 80 (using window.innerHeight as parent's height)
    const newY = Math.min(
      Math.max(proposedY, 0),
      globalThis.window.innerHeight - 80
    );
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
    // No resizing for modal windows
    if (isModal) return;

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
    hasOpenModal,
    focusActiveModal,
    activeModalId,
  };
}
