import React from 'react';
import DropdownMenuItem from './DropdownMenuItem';
import MenuDivider from './MenuDivider';
import MenuItem from './MenuItem';

interface ExpandMenuProps {
  items: MenuItem[];
  isOpen: boolean;
  onItemClick?: (item?: string) => void;
}

const ExpandMenu: React.FC<ExpandMenuProps> = ({
  items,
  isOpen,
  onItemClick,
}) => {
  if (!isOpen) return null;

  // Check if any item has an icon
  const hasIcon = items.some((item) => item.icon);

  return (
    <div className={`expand-menu`} onClick={(e) => e.stopPropagation()}>
      {items.map((item, index) =>
        item.isDivider ? (
          <MenuDivider key={index} />
        ) : (
          <DropdownMenuItem
            key={index}
            label={item.label}
            hasDot={item.hasDot}
            hasTick={item.hasTick}
            hasSubmenu={item.hasSubmenu}
            shortcut={item.shortcut}
            disabled={item.disabled}
            icon={item.icon}
            onClick={() => onItemClick && onItemClick(item.label)}
            expandItems={item.expandItems}
            hasPadding={hasIcon}
          />
        )
      )}
    </div>
  );
};

export default ExpandMenu;
