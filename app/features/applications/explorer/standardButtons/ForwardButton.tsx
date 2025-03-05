import React from 'react';
import './StandardButtonsBar.css'; // Use the same styles file
import Image from 'next/image';
import arrowForwardIcon from '@/public/arrow-forward.svg'; // Ensure you have a forward arrow icon
import arrowDownIcon from '@/public/ArrowDown.svg';
import Tooltip from '@/app/components/Tooltip';
import useTooltipMouse from '@/app/hooks/useTooltipMouse';
import { useEntities } from '@/app/hooks/useEntities';

interface ForwardButtonProps {
  disabled?: boolean; // Optional disabled prop
  windowId: string; // Add windowId prop
}

const ForwardButton: React.FC<ForwardButtonProps> = ({
  disabled = false,
  windowId,
}) => {
  const {
    position,
    showTooltip,
    handleMouseMove,
    handleMouseLeave,
    hideTooltip,
  } = useTooltipMouse();

  const { handleNavigateForward } = useEntities();

  const handleClick = () => {
    if (!disabled) {
      handleNavigateForward(windowId);
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
          <Image
            src={arrowForwardIcon}
            alt="forward arrow"
            width={25}
            height={25}
          />
        </div>
      </div>
      <div className="divider"></div>
      <Image alt="arrow down" src={arrowDownIcon} width={12} height={12} />
      {!disabled && showTooltip && (
        <Tooltip left={position.x} top={position.y} title="Go Forward" />
      )}
    </div>
  );
};

export default ForwardButton;
