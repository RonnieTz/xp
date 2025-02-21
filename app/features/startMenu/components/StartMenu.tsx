import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import useClickOutside from '../../../hooks/useClickOutside';
import { useAppSelector, useAppDispatch } from '../../../hooks/reduxHooks';
import { closeMenu } from '../startMenuSlice';
import StartMenuColumnLeft from './StartMenuColumnLeft';
import StartMenuColumnRight from './StartMenuColumnRight';
import './StartMenu.css';

const menuStyle: React.CSSProperties = {
  background: "url('menu.jpg') center/cover no-repeat",
  border: '1px solid #000',
  borderRadius: '4px',
  position: 'absolute',
  bottom: '40px',
  left: '0px',
  boxShadow: '2px 2px 5px rgba(0,0,0,0.4)',
  zIndex: 10100,
  overflow: 'visible',
};

export default function StartMenu() {
  const menuIsOpen = useAppSelector((state) => state.startMenu.menuIsOpen);
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useClickOutside(menuRef, () => dispatch(closeMenu()));

  return (
    <CSSTransition
      in={menuIsOpen}
      appear
      timeout={300}
      classNames="start-menu"
      unmountOnExit
      nodeRef={menuRef}
    >
      <div ref={menuRef} className="start-menu" style={menuStyle}>
        <StartMenuColumnLeft />
        <StartMenuColumnRight />
      </div>
    </CSSTransition>
  );
}
