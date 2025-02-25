import React from 'react';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { openAllProgramsMenu } from '../startMenuSlice';
import './AllProgramsMenu.css';

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

  return (
    <div
      className={`all-programs-menu ${position} ${root ? 'root' : ''} fade-in`}
      onMouseEnter={() => dispatch(openAllProgramsMenu())}
    >
      <div className="vertical-bar" />
      <div className="content">
        {children}
        {!children && <div className="empty">(Empty)</div>}
      </div>
    </div>
  );
}
