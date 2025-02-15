'use client';
import React, { useState, useEffect } from 'react';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';

export default function Desktop() {
  const [showStartMenu, setShowStartMenu] = useState(false);

  useEffect(() => {
    console.log('Desktop mounted');
  }, []);

  const toggleStartMenu = () => setShowStartMenu((prev) => !prev);

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
      {/* ...existing desktop items... */}
      {showStartMenu && <StartMenu />}
      <Taskbar onToggleStartMenu={toggleStartMenu} />
    </div>
  );
}
