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

interface TaskProps {
  iconPath: StaticImageData;
  title: string;
  isFocused: boolean;
  windowId: string; // added window identifier
}

export default function Task({
  iconPath,
  title,
  isFocused,
  windowId,
}: TaskProps) {
  const dispatch = useAppDispatch();
  const { windowsOrder, windows } = useAppSelector((state) => state.windows);
  const window = windows.find((win) => win.id === windowId);
  const { entities } = useEntities();

  // Get the current folder entity based on the navigation history
  const currentFolderId = window?.navigationHistory?.current;
  const currentEntity = currentFolderId
    ? entities.find((entity) => entity.id === currentFolderId)
    : entities.find((entity) => entity.id === window?.entityId);

  // Use the current entity name, or fall back to window title
  const displayName = currentEntity?.name || title;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!isFocused) {
      dispatch(focusWindow(windowId));
      dispatch(restoreWindow(windowId));
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
