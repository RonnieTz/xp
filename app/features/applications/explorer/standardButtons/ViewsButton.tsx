import React from 'react';
import './StandardButtonsBar.css'; // Use the same styles file
import Image from 'next/image';
import viewsIcon from '@/public/Icon View.png'; // Ensure you have a views icon
import arrowDownIcon from '@/public/ArrowDown.svg';
import Tooltip from '@/app/components/Tooltip';
import useTooltipMouse from '@/app/hooks/useTooltipMouse';

interface ViewsButtonProps {
  disabled?: boolean; // Optional disabled prop
}

const ViewsButton: React.FC<ViewsButtonProps> = ({ disabled = false }) => {
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
        <Image src={viewsIcon} alt="views" width={30} height={30} />
      </div>
      <Image alt="arrow down" src={arrowDownIcon} width={12} height={12} />
      {!disabled && showTooltip && (
        <Tooltip left={position.x} top={position.y} title="Views" />
      )}
    </div>
  );
};

export default ViewsButton;
