import React from 'react';
import SystemTray from './SystemTray';
import StartButton from './StartButton';
import { useAppSelector, useAppDispatch } from '../../../hooks/reduxHooks';
import { toggleMenu } from '../../startMenu/startMenuSlice';
import Task from './Task';
import folderIcon from '@/public/Folder Closed.png';
import styles from './Taskbar.module.css';

export default function Taskbar() {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const { windows, focusedWindow } = useAppSelector((state) => state.windows);
  const dispatch = useAppDispatch();
  const { menuIsOpen } = useAppSelector((state) => state.startMenu);
  const toggleStartMenu = () => dispatch(toggleMenu());

  return (
    <div className={styles.taskbar}>
      <StartButton onToggleStartMenu={toggleStartMenu} isOpen={menuIsOpen} />

      {tasks.map((windowId) => {
        const windowData = windows.find((win) => win.id === windowId);
        return (
          <Task
            key={windowId}
            iconPath={windowData?.iconPath || folderIcon}
            title={windowData?.title || 'Untitled'}
            isFocused={windowId === focusedWindow}
            windowId={windowId}
          />
        );
      })}

      <div style={{ marginLeft: 'auto', height: '100%' }}>
        <SystemTray />
      </div>
    </div>
  );
}
