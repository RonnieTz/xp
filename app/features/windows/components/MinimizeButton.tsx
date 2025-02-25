import React from 'react';
import Image from 'next/image';
import minimizeIcon from '@/public/Minimize.png';

interface MinimizeButtonProps {
  buttonStyle: React.CSSProperties;
  minimize: () => void;
}

const MinimizeButton: React.FC<MinimizeButtonProps> = ({
  buttonStyle,
  minimize,
}) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        minimize();
      }}
      className="minimize-button"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <Image style={buttonStyle} src={minimizeIcon} alt="minimize" />
    </div>
  );
};

export default MinimizeButton;
