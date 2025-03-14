import { useState, useRef, useEffect } from 'react';
import { Entity, FolderEntity } from '../features/fileSystem/fileSystemTypes';
import { useAppSelector } from './reduxHooks';

export const useHoverSelection = (
  entity: Entity,
  onSelect: (id: string, ctrlKey: boolean) => void
) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { focusedWindow } = useAppSelector((state) => state.windows);
  const { folderOptions } = useAppSelector((state) => state.fileSystem);
  const { isSingleClick } = folderOptions;
  const entities = useAppSelector((state) => state.fileSystem.entities);
  const parentEntity = entities.find(
    (e) => e.id === entity.folderId
  ) as FolderEntity;

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovered(true);

    // If single click mode is enabled, start the hover selection timer
    if (isSingleClick) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }

      hoverTimeoutRef.current = setTimeout(() => {
        // Only select if still hovering and in the correct window context
        if (
          (entity.folderId === 'root' && !focusedWindow) ||
          parentEntity?.windowId === focusedWindow
        ) {
          onSelect(entity.id, e.ctrlKey);
        }
      }, 600);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    // Clear the hover selection timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  return { isHovered, handleMouseEnter, handleMouseLeave };
};
