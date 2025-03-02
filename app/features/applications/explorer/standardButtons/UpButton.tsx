import React from 'react';
import './StandardButtonsBar.css'; // Use the same styles file
import Image from 'next/image';
import upArrowIcon from '@/public/Up.png'; // Ensure you have an up arrow icon
import arrowDownIcon from '@/public/ArrowDown.svg';
import Tooltip from '@/app/components/Tooltip';
import useTooltipMouse from '@/app/hooks/useTooltipMouse';

interface UpButtonProps {
  disabled?: boolean; // Optional disabled prop
}

const UpButton: React.FC<UpButtonProps> = ({ disabled = false }) => {
  const {
    position,
    showTooltip,
    handleMouseMove,
    handleMouseLeave,
    hideTooltip,
  } = useTooltipMouse();

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={hideTooltip}
      className={`back-button ${disabled ? 'disabled' : ''}`}
    >
      <div className="back-button-icon">
        <Image src={upArrowIcon} alt="up arrow" width={25} height={25} />
      </div>
      {!disabled && showTooltip && (
        <Tooltip left={position.x} top={position.y} title="Go Up" />
      )}
    </div>
  );
};

export default UpButton;
