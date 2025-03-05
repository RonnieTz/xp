import React from 'react';
import Image, { StaticImageData } from 'next/image';
import './SidebarListItem.css';

interface SidebarListItemProps {
  title: string;
  icon: StaticImageData;
  onClick?: () => void;
}

const SidebarListItem = ({ title, icon, onClick }: SidebarListItemProps) => {
  return (
    <li className="sidebar-list-item" onClick={onClick}>
      <div className="sidebar-list-item-content">
        <div className="sidebar-list-item-icon">
          <Image src={icon} alt={title} width={18} height={18} />
        </div>
        <span className="sidebar-list-item-title">{title}</span>
      </div>
    </li>
  );
};

export default SidebarListItem;
