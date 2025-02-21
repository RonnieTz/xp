import React from 'react';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { openAllProgramsMenu } from '../startMenuSlice';

interface AllProgramsMenuProps {
  position: 'top' | 'bottom';
  children: React.ReactNode;
  root?: boolean;
}

export default function AllProgramsMenu({
  position = 'bottom',
  children,
  root = false,
}: AllProgramsMenuProps) {
  const dispatch = useAppDispatch();

  const menuStyle: React.CSSProperties = {
    position: 'absolute',
    ...(position === 'top' ? { top: 0 } : { bottom: 0 }),
    left: root ? '78%' : '100%', // set left based on root prop
    display: 'flex',
    border: '1.5px solid #55a1ff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.7)',
    zIndex: 101000,
    backgroundColor: '#fff',
    cursor: 'default',
  };

  const verticalBarStyle: React.CSSProperties = {
    width: 5,
    background: '#2d7ce2',
  };

  const contentStyle: React.CSSProperties = {
    background: '#fff',
    flexGrow: 1,
  };

  return (
    <div style={menuStyle} onMouseEnter={() => dispatch(openAllProgramsMenu())}>
      <div style={verticalBarStyle} />
      <div style={contentStyle}>
        {children}
        {!children && (
          <div style={{ padding: '0 10px', fontSize: 13 }}>(Empty)</div>
        )}
      </div>
    </div>
  );
}
