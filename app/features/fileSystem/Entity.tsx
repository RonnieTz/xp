import { Entity } from '../fileSystem/fileSystemTypes';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useEntities } from '../../hooks/useEntities';
import styles from './Entity.module.css';
import EntityIcons from './EntityIcons';
import { useHoverSelection } from '@/app/hooks/useHoverSelection';
import { useEntityStyles } from '@/app/hooks/useEntityStyles';

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
  const { selectEntity, handleDragStart, handleDoubleClickEntity } =
    useEntities();

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

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isSingleClick) {
      setTimeout(() => {
        handleDoubleClickEntity(
          entity.type === 'shortcut' ? entity.targetId : entity.id
        );
      }, 600);
    } else {
      selectEntity(entity.id, e.ctrlKey);
    }
  };

  const handleDoubleClick = () => {
    handleDoubleClickEntity(
      entity.type === 'shortcut' ? entity.targetId : entity.id
    );
  };

  return (
    <div
      className={styles.entityContainer}
      data-entity-id={entity.id}
      style={containerStyle}
      onDrop={(e) => e.stopPropagation()}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <EntityIcons
        iconPath={entity.iconPath}
        alt={`${entity.name} icon`}
        dynamicImageStyle={imageStyle}
        onDragStart={(e) => handleDragStart(e, entity.id)}
        isShortcut={entity.type === 'shortcut'}
      />
      <div className={titleClass}>{entity.name}</div>
    </div>
  );
};

export default EntityComponent;
