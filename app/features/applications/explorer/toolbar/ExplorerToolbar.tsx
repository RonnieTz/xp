import React, { useState, useEffect, useRef } from 'react';
import WindowsXpLogo from './WindowsXpLogo';
import ToolbarMenuItem from './ToolbarMenuItem';
import './Toolbar.css';
import { useExplorerMenuItems, MenuName } from './hooks/useExplorerMenuItems';

interface ExplorerToolbarProps {
  folderId: string;
}

const ExplorerToolbar = ({ folderId }: ExplorerToolbarProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [expandsOpen, setExpandsOpen] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const { menuItems } = useExplorerMenuItems(folderId);

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
