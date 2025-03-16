import { useEntityUtils } from './entity/useEntityUtils';
import { useEntitySelection } from './entity/useEntitySelection';
import { useEntityDrag } from './entity/useEntityDrag';
import { useEntityNavigation } from './entity/useEntityNavigation';
import { useFolderOptions } from './entity/useFolderOptions';
import { useEntityInteraction } from './entity/useEntityInteraction';
import { useAppDispatch } from './reduxHooks';
import {
  renameEntity,
  setIsRenaming as setIsRenamingAction,
} from '../features/fileSystem/fileSystemSlice';

export const useEntities = () => {
  const { entities, removeEntity } = useEntityUtils();
  const { selectedEntityIds, clearSelections, selectEntity } =
    useEntitySelection();
  const { handleDragStart, handleDrop, handleDragOver } = useEntityDrag();
  const { handleNavigateBack, handleNavigateForward, getNavigationState } =
    useEntityNavigation();
  const {
    folderOptions,
    toggleEntityAddressBar,
    toggleEntityStandardButtons,
    toggleOpenFoldersInNewWindow,
    toggleShowCommonTasks,
    updateFolderOptions,
  } = useFolderOptions();
  const { handleDoubleClickEntity } = useEntityInteraction();

  const dispatch = useAppDispatch();

  const handleRenameEntity = (id: string, newName: string) => {
    dispatch(renameEntity({ id, newName }));
  };

  const setIsRenaming = (id: string, isRenaming: boolean) => {
    dispatch(setIsRenamingAction({ id, isRenaming }));
  };

  return {
    entities,
    folderOptions,
    selectedEntityIds,
    clearSelections,
    selectEntity,
    handleDragStart,
    handleDrop,
    handleDragOver,
    handleDoubleClickEntity,
    toggleEntityAddressBar,
    toggleEntityStandardButtons,
    toggleOpenFoldersInNewWindow,
    toggleShowCommonTasks,
    updateFolderOptions,
    handleNavigateBack,
    handleNavigateForward,
    getNavigationState,
    removeEntity,
    handleRenameEntity,
    setIsRenaming,
  };
};
