import Image from 'next/image';
import { Entity } from '../fileSystem/fileSystemSlice';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useEntities } from '../../hooks/useEntities';
import styles from './Entity.module.css';
import EntityIcons from './EntityIcons';

interface EntityProps {
  entity: Entity;
}

const EntityComponent: React.FC<EntityProps> = ({ entity }) => {
  const selectedEntityIds = useAppSelector(
    (state) => state.fileSystem.selectedEntityIds
  );
  const { selectEntity, handleDragStart, handleDoubleClickEntity } =
    useEntities();

  // Compute dynamic style for positioning
  const dynamicContainerStyle: React.CSSProperties = {
    top: entity.position.y,
    left: entity.position.x,
  };

  // Compute dynamic style for image with drop-shadow following icon shape and conditional brightness
  const baseShadow = 'drop-shadow(1px 1px 1px rgba(0,0,0,0.5))';
  const brightness = selectedEntityIds.includes(entity.id)
    ? 'brightness(0.6) '
    : '';
  const dynamicImageStyle: React.CSSProperties = {
    filter: brightness + baseShadow,
  };

  // Compute title classname based on conditions
  let titleClass = styles.title;
  if (selectedEntityIds.includes(entity.id)) {
    titleClass += ' ' + styles.titleSelected;
  } else if (entity.folderId === 'root') {
    titleClass += ' ' + styles.titleRoot;
  } else {
    titleClass += ' ' + styles.titleDefault;
  }

  return (
    <div
      className={styles.entityContainer}
      data-entity-id={entity.id}
      style={dynamicContainerStyle}
      onDrop={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        selectEntity(entity.id, e.ctrlKey);
      }}
      onDoubleClick={() => {
        handleDoubleClickEntity(
          entity.type === 'shortcut' ? entity.targetId : entity.id
        );
      }}
    >
      <EntityIcons
        iconPath={entity.iconPath}
        alt={`${entity.name} icon`}
        dynamicImageStyle={dynamicImageStyle}
        onDragStart={(e) => handleDragStart(e, entity.id)}
        isShortcut={entity.type === 'shortcut'}
      />
      <div className={titleClass}>{entity.name}</div>
    </div>
  );
};

export default EntityComponent;
