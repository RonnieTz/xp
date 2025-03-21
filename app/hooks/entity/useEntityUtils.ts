import { useAppSelector, useAppDispatch } from '../reduxHooks';
import { Entity } from '@/app/features/fileSystem/fileSystemTypes';
import {
  focusWindow,
  openWindow,
  setHasOpenModal,
  removeWindow,
} from '@/app/features/windows/windowsSlice';
import { v4 as uuidv4 } from 'uuid';
import { removeEntity as removeEntityAction } from '@/app/features/fileSystem/fileSystemSlice';

export const useEntityUtils = () => {
  const { entities, selectedEntityIds } = useAppSelector(
    (state) => state.fileSystem
  );
  const { windows, desktopSize } = useAppSelector((state) => state.windows);
  const dispatch = useAppDispatch();

  // Helper function to find an entity by ID
  const findEntityById = (id: string): Entity | undefined => {
    return entities.find((ent) => ent.id === id);
  };

  // Find the window that's currently displaying a specific folder
  const findWindowShowingFolder = (folderId: string): string | undefined => {
    const window = windows.find(
      (w) => w.isOpen && w.navigationHistory?.current === folderId
    );
    return window?.id;
  };

  // Function to remove an entity
  const openRemoveEntityConfirmation = (entityId: string) => {
    // dispatch(removeEntityAction(entityId));
    const entity = findEntityById(entityId);
    const parentFolderId = entity?.folderId || '';

    const windowId = findWindowShowingFolder(parentFolderId);

    const modalId = `ConfirmDelete-${uuidv4()}`;
    dispatch(setHasOpenModal({ id: windowId || '', hasOpenModal: true }));
    const { height: desktopHeight, width: desktopWidth } = desktopSize;
    const newSize = { width: 600, height: 150 };
    const windowPosition = {
      x: (desktopWidth - newSize.width) / 2,
      y: (desktopHeight - newSize.height) / 2,
    };
    const numberOfSelectedEntities = selectedEntityIds.length;
    const typeOfSelectedEntity = findEntityById(selectedEntityIds[0])?.type;

    dispatch(
      openWindow({
        id: modalId,
        title:
          numberOfSelectedEntities > 1
            ? 'Confirm Multiple File Delete'
            : typeOfSelectedEntity === 'folder'
            ? 'Confirm Folder Delete'
            : 'Confirm File Delete',
        isModal: true,
        parentId: windowId,
        size: newSize,
        position: windowPosition,
        modalTarget: selectedEntityIds,
      })
    );
    setTimeout(() => {
      dispatch(focusWindow(modalId));
    }, 50);
  };

  const removeEntity = (entityId: string) => {
    const entityToRemove = findEntityById(entityId);

    if (!entityToRemove) return;

    // Close any window that's displaying this entity
    if (entityToRemove.type === 'folder') {
      // Find window showing this folder and close it
      const windowShowingFolder = findWindowShowingFolder(entityId);
      if (windowShowingFolder) {
        dispatch(removeWindow(windowShowingFolder));
      }
    }

    // If it's a folder, find and remove all entities inside it first
    if (entityToRemove.type === 'folder') {
      // Find all entities that are directly in this folder
      const childEntities = entities.filter(
        (entity) => entity.folderId === entityId
      );

      // Recursively remove each child entity
      childEntities.forEach((child) => {
        removeEntity(child.id);
      });
    }

    // Find and remove any shortcuts that point to this entity
    const shortcuts = entities.filter(
      (entity) => entity.type === 'shortcut' && entity.targetId === entityId
    );

    shortcuts.forEach((shortcut) => {
      dispatch(removeEntityAction(shortcut.id));
    });

    // Finally remove the entity itself
    dispatch(removeEntityAction(entityId));
  };

  return {
    entities,
    windows,
    findEntityById,
    findWindowShowingFolder,
    openRemoveEntityConfirmation,
    removeEntity, // Added the removeEntity function to the returned object
  };
};
