import { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { renameEntity } from '../features/fileSystem/fileSystemSlice';
import { useEntities } from './useEntities';

export const useEntityRename = (entityId: string, entityName: string) => {
  const { setIsRenaming, entities } = useEntities();
  // Safely check if entity exists before trying to access its properties
  const entity = entityId ? entities.find((e) => e.id === entityId) : undefined;
  const isRenaming = entity?.isRenaming || false;

  const [tempName, setTempName] = useState(entityName);
  const [hasInitialFocus, setHasInitialFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const selectedEntityIds = useAppSelector(
    (state) => state.fileSystem.selectedEntityIds
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
    if (entityId && selectedEntityIds.includes(entityId)) {
      setIsRenaming(entityId, true);
    }
  };

  const handleRenameBlur = () => {
    commitRename();
  };

  const handleRenameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('Enter key pressed');
      e.preventDefault();
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
      dispatch(renameEntity({ id: entityId, newName: tempName }));
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
