import React, { useState, useEffect } from 'react';
import Tooltip from './Tooltip';

export default function SystemTray() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', { hour12: false });
  // new date format: day dd/mm/yyyy
  const dayName = time.toLocaleDateString('en-US', { weekday: 'short' });
  const day = String(time.getDate()).padStart(2, '0');
  const month = String(time.getMonth() + 1).padStart(2, '0');
  const year = time.getFullYear();
  const formattedDate = `${dayName} ${day}/${month}/${year}`;

  return (
    <Tooltip text={formattedDate}>
      <div
        style={{
          width: '120px', // updated width
          height: '100%',
          marginLeft: 'auto', // positions tray at right
          background: "url('/systemtray.jpg')",
          backgroundSize: '100% 100%', // stretch fully
          backgroundRepeat: 'no-repeat',
          display: 'flex', // added for centering
          alignItems: 'center', // center vertically
          justifyContent: 'center', // center horizontally
        }}
      >
        <span
          style={{
            color: '#fff',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
            fontSize: '13px', // updated font size
          }}
        >
          {formattedTime}
        </span>
      </div>
    </Tooltip>
  );
}
