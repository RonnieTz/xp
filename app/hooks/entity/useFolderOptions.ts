import { useAppDispatch, useAppSelector } from '../reduxHooks';
import {
  toggleAddressBar,
  toggleStandardButtons,
  setOpenInNewWindow,
  setShowCommonTasks,
  setFolderOptions,
} from '@/app/features/fileSystem/fileSystemSlice';

export const useFolderOptions = () => {
  const dispatch = useAppDispatch();
  const folderOptions = useAppSelector(
    (state) => state.fileSystem.folderOptions
  );

  const toggleEntityAddressBar = (entityId: string) => {
    dispatch(toggleAddressBar(entityId));
  };

  const toggleEntityStandardButtons = (entityId: string) => {
    dispatch(toggleStandardButtons(entityId));
  };

  const toggleOpenFoldersInNewWindow = (value: boolean) => {
    dispatch(setOpenInNewWindow(value));
  };

  const toggleShowCommonTasks = (value: boolean) => {
    dispatch(setShowCommonTasks(value));
  };

  const updateFolderOptions = (options: {
    openInSameWindow: boolean;
    showCommonTasks: boolean;
    isSingleClick: boolean;
    underlineOption: 'browser' | 'hover';
  }) => {
    dispatch(setFolderOptions(options));
  };

  return {
    folderOptions,
    toggleEntityAddressBar,
    toggleEntityStandardButtons,
    toggleOpenFoldersInNewWindow,
    toggleShowCommonTasks,
    updateFolderOptions,
  };
};
