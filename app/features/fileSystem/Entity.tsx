import React, { useMemo } from 'react';
import Image from 'next/image';
import { selectEntity } from '../fileSystem/fileSystemSlice';
import { Entity } from '../fileSystem/fileSystemSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

interface EntityProps {
  entity: Entity;
}

const EntityComponent: React.FC<EntityProps> = ({ entity }) => {
  const dispatch = useAppDispatch();
  const selectedEntityIds = useAppSelector(state => state.fileSystem.selectedEntityIds);

  const containerStyle: React.CSSProperties = {
    width: 80,
    height: 80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 100,
  };

  const titleStyle = useMemo<React.CSSProperties>(() => {
    const baseStyle: React.CSSProperties = {
      padding: '0 4px',
      border: '1px dotted transparent',
      boxSizing: 'border-box',
    };
    if (selectedEntityIds.includes(entity.id)) {
      return {
        ...baseStyle,
        color: 'white',
        backgroundColor: '#316ac5',
        border: '1px dotted #ce953a',
      };
    }
    if (entity.folderId === 'root') {
      return {
        ...baseStyle,
        color: 'white',
        textShadow: '1px 1px 2px black',
      };
    }
    return { ...baseStyle, color: 'black' };
  }, [selectedEntityIds, entity.id, entity.folderId]);

  return (
    <div
      style={containerStyle}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(selectEntity({ id: entity.id, ctrlPressed: e.ctrlKey }));
      }}
    >
      <Image src={entity.iconPath} alt={`${entity.name} icon`} width={40} height={40} />
      <span style={titleStyle}>{entity.name}</span>
    </div>
  );
};

export default EntityComponent;
