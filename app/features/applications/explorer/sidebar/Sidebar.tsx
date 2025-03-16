import './Sidebar.css';
import SidebarButton from './SidebarButton';
import SidebarListItem from './SidebarListItem';
import DetailItem from './DetailItem';
import { SidebarProps } from './types';
import { useSidebarItems } from './hooks/useSidebarItems';

const Sidebar = ({ folderId }: SidebarProps) => {
  const { sidebarItems } = useSidebarItems(folderId);

  return (
    <div className="sidebar-container">
      <SidebarButton title="File and Folder Tasks">
        <ul className="sidebar-list">
          {sidebarItems
            .filter((item) => item.show !== false)
            .map((item, index) => (
              <SidebarListItem
                key={index}
                title={item.title}
                icon={item.icon}
                onClick={item.onClick}
              />
            ))}
        </ul>
      </SidebarButton>

      <SidebarButton title="Details">
        <DetailItem folderId={folderId} />
      </SidebarButton>
    </div>
  );
};

export default Sidebar;
