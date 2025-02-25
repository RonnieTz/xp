import React from 'react';
import Image from 'next/image';
import closeIcon from '@/public/Exit.png';

interface ExitButtonProps {
  buttonStyle: React.CSSProperties;
  close: () => void;
}

const ExitButton: React.FC<ExitButtonProps> = ({ buttonStyle, close }) => {
  return (
    <div
      className="exit-button"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        close();
      }}
    >
      <Image style={buttonStyle} src={closeIcon} alt="exit" />
    </div>
  );
};

export default ExitButton;
