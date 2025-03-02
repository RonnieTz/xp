'use client';
import React from 'react';
import Taskbar from '../taskbar/components/Taskbar';
import StartMenu from '../startMenu/components/StartMenu';
import EntityComponent from '../fileSystem/Entity';
import { useEntities } from '../../hooks/useEntities';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { unfocusWindow } from '../windows/windowsSlice';
import Window from '../windows/components/Window';
import { useOpenSelectedEntities } from '../../hooks/useOpenSelectedEntities';
import { useArrowSelection } from '../../hooks/useArrowSelection';
import './Desktop.css';

export default function Desktop() {
  const { entities, clearSelections, handleDrop, handleDragOver } =
    useEntities();
  const { menuIsOpen } = useAppSelector((state) => state.startMenu);
  const windows = useAppSelector((state) => state.windows.windows);
  const dispatch = useAppDispatch();
  const { handleEnter } = useOpenSelectedEntities();
  const { handleArrowKey } = useArrowSelection();

  const desktopEntities = entities.filter(
    (entity) => entity.folderId === 'root'
  );

  const handleDesktopClick = () => {
    clearSelections();
    dispatch(unfocusWindow());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleEnter();
    } else if (
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight'
    ) {
      handleArrowKey(
        e.key as 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'
      );
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleDesktopClick}
      onKeyDown={handleKeyDown}
      tabIndex={0} // ensure the element is focusable
      className="desktopContainer"
    >
      {desktopEntities.map((entity) => (
        <EntityComponent key={entity.id} entity={entity} />
      ))}
      {windows.map((win) =>
        win.isOpen ? <Window key={win.id} window={win} /> : null
      )}
      {menuIsOpen && <StartMenu />}
      <Taskbar />
    </div>
  );
}
