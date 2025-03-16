import { Entity } from '../fileSystem/fileSystemTypes';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useEntities } from '../../hooks/useEntities';
import styles from './Entity.module.css';
import EntityIcons from './EntityIcons';
import { useHoverSelection } from '@/app/hooks/useHoverSelection';
import { useEntityStyles } from '@/app/hooks/useEntityStyles';
import { useEntityRename } from '@/app/hooks/useEntityRename';
import { useState, useRef } from 'react';

interface EntityProps {
  entity: Entity;
}

const EntityComponent: React.FC<EntityProps> = ({ entity }) => {
  const selectedEntityIds = useAppSelector(
    (state) => state.fileSystem.selectedEntityIds
  );
  const { folderOptions } = useAppSelector((state) => state.fileSystem);
  const { isSingleClick } = folderOptions;
  const isSelected = selectedEntityIds.includes(entity.id);
  const {
    selectEntity,
    handleDragStart,
    handleDoubleClickEntity,
    handleRenameEntity,
  } = useEntities();

  // Use custom hooks
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHoverSelection(
    entity,
    selectEntity
  );
  const { containerStyle, imageStyle, titleClass } = useEntityStyles(
    entity,
    isSelected,
    isHovered
  );

  // Add rename functionality
  const {
    isRenaming,
    tempName,
    inputRef,
    startRename,
    handleRenameChange,
    handleRenameBlur,
    handleRenameKeyDown,
  } = useEntityRename(entity.id, entity.name);

  // Add state to track clicks for title area specifically
  const [titleClickTimer, setTitleClickTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const titleClickCount = useRef(0);
  const clickTimeout = 250; // ms to wait before deciding it's a single click

  // Handle click on entity container (icon, background)
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isSingleClick) {
      // For single-click mode, immediately open
      handleDoubleClickEntity(
        entity.type === 'shortcut' ? entity.targetId : entity.id
      );
    } else {
      // For double-click mode, just select the entity
      selectEntity(entity.id, e.ctrlKey);
    }
  };

  // Handle click specifically on the title area
  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Increment click counter
    titleClickCount.current += 1;

    // If it's the first click
    if (titleClickCount.current === 1) {
      // Set a timer to handle as a single click after the timeout
      const timer = setTimeout(() => {
        // Reset counter
        titleClickCount.current = 0;

        // If already selected and not in rename mode, enter rename mode
        if (isSelected && !isRenaming) {
          startRename(e);
        } else {
          // Otherwise just select the entity
          selectEntity(entity.id, e.ctrlKey);
        }
      }, clickTimeout);

      setTitleClickTimer(timer);
    } else {
      // It's a double click - cancel the single click action
      titleClickCount.current = 0;

      // Clear the timer to prevent the single-click action
      if (titleClickTimer) {
        clearTimeout(titleClickTimer);
        setTitleClickTimer(null);
      }

      // Use the standard double-click handler
      handleDoubleClick();
    }
  };

  const handleDoubleClick = () => {
    if (!isRenaming) {
      handleDoubleClickEntity(
        entity.type === 'shortcut' ? entity.targetId : entity.id
      );
    }
  };

  // Clean up any timers when needed
  const cleanupTimers = () => {
    if (titleClickTimer) {
      clearTimeout(titleClickTimer);
      setTitleClickTimer(null);
    }
  };

  return (
    <div
      className={styles.entityContainer}
      data-entity-id={entity.id}
      style={containerStyle}
      onDrop={(e) => e.stopPropagation()}
      onClick={handleContainerClick}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={(e) => {
        handleMouseLeave();
        cleanupTimers();
      }}
    >
      <EntityIcons
        iconPath={entity.iconPath}
        alt={`${entity.name} icon`}
        dynamicImageStyle={imageStyle}
        onDragStart={(e) => handleDragStart(e, entity.id)}
        isShortcut={entity.type === 'shortcut'}
      />
      {isRenaming ? (
        <input
          ref={inputRef}
          className={styles.renameInput}
          value={tempName}
          onChange={handleRenameChange}
          onBlur={handleRenameBlur}
          onKeyDown={handleRenameKeyDown}
          onClick={(e) => e.stopPropagation()}
          autoFocus
        />
      ) : (
        <div className={`${titleClass}`} onClick={handleTitleClick}>
          {entity.name}
        </div>
      )}
    </div>
  );
};

export default EntityComponent;
