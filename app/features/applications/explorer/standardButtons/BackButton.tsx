import React from 'react';
import './StandardButtonsBar.css'; // Use the same styles file
import Image from 'next/image';
import arrowIcon from '@/public/arrow-back.svg';
import arrowDownIcon from '@/public/ArrowDown.svg';
import Tooltip from '@/app/components/Tooltip';
import useTooltipMouse from '@/app/hooks/useTooltipMouse';
import { useEntities } from '@/app/hooks/useEntities';

interface Props {
  disabled?: boolean;
  windowId: string;
}

const BackButton = ({ disabled = false, windowId }: Props) => {
  const {
    position,
    showTooltip,
    handleMouseMove,
    handleMouseLeave,
    hideTooltip,
  } = useTooltipMouse();
  const { handleNavigateBack } = useEntities();
  const handleClick = () => {
    if (!disabled) {
      handleNavigateBack(windowId);
    }
    hideTooltip();
  };
  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`back-button ${disabled ? 'disabled' : ''}`}
    >
      <div className="back-button-icon">
        <div className="circle">
          <Image src={arrowIcon} alt="arrow" width={25} height={25} />
        </div>
      </div>
      <span className="back-label">Back</span>
      <div className="divider"></div>
      <Image alt="arrow down" src={arrowDownIcon} width={12} height={12} />
      {!disabled && showTooltip && (
        <Tooltip left={position.x} top={position.y} title="Go Back" />
      )}
    </div>
  );
};

export default BackButton;
