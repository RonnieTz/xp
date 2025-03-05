import { StaticImageData } from 'next/image';
import './Sidebar.css';
import SidebarButton from './SidebarButton';
import SidebarListItem from './SidebarListItem';
import DetailItem from './DetailItem';
import { useState } from 'react';
import folderIcon from '@/public/Folder Closed.png';

// Define items with their icons
interface SidebarItem {
  title: string;
  icon: StaticImageData;
}

const Sidebar = () => {
  // Example state with items that include icons
  const [filesItems, setFilesItems] = useState<SidebarItem[]>([
    { title: 'Move this file', icon: folderIcon },
    { title: 'Copy this file', icon: folderIcon },
    { title: 'Publish this file', icon: folderIcon },
    { title: 'E-mail this file', icon: folderIcon },
  ]);

  // Detail item for the current selected file/folder
  const selectedItemDetails = {
    title: 'Documents',
    description: 'System Folder',
    dateModified: 'Monday, 10/25/2023 3:14 PM',
  };

  return (
    <div className="sidebar-container">
      <SidebarButton title="File and Folder Tasks">
        <ul className="sidebar-list">
          {filesItems.map((item, index) => (
            <SidebarListItem
              key={index}
              title={item.title}
              icon={item.icon}
              onClick={() => console.log(`Clicked ${item.title}`)}
            />
          ))}
        </ul>
      </SidebarButton>

      <SidebarButton title="Details">
        <DetailItem
          title={selectedItemDetails.title}
          description={selectedItemDetails.description}
          dateModified={selectedItemDetails.dateModified}
        />
      </SidebarButton>
    </div>
  );
};

export default Sidebar;
