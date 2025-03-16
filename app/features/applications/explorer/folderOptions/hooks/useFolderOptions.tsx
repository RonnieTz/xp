import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/app/hooks/reduxHooks';
import { setFolderOptions } from '@/app/features/fileSystem/fileSystemSlice';
import { useWindowManager } from '@/app/features/windows/hooks/useWindowManager';

export type TabName = 'general' | 'view' | 'fileTypes' | 'offlineFiles';

export interface GeneralTabState {
  openInSameWindow: boolean;
  showCommonTasks: boolean;
  isSingleClick: boolean;
  underlineOption: 'browser' | 'hover';
}

export interface FolderOptionsState {
  activeTab: TabName;
  generalTab: GeneralTabState;
  disableApply: boolean;
}

export interface FolderOptionsActions {
  setActiveTab: (tab: TabName) => void;
  setOpenInSameWindow: (value: boolean) => void;
  setShowCommonTasks: (value: boolean) => void;
  setIsSingleClick: (value: boolean) => void;
  setUnderlineOption: (value: 'browser' | 'hover') => void;
  handleOK: () => void;
  handleCancel: () => void;
  handleApply: () => void;
}

export type UseFolderOptionsReturn = [FolderOptionsState, FolderOptionsActions];

export const useFolderOptions = (windowId: string): UseFolderOptionsReturn => {
  const dispatch = useAppDispatch();
  const { folderOptions } = useAppSelector((state) => state.fileSystem);
  const { close } = useWindowManager(
    windowId,
    { x: 0, y: 0 },
    { width: 0, height: 0 }
  );

  // Tab navigation state
  const [activeTab, setActiveTab] = useState<TabName>('general');

  // General tab states
  const [openInSameWindow, setOpenInSameWindow] = useState(
    folderOptions.openInSameWindow
  );
  const [showCommonTasks, setShowCommonTasks] = useState(
    folderOptions.showCommonTasks
  );
  const [isSingleClick, setIsSingleClick] = useState(
    folderOptions.isSingleClick
  );
  const [underlineOption, setUnderlineOption] = useState<'browser' | 'hover'>(
    folderOptions.underlineOption
  );

  // Calculate if any changes have been made compared to saved state
  const disableApply =
    openInSameWindow === folderOptions.openInSameWindow &&
    showCommonTasks === folderOptions.showCommonTasks &&
    isSingleClick === folderOptions.isSingleClick &&
    underlineOption === folderOptions.underlineOption;

  // Dialog button handlers
  const handleOK = () => {
    // Save changes and close the window
    dispatch(
      setFolderOptions({
        openInSameWindow,
        showCommonTasks,
        isSingleClick,
        underlineOption,
      })
    );
    close();
    // Close window
  };

  const handleCancel = () => {
    // Discard changes and close the window
    // dispatch(closeWindow(windowId));
    close();
    // Close window logic here
  };

  const handleApply = () => {
    // Save changes but keep the window open

    dispatch(
      setFolderOptions({
        openInSameWindow,
        showCommonTasks,
        isSingleClick,
        underlineOption,
      })
    );
  };

  const state: FolderOptionsState = {
    activeTab,
    generalTab: {
      openInSameWindow,
      showCommonTasks,
      isSingleClick,
      underlineOption,
    },
    disableApply,
  };

  const actions: FolderOptionsActions = {
    setActiveTab,
    setOpenInSameWindow,
    setShowCommonTasks,
    setIsSingleClick,
    setUnderlineOption,
    handleOK,
    handleCancel,
    handleApply,
  };

  return [state, actions];
};
