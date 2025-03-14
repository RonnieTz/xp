import { Entity } from '../features/fileSystem/fileSystemTypes';
import { useAppSelector } from './reduxHooks';
import styles from '../features/fileSystem/Entity.module.css';

export const useEntityStyles = (
  entity: Entity,
  isSelected: boolean,
  isHovered: boolean
) => {
  const { folderOptions } = useAppSelector((state) => state.fileSystem);
  const { isSingleClick, underlineOption } = folderOptions;

  // Position styling
  const containerStyle: React.CSSProperties = {
    top: entity.position.y,
    left: entity.position.x,
    position: entity.folderId === 'root' ? 'absolute' : 'initial',
  };

  // Image styling
  const baseShadow = 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))';
  const brightness = isSelected ? 'brightness(0.6) ' : '';
  const imageStyle: React.CSSProperties = {
    filter: brightness + baseShadow,
  };

  // Title styling
  let titleClass = styles.title;

  if (isSelected) {
    titleClass +=
      isSingleClick && isHovered
        ? ' ' + styles.titleSelectedHovered
        : ' ' + styles.titleSelected;
  } else if (entity.folderId === 'root') {
    titleClass += ' ' + styles.titleRoot;
  } else {
    titleClass += ' ' + styles.titleDefault;
  }

  // Handle underline styles
  if (isSingleClick && underlineOption === 'browser') {
    titleClass += ' ' + styles.titleUnderlined;
  } else if (underlineOption === 'hover' && isHovered) {
    titleClass += ' ' + styles.titleUnderlined;
  }

  return { containerStyle, imageStyle, titleClass };
};
