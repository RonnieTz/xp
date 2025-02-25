import React from 'react';
import Image from 'next/image';
import header from '@/public/header.png';
import headerfullscreen from '@/public/hearderfullscreen.png';
import './windowStyles.css';
import { WindowEntity } from '../windowsState';
import MinimizeButton from './MinimizeButton';
import MaximizeButton from './MaximizeButton';
import ExitButton from './ExitButton';

interface WindowHeaderProps {
  isFocused: boolean;
  window: WindowEntity;
  close: () => void;
  minimize: () => void;
  maximize: () => void;
  unmaximize: () => void;
}

const WindowHeader: React.FC<WindowHeaderProps> = ({
  window,
  isFocused,
  close,
  minimize,
  maximize,
  unmaximize,
}) => {
  const { title, iconPath, isMaximized } = window;
  const buttonStyle = {
    height: '100%',
    width: 'auto',
    ...(!isFocused && { filter: 'grayscale(0.6) brightness(1.4)' }),
  };

  return (
    <div className="window-header-container">
      <Image
        className={`window-header-image${!isFocused ? ' unfocused' : ''}`}
        src={isMaximized ? headerfullscreen : header}
        alt="header"
      />
      <span className="window-header-title">
        <Image
          src={iconPath}
          alt="icon"
          width={28}
          height={28}
          className="window-header-icon"
        />
        <div style={{ translate: '-2px 2px' }}>{title}</div>
      </span>
      <div className="window-header-controls">
        <MinimizeButton buttonStyle={buttonStyle} minimize={minimize} />
        <MaximizeButton
          buttonStyle={buttonStyle}
          isMaximized={isMaximized}
          maximize={maximize}
          unmaximize={unmaximize}
        />
        <ExitButton buttonStyle={buttonStyle} close={close} />
      </div>
    </div>
  );
};

export default WindowHeader;
