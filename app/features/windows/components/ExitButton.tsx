import React from 'react';
import Image from 'next/image';
import closeIcon from '@/public/Exit.png';

interface ExitButtonProps {
  buttonStyle: React.CSSProperties;
  close: () => void;
  isModal: boolean;
}

const ExitButton: React.FC<ExitButtonProps> = ({
  buttonStyle,
  close,
  isModal,
}) => {
  return (
    <div
      style={{ position: isModal ? 'absolute' : undefined, top: 0, right: 0 }}
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
