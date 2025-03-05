import { useAppDispatch, useAppSelector } from '../reduxHooks';
import {
  openWindow,
  navigateToFolder,
} from '@/app/features/windows/windowsSlice';
import { addTask } from '@/app/features/tasks/tasksSlice';
import { useEntityUtils } from './useEntityUtils';
import { useFolderOptions } from './useFolderOptions';
import { updateEntityWindowId } from '@/app/features/fileSystem/fileSystemSlice';
import { v4 as uuidv4 } from 'uuid';

export const useEntityInteraction = () => {
  const dispatch = useAppDispatch();
  const { entities, findEntityById, findWindowShowingFolder } =
    useEntityUtils();
  const { folderOptions } = useFolderOptions();
  const windows = useAppSelector((state) => state.windows.windows);

  const handleDoubleClickEntity = (id: string) => {
    const entity = entities.find((ent) => ent.id === id);
    if (!entity) return;

    if ('windowId' in entity) {
      console.log(
        `Double-clicking entity: ${entity.name}, id: ${entity.id}, windowId: ${entity.windowId}`
      );

      // First, check if this entity's designated window is already open but showing a different folder
      const entityWindow = windows.find((w) => w.id === entity.windowId);
      console.log(
        `Window found? ${!!entityWindow}, isOpen: ${entityWindow?.isOpen}`
      );

      if (entityWindow?.isOpen) {
        console.log(
          `Window current: ${entityWindow.navigationHistory.current}, Entity ID: ${entity.id}`
        );
        if (entityWindow.navigationHistory.current !== entity.id) {
          console.log(
            `Window is showing a different folder than entity - creating new window`
          );

          // Create a new window ID for this entity
          const newWindowId = `${entity.id}_window_${uuidv4().substring(0, 8)}`;
          console.log(`Creating new window ID: ${newWindowId}`);

          // Update the entity to use the new window ID
          dispatch(
            updateEntityWindowId({
              entityId: entity.id,
              windowId: newWindowId,
            })
          );

          // Open a new window with the new ID
          dispatch(
            openWindow({
              id: newWindowId,
              title: entity.name,
              entityId: entity.id,
              iconPath: entity.iconPath,
            })
          );
          dispatch(addTask(newWindowId));
          return;
        } else {
          console.log(
            `Window is already showing this entity - focusing window`
          );
          // Just focus the window if it's already showing this entity
          dispatch(
            openWindow({
              id: entity.windowId,
              title: entity.name,
              entityId: entity.id,
            })
          );
          dispatch(addTask(entity.windowId));
          return;
        }
      }

      // If we're not opening in new windows and this is a folder
      if (entity.type === 'folder' && !folderOptions.openFoldersInNewWindow) {
        // Try to handle navigation in an existing window
        const parentFolderId = entity.folderId;
        const windowShowingParent = findWindowShowingFolder(parentFolderId);

        console.log(
          `Finding window showing parent ${parentFolderId}: ${windowShowingParent}`
        );

        if (windowShowingParent) {
          console.log(
            `Navigating to ${entity.name} in parent's window ${windowShowingParent}`
          );
          dispatch(
            navigateToFolder({
              windowId: windowShowingParent,
              folderId: entity.id,
              folderName: entity.name,
            })
          );
          return;
        }

        // Try to find an ancestor window
        let currentFolderId = parentFolderId;
        let ancestorFolder = findEntityById(currentFolderId);

        while (ancestorFolder && ancestorFolder.folderId !== 'root') {
          const windowShowingAncestor = findWindowShowingFolder(
            ancestorFolder.id
          );
          if (windowShowingAncestor) {
            console.log(
              `Navigating to ${entity.name} in ancestor's window ${windowShowingAncestor}`
            );
            dispatch(
              navigateToFolder({
                windowId: windowShowingAncestor,
                folderId: entity.id,
                folderName: entity.name,
              })
            );
            return;
          }
          currentFolderId = ancestorFolder.folderId;
          ancestorFolder = findEntityById(currentFolderId);
        }
      }

      // Default behavior - open in original window if not already open
      console.log(
        `Default behavior: opening entity ${entity.name} in window ${entity.windowId}`
      );
      dispatch(
        openWindow({
          id: entity.windowId,
          title: entity.name,
          entityId: entity.id,
        })
      );
      dispatch(addTask(entity.windowId));
    }
  };

  return {
    handleDoubleClickEntity,
  };
};
