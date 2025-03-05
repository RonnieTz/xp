import { useAppSelector } from '../reduxHooks';
import { Entity } from '@/app/features/fileSystem/fileSystemTypes';

export const useEntityUtils = () => {
  const entities = useAppSelector((state) => state.fileSystem.entities);
  const windows = useAppSelector((state) => state.windows.windows);

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

  return {
    entities,
    windows,
    findEntityById,
    findWindowShowingFolder,
  };
};
