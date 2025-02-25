import React from 'react';
import Image from 'next/image';
import maximizeIcon from '@/public/Maximize.png';
import restoreIcon from '@/public/Restore.png';

interface MaximizeButtonProps {
  buttonStyle: React.CSSProperties;
  isMaximized: boolean;
  maximize: () => void;
  unmaximize: () => void;
}

const MaximizeButton: React.FC<MaximizeButtonProps> = ({
  buttonStyle,
  isMaximized,
  maximize,
  unmaximize,
}) => {
  return (
    <div
      className="maximize-button"
      onClick={() => (isMaximized ? unmaximize() : maximize())}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <Image
        style={buttonStyle}
        src={isMaximized ? restoreIcon : maximizeIcon}
        alt={isMaximized ? 'restore' : 'maximize'}
      />
    </div>
  );
};

export default MaximizeButton;
