import React from 'react';
import Image from 'next/image';
import arrowForwardIcon from '@/public/arrow-forward.svg'; // Ensure you have a forward arrow icon
import arrowDownIcon from '@/public/ArrowDown.svg';
import Tooltip from '@/app/components/Tooltip';
import useTooltipMouse from '@/app/hooks/useTooltipMouse';
import './GoButton.css';

interface GoButtonProps {}

const GoButton: React.FC<GoButtonProps> = () => {
  const {
    position,
    showTooltip,
    handleMouseMove,
    handleMouseLeave,
    hideTooltip,
  } = useTooltipMouse();

  const handleClick = () => {
    hideTooltip();
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`go-button`}
    >
      <div className="go-button-icon">
        <div className="square">
          <Image src={arrowForwardIcon} alt="go" width={19} height={19} />
        </div>
      </div>
      <span className="go-button-label">Go</span>
      {showTooltip && <Tooltip left={position.x} top={position.y} title="Go" />}
    </div>
  );
};

export default GoButton;
