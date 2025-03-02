import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { useAppSelector, useAppDispatch } from '@/app/hooks/reduxHooks';
import {
  minimizeWindow,
  focusWindow,
  restoreWindow,
} from '../../windows/windowsSlice';
import styles from './Task.module.css';

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
  const windowsOrder = useAppSelector((state) => state.windows.windowsOrder);
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
        alt={title}
        width={30}
        height={30}
        className={styles.icon}
      />
      <span className={styles.title}>{title}</span>
    </div>
  );
}
