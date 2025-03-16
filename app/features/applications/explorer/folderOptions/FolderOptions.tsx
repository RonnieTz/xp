import React from 'react';
import './FolderOptions.css';
import General from './general/General';
import View from './tabs/view/View';
import FileTypes from './tabs/fileTypes/FileTypes';
import OfflineFiles from './tabs/offlineFiles/OfflineFiles';
import DialogButtons from './DialogButtons';
import TabList from './components/TabList';
import TabPanel from './components/TabPanel';
import { useFolderOptions, TabName } from './hooks/useFolderOptions';

interface FolderOptionsProps {
  windowId: string;
}

const FolderOptions = ({ windowId }: FolderOptionsProps) => {
  const [state, actions] = useFolderOptions(windowId);

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'view', label: 'View' },
    { id: 'fileTypes', label: 'File Types' },
    { id: 'offlineFiles', label: 'Offline Files' },
  ];

  const getTabContent = (tabId: TabName) => {
    switch (tabId) {
      case 'general':
        return (
          <General
            openInSameWindow={state.generalTab.openInSameWindow}
            setOpenInSameWindow={actions.setOpenInSameWindow}
            showCommonTasks={state.generalTab.showCommonTasks}
            setShowCommonTasks={actions.setShowCommonTasks}
            isSingleClick={state.generalTab.isSingleClick}
            setIsSingleClick={actions.setIsSingleClick}
            underlineOption={state.generalTab.underlineOption}
            setUnderlineOption={actions.setUnderlineOption}
          />
        );
      case 'view':
        return <View />;
      case 'fileTypes':
        return <FileTypes />;
      case 'offlineFiles':
        return <OfflineFiles />;
      default:
        return null;
    }
  };

  return (
    <div className="folder-options-container">
      <TabList
        tabs={tabs}
        activeTab={state.activeTab}
        onTabChange={(id) => actions.setActiveTab(id as TabName)}
      />

      <TabPanel>{getTabContent(state.activeTab)}</TabPanel>

      <DialogButtons
        onOk={actions.handleOK}
        onCancel={actions.handleCancel}
        onApply={actions.handleApply}
        disableApply={state.disableApply}
      />
    </div>
  );
};

export default FolderOptions;
