import React, { useState } from 'react';

interface TaskbarProps {
  onToggleStartMenu: () => void;
}

export default function Taskbar({ onToggleStartMenu }: TaskbarProps) {
  const [isHovered, setHovered] = useState(false);
  const [isOpen, setOpen] = useState(false);

  return (
    <div
      style={{
        width: '100%',
        height: '40px',
        background: '#333',
        backgroundImage: "url('/taskbar-background.jpg')",
        backgroundSize: 'cover',
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        zIndex: 100,
      }}
    >
      <button
        style={{
          width: '130px',
          height: '100%',
          background: 'none',
          border: 'none',
          backgroundImage: `url(${
            isOpen
              ? '/start-button-open.png'
              : isHovered
              ? '/start-button-hover.png'
              : '/start-button-normal.png'
          })`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          //   backgroundPosition: 'center',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          setOpen(!isOpen);
          onToggleStartMenu();
        }}
      />
      {/* ...other taskbar items... */}
    </div>
  );
}
