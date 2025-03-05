import { useAppSelector } from '@/app/hooks/reduxHooks';
import { Entity } from '../fileSystemTypes';

/**
 * Custom hook to get the full path of an entity
 * @param entityId - ID of the entity to get path for
 * @returns Full path string (e.g., "Desktop/folder1/subfolder")
 */
export const useEntityPath = (entityId?: string): string => {
  const entities = useAppSelector((state) => state.fileSystem.entities);

  if (!entityId) return 'Desktop';

  // Function to find an entity by ID
  const findEntityById = (id: string): Entity | undefined => {
    return entities.find((entity) => entity.id === id);
  };

  // Function to get the full path of an entity recursively
  const getPath = (id: string): string => {
    const entity = findEntityById(id);

    if (!entity) return 'Desktop';

    // If it's in root folder, just return the entity name
    if (entity.folderId === 'root') {
      return `Desktop/${entity.name}`;
    }

    // Get the parent folder path and add this entity's name
    const parentPath = getPath(entity.folderId);
    return `${parentPath}/${entity.name}`;
  };

  return getPath(entityId);
};
