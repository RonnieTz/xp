import React, { useState, useEffect, useRef } from 'react';
import WindowsXpLogo from './WindowsXpLogo';
import ToolbarMenuItem from './ToolbarMenuItem';
import { StaticImageData } from 'next/image';
import folderIcon from '@/public/Folder Closed.png';
import internetExplorerIcon from '@/public/Internet Explorer.png';
import documentIcon from '@/public/Generic Text Document.png';
import './Toolbar.css';

// Use the interface from DropdownMenu.tsx
interface MenuItem {
  label?: string;
  hasDot?: boolean;
  hasTick?: boolean;
  hasSubmenu?: boolean;
  isDivider?: boolean;
  shortcut?: string;
  disabled?: boolean;
  icon?: StaticImageData;
  expandItems?: MenuItem[];
}

// Define a type for menu names
type MenuName = 'File' | 'Edit' | 'View' | 'Favorites' | 'Tools' | 'Help';

// Sample menu items for each dropdown with optional icons
const menuItems: Record<MenuName, MenuItem[]> = {
  File: [
    {
      label: 'New',
      hasSubmenu: true,
      expandItems: [
        { label: 'Folder', icon: folderIcon },
        { label: 'Text Document', icon: documentIcon },
      ],
    },
    { isDivider: true },
    { label: 'Create Shortcut' },
    { label: 'Delete', disabled: true },
    { label: 'Rename' },
    { label: 'Properties' },
    { isDivider: true },
    { label: 'Close' },
  ],
  Edit: [
    { label: 'Undo Move', shortcut: 'Ctrl+Z', disabled: true },
    { isDivider: true },
    { label: 'Cut', shortcut: 'Ctrl+X' },
    { label: 'Copy', shortcut: 'Ctrl+C' },
    { label: 'Paste', shortcut: 'Ctrl+V', disabled: true },
    { label: 'Paste Shortcut' },
    { isDivider: true },
    { label: 'Copy To Folder' },
    { label: 'Move To Folder' },
    { isDivider: true },
    { label: 'Select All' },
    { label: 'Invert Selection' },
  ],
  View: [
    {
      label: 'Toolbars',
      hasSubmenu: true,
      expandItems: [
        { label: 'Standard Buttons', hasTick: true },
        { label: 'Address Bar', hasTick: true },
        { label: 'Links', hasTick: false },
        { isDivider: true },
        { label: 'Lock The Toolbars', hasTick: true },
        { label: 'Customize ...', hasTick: false },
      ],
    },
    { label: 'Status Bar' },
    {
      label: 'Explorer Bar',
      hasSubmenu: true,
      expandItems: [
        { label: 'Search', shortcut: 'Ctrl+E' },
        { label: 'Favorites', shortcut: 'Ctrl+I' },
        { label: 'History', shortcut: 'Ctrl+H' },
        { label: 'Folders' },
        { isDivider: true },
        { label: 'Tip of the Day' },
      ],
    },
    { isDivider: true },
    { label: 'Thumbnails' },
    { label: 'Tiles', hasDot: true },
    { label: 'Icons' },
    { label: 'List' },
    { label: 'Details' },
    { isDivider: true },
    {
      label: 'Arrange Icons By',
      hasSubmenu: true,
      expandItems: [
        { label: 'Name', hasDot: true },
        { label: 'Size' },
        { label: 'Type' },
        { label: 'Modified' },
        { isDivider: true },
        { label: 'Show in Groups' },
        { label: 'Auto Arrange', hasTick: true },
        { label: 'Align to Grid', hasTick: true },
      ],
    },
    { isDivider: true },
    { label: 'Choose Details...' },
    {
      label: 'Got To',
      hasSubmenu: true,
      expandItems: [
        { label: 'Back', shortcut: 'Alt+Left Arrow' },
        { label: 'Forward', shortcut: 'Alt+Right Arrow' },
        { label: 'Up One Level' },
        { isDivider: true },
        { label: 'Home Page', shortcut: 'Alt+Home' },
      ],
    },
    { label: 'Refresh' },
  ],
  Favorites: [
    { label: 'Add to Favorites', hasDot: false },
    { label: 'Organize Favorites', hasDot: false },
    { isDivider: true },
    { label: 'Links', icon: folderIcon },
    { label: 'MSN.com', icon: internetExplorerIcon },
  ],
  Tools: [
    { label: 'Map Network Drive...' },
    { label: 'Disconnect Network Drive...' },
    { label: 'Synchronize...' },
    { isDivider: true },
    { label: 'Folder Options...' },
  ],
  Help: [
    { label: 'Help And Support Center' },
    { isDivider: true },
    { label: 'Is This Copy Of Windows Legal?' },
    { label: 'About Windows' },
  ],
};

const ExplorerToolbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [expandsOpen, setExpandsOpen] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const handleMenuEnter = (menuName: string) => {
    if (expandsOpen) {
      setActiveMenu(menuName);
    }
  };

  const handleMenuClick = (menuName: string) => {
    if (!expandsOpen) {
      setExpandsOpen(true);
      setActiveMenu(menuName);
    } else if (activeMenu === menuName) {
      setExpandsOpen(false);
      setActiveMenu(null);
    } else {
      setActiveMenu(menuName);
    }
  };

  const handleToolbarMouseLeave = () => {
    if (!expandsOpen) {
      setActiveMenu(null);
    }
  };

  const handleToolbarClick = (e: React.MouseEvent) => {
    // Check if the click was directly on the toolbar or toolbar-left div (not on a menu item)
    if (
      e.target === e.currentTarget ||
      (e.target as HTMLElement).className === 'toolbar-left'
    ) {
      setExpandsOpen(false);
      setActiveMenu(null);
    }
  };

  // Handle clicks outside the toolbar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toolbarRef.current &&
        !toolbarRef.current.contains(event.target as Node)
      ) {
        setExpandsOpen(false);
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="explorer-toolbar"
      onMouseLeave={handleToolbarMouseLeave}
      onClick={handleToolbarClick}
      ref={toolbarRef}
    >
      <div className="toolbar-left">
        {(Object.keys(menuItems) as MenuName[]).map((menuName) => (
          <ToolbarMenuItem
            key={menuName}
            label={menuName}
            isActive={activeMenu === menuName}
            onMouseEnter={() => handleMenuEnter(menuName)}
            onClick={() => handleMenuClick(menuName)}
            items={menuItems[menuName]}
          />
        ))}
      </div>
      <div className="toolbar-right">
        <WindowsXpLogo />
      </div>
    </div>
  );
};

export default ExplorerToolbar;
