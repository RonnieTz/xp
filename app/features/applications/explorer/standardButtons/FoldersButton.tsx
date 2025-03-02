import React from 'react';
import './StandardButtonsBar.css'; // Use the same styles file
import Image from 'next/image';
import foldersIcon from '@/public/Folder View.png'; // Ensure you have a folders icon
import Tooltip from '@/app/components/Tooltip';
import useTooltipMouse from '@/app/hooks/useTooltipMouse';

interface FoldersButtonProps {
  disabled?: boolean; // Optional disabled prop
}

const FoldersButton: React.FC<FoldersButtonProps> = ({ disabled = false }) => {
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
      <Image
        style={{ margin: '0 5px' }}
        src={foldersIcon}
        alt="search icon"
        width={30}
        height={30}
      />
      <span className="back-label">Folders</span>
      {!disabled && showTooltip && (
        <Tooltip left={position.x} top={position.y} title="Folders" />
      )}
    </div>
  );
};

export default FoldersButton;
