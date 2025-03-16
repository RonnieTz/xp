import { useMemo } from 'react';
import { Entity } from '../features/fileSystem/fileSystemTypes';
import styles from '../features/fileSystem/Entity.module.css';
import { useAppSelector } from './reduxHooks';

export const useEntityStyles = (
  entity: Entity,
  isSelected: boolean,
  isHovered: boolean
) => {
  const folderOptions = useAppSelector(
    (state) => state.fileSystem.folderOptions
  );
  const { underlineOption } = folderOptions;

  const containerStyle = useMemo(() => {
    return {
      left: `${entity.position.x}px`,
      top: `${entity.position.y}px`,
    };
  }, [entity.position.x, entity.position.y]);

  const imageStyle = useMemo(() => {
    return {
      cursor: 'pointer', // Image always has pointer cursor
      opacity: isSelected ? 0.8 : 1,
    };
  }, [isSelected]);

  const titleClass = useMemo(() => {
    let baseClass = styles.title;

    // Add selected class if selected
    if (isSelected) {
      baseClass += ` ${styles.titleSelected}`;

      if (isHovered) {
        baseClass += ` ${styles.titleSelectedHovered}`;
      }
    }
    // Add root class if in root folder
    else if (entity.folderId === 'root') {
      baseClass += ` ${styles.titleRoot}`;
    }
    // Otherwise use default styling
    else {
      baseClass += ` ${styles.titleDefault}`;
    }

    // Add underline styling based on folder options
    if (
      underlineOption === 'browser' ||
      (underlineOption === 'hover' && isHovered)
    ) {
      baseClass += ` ${styles.titleUnderlined}`;
    }

    return baseClass;
  }, [isSelected, isHovered, entity.folderId, underlineOption]);

  return { containerStyle, imageStyle, titleClass };
};
