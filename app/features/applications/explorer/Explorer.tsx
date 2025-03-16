import React from 'react';
import ExplorerToolbar from './toolbar/ExplorerToolbar';
import './explorer.css';
import StandardButtonsBar from './standardButtons/StandardButtonsBar';
import AddressBar from './adressBar/AddressBar';
import { useEntities } from '@/app/hooks/useEntities';
import Sidebar from './sidebar/Sidebar';
import Content from './content/Content';
import { useAppSelector } from '@/app/hooks/reduxHooks';

interface ExplorerProps {
  folderId: string;
  width: number;
  windowId: string; // Add windowId prop
}

const Explorer = ({
  folderId: initialFolderId,
  width,
  windowId,
}: ExplorerProps) => {
  const { entities } = useEntities();

  // Get the current folder ID from the window's navigation history
  const window = useAppSelector((state) =>
    state.windows.windows.find((win) => win.id === windowId)
  );
  const folderOptions = useAppSelector(
    (state) => state.fileSystem.folderOptions
  );

  // Use the current folder ID from navigation history, or fall back to the initial prop
  const currentFolderId = window?.navigationHistory?.current || initialFolderId;

  const folder = entities.find((entity) => entity.id === currentFolderId);

  return (
    <div className="explorer-container">
      <ExplorerToolbar folderId={currentFolderId} />
      {folder?.type === 'folder' && (
        <>
          {folder.showStandardButtons && (
            <StandardButtonsBar windowId={windowId} />
          )}
          {folder.showAddressBar && <AddressBar folderId={currentFolderId} />}
          <div className="explorer-content-wrapper">
            {width > 500 && folderOptions.showCommonTasks && (
              <Sidebar folderId={currentFolderId} />
            )}
            <Content folderId={currentFolderId} />
          </div>
        </>
      )}
    </div>
  );
};

export default Explorer;
