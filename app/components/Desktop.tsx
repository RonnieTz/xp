'use client';
import React from 'react';
import Taskbar from '../features/taskbar/components/Taskbar';
import StartMenu from '../features/startMenu/components/StartMenu';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks'; // use custom hooks
import { toggleMenu } from '../features/startMenu/startMenuSlice';
import EntityComponent from '../features/fileSystem/Entity'; // import the Entity component

export default function Desktop() {
  const dispatch = useAppDispatch();
  const { menuIsOpen } = useAppSelector((state) => state.startMenu);
  // Select entities from the fileSystem slice and filter by desktop (folderId === 'root')
  const entities = useAppSelector((state) => state.fileSystem.entities);
  const desktopEntities = entities.filter(
    (entity) => entity.folderId === 'root'
  );

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: 'url("/wallpaper.webp")',
        backgroundSize: 'cover',
        position: 'relative',
      }}
    >
      {/* Render only desktop entities */}
      {desktopEntities.map((entity) => (
        <EntityComponent key={entity.id} entity={entity} />
      ))}
      {menuIsOpen && <StartMenu />}
      <Taskbar />
    </div>
  );
}
