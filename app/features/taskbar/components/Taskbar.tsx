import React from 'react';
import SystemTray from './SystemTray';
import StartButton from './StartButton';
import { useAppSelector, useAppDispatch } from '../../../hooks/reduxHooks';
import { toggleMenu } from '../../startMenu/startMenuSlice';

export default function Taskbar() {
  const dispatch = useAppDispatch();
  const { menuIsOpen } = useAppSelector((state) => state.startMenu);
  const toggleStartMenu = () => dispatch(toggleMenu());

  return (
    <div
      style={{
        width: '100%',
        height: '40px',
        background: '#000',
        backgroundImage: "url('/taskbar-background.jpg')",
        backgroundSize: 'cover',
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        zIndex: 100,
      }}
    >
      <StartButton onToggleStartMenu={toggleStartMenu} isOpen={menuIsOpen} />
      {/* ...other taskbar items... */}
      <div style={{ marginLeft: 'auto', height: '100%' }}>
        <SystemTray />
      </div>
    </div>
  );
}
