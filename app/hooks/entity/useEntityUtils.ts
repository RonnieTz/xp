import { useAppSelector, useAppDispatch } from '../reduxHooks';
import { Entity } from '@/app/features/fileSystem/fileSystemTypes';
import { removeEntity as removeEntityAction } from '@/app/features/fileSystem/fileSystemSlice';

export const useEntityUtils = () => {
  const entities = useAppSelector((state) => state.fileSystem.entities);
  const windows = useAppSelector((state) => state.windows.windows);
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
  const removeEntity = (entityId: string) => {
    dispatch(removeEntityAction(entityId));
  };

  return {
    entities,
    windows,
    findEntityById,
    findWindowShowingFolder,
    removeEntity,
  };
};
