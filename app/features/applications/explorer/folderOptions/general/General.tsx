import React from 'react';
import '../FolderOptions.css';
import Tasks from './Tasks';
import BrowseFolders from './BrowseFolders';
import ClickItems from './ClickItems';
import RestoreButton from './RestoreButton';

interface GeneralProps {
  openInSameWindow: boolean;
  setOpenInSameWindow: (value: boolean) => void;
  showCommonTasks: boolean;
  setShowCommonTasks: (value: boolean) => void;
  isSingleClick: boolean;
  setIsSingleClick: (value: boolean) => void;
  underlineOption: 'browser' | 'hover';
  setUnderlineOption: (value: 'browser' | 'hover') => void;
}

const General: React.FC<GeneralProps> = ({
  openInSameWindow,
  setOpenInSameWindow,
  showCommonTasks,
  setShowCommonTasks,
  isSingleClick,
  setIsSingleClick,
  underlineOption,
  setUnderlineOption,
}) => {
  return (
    <div className="general-tab">
      <Tasks
        showCommonTasks={showCommonTasks}
        setShowCommonTasks={setShowCommonTasks}
      />
      <BrowseFolders
        openInSameWindow={openInSameWindow}
        setOpenInSameWindow={setOpenInSameWindow}
      />
      <ClickItems
        isSingleClick={isSingleClick}
        setIsSingleClick={setIsSingleClick}
        underlineOption={underlineOption}
        setUnderlineOption={setUnderlineOption}
      />
      <RestoreButton />
    </div>
  );
};

export default General;
