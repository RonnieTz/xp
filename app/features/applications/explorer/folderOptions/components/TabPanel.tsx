import React, { ReactNode } from 'react';

interface TabPanelProps {
  children: ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  return (
    <div className="folder-options-content">
      <div className="tab-content">{children}</div>
    </div>
  );
};

export default TabPanel;
