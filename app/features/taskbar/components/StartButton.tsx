import React, { useState } from 'react';
import Tooltip from './Tooltip';

interface StartButtonProps {
  onToggleStartMenu: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isOpen: boolean;
}

export default function StartButton({
  onToggleStartMenu,
  isOpen,
}: StartButtonProps) {
  const [isHovered, setHovered] = useState(false);

  return (
    <Tooltip text="Click here to begin">
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
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClickCapture={(e) => {
          e.stopPropagation(); // prevent click from bubbling up and closing menu
          onToggleStartMenu(e);
        }}
      />
    </Tooltip>
  );
}
