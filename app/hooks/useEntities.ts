import { useEntityUtils } from './entity/useEntityUtils';
import { useEntitySelection } from './entity/useEntitySelection';
import { useEntityDrag } from './entity/useEntityDrag';
import { useEntityNavigation } from './entity/useEntityNavigation';
import { useFolderOptions } from './entity/useFolderOptions';
import { useEntityInteraction } from './entity/useEntityInteraction';

export const useEntities = () => {
  const { entities } = useEntityUtils();
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
  };
};
