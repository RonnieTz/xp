import React from 'react';
import { WindowEntity } from '../windowsState';
import { useAppSelector } from '@/app/hooks/reduxHooks';
import Explorer from '../../applications/explorer/Explorer';
import FolderOptions from '../../applications/explorer/folderOptions/FolderOptions';

interface WindowContentProps {
  window: WindowEntity;
  currentWidth: number;
}

const WindowContent: React.FC<WindowContentProps> = ({
  window,
  currentWidth,
}) => {
  const { entities } = useAppSelector((state) => state.fileSystem);
  const { isMaximized } = window;

  // Get the entity ID from the window's navigation history if available,
  // otherwise fallback to the entityId property
  const entityId = window.navigationHistory?.current || window.entityId;

  // Find the entity based on the current navigation state
  const entity = entities.find((e) => e.id === entityId);

  return (
    <div
      className="window-content"
      style={{
        width: isMaximized ? '100%' : undefined,
        height: isMaximized ? 'calc(100% - 80px)' : undefined,
        left: isMaximized ? 0 : undefined,
      }}
    >
      {entity?.type === 'folder' && (
        <Explorer
          folderId={entity.id}
          width={currentWidth}
          windowId={window.id} // Pass the window ID to Explorer
        />
      )}
      {window.id.includes('FolderOptionsWindow') && (
        <FolderOptions windowId={window.id} />
      )}
    </div>
  );
};

export default WindowContent;
