'use client';
import React from 'react';
import Taskbar from '../taskbar/components/Taskbar';
import StartMenu from '../startMenu/components/StartMenu';
import EntityComponent from '../fileSystem/Entity';
import { useEntities } from '../../hooks/useEntities';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { unfocusWindow } from '../windows/windowsSlice';
import Window from '../windows/components/Window'; // added import
import './Desktop.css';

export default function Desktop() {
  const { entities, clearSelections, handleDrop, handleDragOver } =
    useEntities();
  const { menuIsOpen } = useAppSelector((state) => state.startMenu);
  const windows = useAppSelector((state) => state.windows.windows); // get windows
  const dispatch = useAppDispatch();

  const desktopEntities = entities.filter(
    (entity) => entity.folderId === 'root'
  );

  const handleDesktopClick = () => {
    clearSelections();
    dispatch(unfocusWindow());
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="desktopContainer"
      onClick={handleDesktopClick}
    >
      {desktopEntities.map((entity) => (
        <EntityComponent key={entity.id} entity={entity} />
      ))}
      {/* Render only windows that are open */}
      {windows.map((win) =>
        win.isOpen ? <Window key={win.id} window={win} /> : null
      )}
      {menuIsOpen && <StartMenu />}
      <Taskbar />
    </div>
  );
}
