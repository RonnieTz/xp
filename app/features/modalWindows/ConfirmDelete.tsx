import './ConfirmDelete.css';
import { useEffect, useState } from 'react';
import { useEntities } from '@/app/hooks/useEntities';
import Image from 'next/image';
import icon from '@/public/Delete Confirmation.png';
import { useWindowManager } from '../windows/hooks/useWindowManager';

interface ConfirmDeleteProps {
  windowId: string;
  targetId: string[];
}

const ConfirmDelete = ({ windowId, targetId }: ConfirmDeleteProps) => {
  const [selected, setSelected] = useState('yes');

  const { close } = useWindowManager(
    windowId,
    { x: 0, y: 0 },
    {
      width: 600,
      height: 150,
    }
  );
  const { clearSelections, findEntityById, removeEntity } = useEntities();

  useEffect(() => {
    clearSelections();
  }, []);

  // Add keyboard event listener for arrow key navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        // Toggle between yes and no
        setSelected((prev) => (prev === 'yes' ? 'no' : 'yes'));
      } else if (event.key === 'Enter') {
        // Execute the selected action
        if (selected === 'yes') {
          targetId.forEach((id) => {
            removeEntity(id);
          });
          close();
        } else {
          close();
        }
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selected, targetId, close]);

  const message = {
    oneFolder: `Are you sure you want to remove '${
      findEntityById(targetId[0])?.name
    }' and all its contents?`,
    oneFile: `Are you sure you want to delete '${
      findEntityById(targetId[0])?.name
    }'?`,
    multiple: `Are you sure you want to delete these ${targetId.length} items?`,
  };

  const handleConfirm = () => {
    targetId.forEach((id) => {
      removeEntity(id);
    });
    close();
  };

  return (
    <div className="confirm-delete-container">
      <div className="confirm-delete-message">
        <Image src={icon} alt="confirm delete icon" width={50} height={50} />
        <div>
          {targetId.length > 1
            ? message.multiple
            : findEntityById(targetId[0])?.type === 'folder'
            ? message.oneFolder
            : message.oneFile}
        </div>
      </div>
      <div className="confirm-delete-buttons">
        <div
          className={selected === 'yes' ? 'confirm-delete-selected' : ''}
          onClick={handleConfirm}
        >
          yes
        </div>
        <div
          className={selected === 'no' ? 'confirm-delete-selected' : ''}
          onClick={close}
        >
          no
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
