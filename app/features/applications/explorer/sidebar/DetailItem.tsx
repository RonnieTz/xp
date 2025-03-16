import React from 'react';
import './DetailItem.css';
import { useEntities } from '@/app/hooks/useEntities';

interface DetailItemProps {
  folderId: string;
}

const DetailItem = ({ folderId }: DetailItemProps) => {
  const { entities, selectedEntityIds } = useEntities();
  const selectedEntitiesInFolder = entities.filter(
    (entity) =>
      selectedEntityIds.includes(entity.id) && entity.folderId === folderId
  );
  const currentFolder = entities.find((entity) => entity.id === folderId);

  // Handle multiple selected items
  if (selectedEntitiesInFolder.length > 1) {
    return (
      <div className="detail-item">
        <p className="detail-description">{`${selectedEntitiesInFolder.length} items selected`}</p>
      </div>
    );
  }

  // Handle single selected item
  if (selectedEntitiesInFolder.length === 1) {
    const selectedEntity = selectedEntitiesInFolder[0];
    return (
      <div className="detail-item">
        <h3 className="detail-title">{selectedEntity.name}</h3>
        <p className="detail-description">
          {selectedEntity.type === 'folder' ? 'File Folder' : 'Application'}
        </p>
        <p className="detail-date">
          Date Modified: {formatDate(selectedEntity.modifiedDate)}
        </p>
      </div>
    );
  }

  // Default: show folder details when no item is selected
  return (
    <div className="detail-item">
      {currentFolder && (
        <>
          <h3 className="detail-title">{currentFolder.name}</h3>
          <p className="detail-description">File Folder</p>
          <p className="detail-date">
            Date Modified: {formatDate(currentFolder.modifiedDate)}
          </p>
        </>
      )}
    </div>
  );
};

// Helper function to format dates
const formatDate = (dateString: string | number) => {
  const date = new Date(dateString);
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  return `${date.toLocaleDateString(
    'en-US',
    dateOptions
  )}, ${date.toLocaleTimeString('en-US', timeOptions)}`;
};

export default DetailItem;
