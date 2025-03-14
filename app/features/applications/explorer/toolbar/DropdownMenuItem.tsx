import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import ExpandMenu from './ExpandMenu';
import { MenuItem } from './hooks/useExplorerMenuItems';

interface DropdownMenuItemProps {
  label?: string;
  onClick?: (e: React.MouseEvent) => void;
  hasDot?: boolean;
  hasTick?: boolean;
  hasSubmenu?: boolean;
  shortcut?: string;
  disabled?: boolean;
  icon?: StaticImageData;
  expandItems?: MenuItem[];
  hasPadding?: boolean;
}

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  label,
  onClick,
  hasDot = false,
  hasTick = false,
  hasSubmenu = false,
  shortcut,
  disabled = false,
  icon,
  expandItems = [],
  hasPadding,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick && !disabled && !hasSubmenu) {
      onClick(e);
    }
  };

  const handleExpandItemClick = (item?: string) => {
    if (onClick) {
      onClick({} as React.MouseEvent); // Create dummy event if needed
    }
  };

  return (
    <div
      className={`dropdown-menu-item ${disabled ? 'disabled' : ''} ${
        hasPadding ? 'with-icon' : ''
      }`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={'menu-item-left'}>
        {hasDot && (
          <span
            style={{ color: isExpanded ? 'white' : 'black' }}
            className="menu-item-dot"
          >
            •
          </span>
        )}
        {hasTick && (
          <span
            style={{ color: isExpanded ? 'white' : 'black' }}
            className="menu-item-tick"
          >
            ✓
          </span>
        )}
        {icon && <Image src={icon} alt="" className="menu-item-icon" />}
        <span className="menu-item-label">{label}</span>
      </div>
      {shortcut && (
        <span
          style={{ color: isExpanded ? 'white' : 'black' }}
          className="menu-item-shortcut"
        >
          {shortcut}
        </span>
      )}
      {hasSubmenu && <span className="menu-item-triangle">▶</span>}
      {hasSubmenu && (
        <ExpandMenu
          items={expandItems}
          isOpen={isExpanded}
          onItemClick={handleExpandItemClick}
        />
      )}
    </div>
  );
};

export default DropdownMenuItem;
