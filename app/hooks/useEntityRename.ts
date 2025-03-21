import { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { renameEntity } from '../features/fileSystem/fileSystemSlice';
import { useEntities } from './useEntities';
import { v4 as uuidv4 } from 'uuid';
import {
  openWindow,
  setHasOpenModal,
  focusWindow,
} from '../features/windows/windowsSlice';

export const useEntityRename = (entityId: string, entityName: string) => {
  const { setIsRenaming, entities, clearSelections, selectEntity } =
    useEntities();
  const { windows, desktopSize } = useAppSelector((state) => state.windows);
  // Safely check if entity exists before trying to access its properties
  const entity = entityId ? entities.find((e) => e.id === entityId) : undefined;
  const parentFolderId = entity?.folderId || '';

  const XPwindow = windows.find((w) => w.entityId === parentFolderId);

  const isRenaming = entity?.isRenaming || false;

  const [tempName, setTempName] = useState(entityName);
  const [hasInitialFocus, setHasInitialFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const selectedEntityIds = useAppSelector(
    (state) => state.fileSystem.selectedEntityIds
  );
  const allEntities = useAppSelector((state) => state.fileSystem.entities);

  const currentEntity = allEntities.find((entity) => entity.id === entityId);

  // Get all entities in the same parent folder
  const siblingsInSameFolder = allEntities.filter(
    (entity) =>
      entity.folderId === currentEntity?.folderId && entity.id !== entityId
  );

  // Check if the new name already exists in the same folder
  const nameExists = siblingsInSameFolder.some(
    (entity) => entity.name.toLowerCase() === tempName.trim().toLowerCase()
  );

  // Reset temp name when entity name changes
  useEffect(() => {
    if (!isRenaming) {
      setTempName(entityName);
      setHasInitialFocus(false); // Reset focus flag when not in rename mode
    }
  }, [entityName, isRenaming]);

  // Focus and select text only once when entering rename mode
  useEffect(() => {
    if (isRenaming && inputRef.current && !hasInitialFocus) {
      inputRef.current.focus();
      inputRef.current.select();
      setHasInitialFocus(true); // Mark as having had initial focus
      adjustInputWidth();
    }
  }, [isRenaming, hasInitialFocus]);

  // Only adjust width on text changes but don't re-select
  useEffect(() => {
    if (isRenaming && hasInitialFocus) {
      adjustInputWidth();
    }
  }, [tempName]);

  // Function to adjust input width based on content
  const adjustInputWidth = () => {
    if (inputRef.current) {
      // Create a temporary span to measure text width
      const tempSpan = document.createElement('span');
      tempSpan.style.font = window.getComputedStyle(inputRef.current).font;
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.whiteSpace = 'nowrap';
      tempSpan.innerText = tempName || entityName;

      document.body.appendChild(tempSpan);
      const textWidth = tempSpan.offsetWidth;
      document.body.removeChild(tempSpan);

      // Add padding for better user experience
      const paddingWidth = 8; // 8px on each side
      const calculatedWidth = Math.min(
        Math.max(textWidth + paddingWidth, 1),
        80
      );

      inputRef.current.style.width = `${calculatedWidth}px`;
    }
  };

  const startRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      entityId &&
      selectedEntityIds.includes(entityId) &&
      selectedEntityIds.length === 1
    ) {
      setIsRenaming(entityId, true);
      clearSelections();
    }
  };

  const handleRenameBlur = () => {
    commitRename();
  };

  const handleRenameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // if (nameExists) return;
      commitRename();
    } else if (e.key === 'Escape') {
      cancelRename();
    }
  };

  const handleRenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Just set the value directly from the input
    setTempName(e.target.value);
  };

  const commitRename = () => {
    if (entityId && tempName.trim() !== '' && tempName !== entityName) {
      if (currentEntity) {
        if (nameExists) {
          openRenameError();
        } else {
          // Proceed with rename if no duplicate exists
          dispatch(renameEntity({ id: entityId, newName: tempName }));
          setTimeout(() => {
            selectEntity(entityId, false);
          }, 100);
        }
      } else {
        // Fallback - dispatch rename action if entity not found (shouldn't happen)
        dispatch(renameEntity({ id: entityId, newName: tempName }));
      }
    } else {
      // If name is empty or unchanged, revert to original
      setTempName(entityName);
    }

    if (entityId) {
      setIsRenaming(entityId, false);
    }
  };

  const cancelRename = () => {
    setTempName(entityName);
    if (entityId) {
      setIsRenaming(entityId, false);
    }
  };

  const openRenameError = () => {
    const modalId = `RenameError-${uuidv4()}`;

    // Safely access window properties with fallbacks
    const windowId = XPwindow?.id ?? parentFolderId;

    dispatch(setHasOpenModal({ id: windowId, hasOpenModal: true }));
    const newModalSize = { width: 750, height: 150 };
    const { height: desktopHeight, width: desktopWidth } = desktopSize;
    const windowPosition = {
      x: (desktopWidth - newModalSize.width) / 2,
      y: (desktopHeight - newModalSize.height) / 2,
    };

    // Open the folder options modal window with the parent ID
    dispatch(
      openWindow({
        id: modalId,
        title: 'Error Renaming File or Folder',
        isModal: true,
        parentId: windowId,
        size: newModalSize,
        position: windowPosition,
        modalTarget: [entityId],
      })
    );
    setTimeout(() => {
      dispatch(focusWindow(modalId));
    }, 50);
  };

  return {
    isRenaming,
    tempName,
    inputRef,
    startRename,
    handleRenameChange,
    handleRenameBlur,
    handleRenameKeyDown,
  };
};
