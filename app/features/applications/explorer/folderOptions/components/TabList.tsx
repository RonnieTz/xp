import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabListProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabList: React.FC<TabListProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="folder-options-tabs">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`folder-options-tab ${
            activeTab === tab.id ? 'active' : ''
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default TabList;
