import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { useAppSelector, useAppDispatch } from '@/app/hooks/reduxHooks';
import {
  minimizeWindow,
  focusWindow,
  restoreWindow,
} from '../../windows/windowsSlice';
import styles from './Task.module.css';
import { useEntities } from '@/app/hooks/useEntities';
import { useModalWindow } from '../../windows/hooks/useModalWindow';

interface TaskProps {
  iconPath: StaticImageData;
  title: string;
  isFocused: boolean;
  windowId: string; // added window identifier
}

export default function Task({
  iconPath,
  title,
  isFocused: propIsFocused,
  windowId,
}: TaskProps) {
  const dispatch = useAppDispatch();
  const { windowsOrder, windows, focusedWindow } = useAppSelector(
    (state) => state.windows
  );
  const window = windows.find((win) => win.id === windowId);
  const { entities } = useEntities();
  const { hasActiveModals } = useModalWindow();

  // Get the current folder entity based on the navigation history
  const currentFolderId = window?.navigationHistory?.current;
  const currentEntity = currentFolderId
    ? entities.find((entity) => entity.id === currentFolderId)
    : entities.find((entity) => entity.id === window?.entityId);

  // Use the current entity name, or fall back to window title
  const displayName = currentEntity?.name || title;

  // Check if any of this window's modals are currently focused
  const childModalWindows = windows.filter(
    (w) => w.isModal && w.parentId === windowId && w.isOpen
  );

  // A task is considered focused if either:
  // 1. The window itself is focused, OR
  // 2. Any of the window's child modals are focused
  const hasModalFocused = childModalWindows.some(
    (modal) => modal.id === focusedWindow
  );
  const isFocused = propIsFocused || hasModalFocused;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!isFocused) {
      dispatch(restoreWindow(windowId));

      // If this window has an open modal, we need to focus that instead
      const hasOpenModal = window?.hasOpenModal || false;

      if (hasOpenModal) {
        // Find the child modal windows that belong to this window
        const childModalWindows = windows.filter(
          (w) => w.isModal && w.parentId === windowId && w.isOpen
        );

        // Get the active modal window ID (the top-most one)
        if (childModalWindows.length > 0) {
          const activeModalId =
            childModalWindows[childModalWindows.length - 1].id;
          // Focus the modal instead of the parent window
          dispatch(focusWindow(activeModalId));
        } else {
          dispatch(focusWindow(windowId));
        }
      } else {
        dispatch(focusWindow(windowId));
      }
    } else {
      dispatch(minimizeWindow(windowId));
      const currentIndex = windowsOrder.indexOf(windowId);
      if (windowsOrder.length > 0) {
        const nextIndex = (currentIndex + 1) % windowsOrder.length;
        const nextWindowId = windowsOrder[nextIndex];
        dispatch(focusWindow(nextWindowId));
      }
    }
  };

  return (
    <div
      className={`${styles.container} ${isFocused ? styles.focused : ''}`}
      onClick={handleClick}
    >
      <Image
        src={iconPath}
        alt={displayName}
        width={30}
        height={30}
        className={styles.icon}
      />
      <span className={styles.title}>{displayName}</span>
    </div>
  );
}
