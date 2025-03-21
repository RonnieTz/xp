import { useMemo } from 'react';
import { SidebarItem } from '../types';
import { useEntities } from '@/app/hooks/useEntities';
import { useEntityRename } from '@/app/hooks/useEntityRename';

// Import icons
import makeIcon from '@/public/New Folder.png';
import moveIcon from '@/public/Move this folder.png';
import copyIcon from '@/public/Copy.png';
import deleteIcon from '@/public/Delete.png';
import renameIcon from '@/public/Rename.png';

export function useSidebarItems(folderId: string): {
  sidebarItems: SidebarItem[];
  selectedEntitiesCount: number;
} {
  const { entities, selectedEntityIds, openRemoveEntityConfirmation } =
    useEntities();

  // Get selected entities in the current folder
  const selectedEntitiesInFolder = useMemo(() => {
    return entities.filter(
      (entity) =>
        selectedEntityIds.includes(entity.id) && entity.folderId === folderId
    );
  }, [entities, selectedEntityIds, folderId]);

  // Get the ID of the first selected entity or empty string if none selected
  const selectedEntityId =
    selectedEntitiesInFolder.length > 0 ? selectedEntitiesInFolder[0].id : '';

  const selectedEntityName =
    selectedEntitiesInFolder.length > 0 ? selectedEntitiesInFolder[0].name : '';

  const { startRename } = useEntityRename(selectedEntityId, selectedEntityName);

  // Generate sidebar items based on selection
  const sidebarItems = useMemo(() => {
    const selectedCount = selectedEntitiesInFolder.length;
    const allFolders = selectedEntitiesInFolder.every(
      (entity) => entity.type === 'folder'
    );
    const allFiles = selectedEntitiesInFolder.every(
      (entity) => entity.type === 'file'
    );
    const itemType = allFolders ? 'folder' : allFiles ? 'file' : 'item';

    const items: SidebarItem[] = [];

    if (selectedCount === 0) {
      items.push({
        title: 'Make new folder',
        icon: makeIcon,
        show: true,
      });
    } else if (selectedCount === 1) {
      items.push({
        title: `Rename this ${itemType}`,
        icon: renameIcon,
        show: true,
        onClick: (e) => {
          if (selectedEntityId) {
            startRename(e);
          }
        },
      });
      items.push({
        title: `Move this ${itemType}`,
        icon: moveIcon,
        show: true,
      });
      items.push({
        title: `Copy this ${itemType}`,
        icon: copyIcon,
        show: true,
      });
      items.push({
        title: `Delete this ${itemType}`,
        icon: deleteIcon,
        show: true,
        onClick: () => {
          if (selectedEntityId) {
            openRemoveEntityConfirmation(selectedEntityId);
          }
        },
      });
    } else {
      items.push({
        title: `Move the selected items`,
        icon: moveIcon,
        show: true,
      });
      items.push({
        title: `Copy the selected items`,
        icon: copyIcon,
        show: true,
      });
      items.push({
        title: `Delete the selected items`,
        icon: deleteIcon,
        show: true,
        onClick: () => {
          openRemoveEntityConfirmation(selectedEntityId);
        },
      });
    }

    return items;
  }, [
    selectedEntitiesInFolder,
    openRemoveEntityConfirmation,
    selectedEntityId,
    startRename,
  ]);

  return {
    sidebarItems,
    selectedEntitiesCount: selectedEntitiesInFolder.length,
  };
}
