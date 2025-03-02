import React from 'react';
import DropdownMenu from './DropdownMenu';
import MenuItem from './MenuItem';

interface ToolbarMenuItemProps {
  label: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
  items: MenuItem[];
}

const ToolbarMenuItem: React.FC<ToolbarMenuItemProps> = ({
  label,
  isActive,
  onMouseEnter,
  onClick,
  items,
}) => {
  return (
    <div
      className={`toolbar-menu-item ${isActive ? 'active' : ''}`}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {label}
      <DropdownMenu isOpen={isActive} items={items} onItemClick={() => {}} />
    </div>
  );
};

export default ToolbarMenuItem;
