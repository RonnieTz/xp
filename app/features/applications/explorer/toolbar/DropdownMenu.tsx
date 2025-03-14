import React from 'react';
import DropdownMenuItem from './DropdownMenuItem';
import MenuDivider from './MenuDivider';
import { StaticImageData } from 'next/image';
import { MenuItem } from './hooks/useExplorerMenuItems';

interface DropdownMenuProps {
  isOpen: boolean;
  items: MenuItem[];
  onItemClick?: (item?: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isOpen,
  items,
  onItemClick,
}) => {
  if (!isOpen) return null;

  const handleItemClick = (item?: string) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  // Check if any item has an icon
  const hasIcon = items.some((item) => item.icon);

  return (
    <div className={'dropdown-menu'} onClick={(e) => e.stopPropagation()}>
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
            onClick={() => {
              handleItemClick(item.label);
              item.onClick && item.onClick();
            }}
            expandItems={item.expandItems}
            hasPadding={hasIcon}
          />
        )
      )}
    </div>
  );
};

export default DropdownMenu;
