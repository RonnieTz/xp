import React from 'react';

export default function StartMenu() {
  return (
    <div
      style={{
        width: '300px',
        height: '500px',
        background: 'linear-gradient(to bottom, #E5ECF9, #C3D9F9)', // updated for Windows XP style
        border: '1px solid #000', // add border for classic look
        borderRadius: '4px', // slight rounding like XP menus
        position: 'absolute',
        bottom: '40px',
        left: '0px',
        boxShadow: '2px 2px 5px rgba(0,0,0,0.4)', // adjusted shadow
        zIndex: 101,
      }}
    >
      {/* ...start menu items... */}
      <ul>
        <li>Program 1</li>
        <li>Program 2</li>
      </ul>
    </div>
  );
}
