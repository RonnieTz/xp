import React from 'react';
import { WindowEntity } from '../windowsState';
import { useAppSelector } from '@/app/hooks/reduxHooks';
import Explorer from '../../applications/explorer/Explorer';

interface WindowContentProps {
  window: WindowEntity;
}

const WindowContent: React.FC<WindowContentProps> = ({ window }) => {
  const { entities } = useAppSelector((state) => state.fileSystem);
  const { isMaximized } = window;
  const entity = entities.find((e) => e.id === window.entityId);

  return (
    <div
      className="window-content"
      style={{
        width: isMaximized ? '100%' : undefined,
        height: isMaximized ? 'calc(100% - 80px)' : undefined,
        left: isMaximized ? 0 : undefined,
      }}
    >
      {entity?.type === 'folder' ? <Explorer folderId={entity.id} /> : null}
    </div>
  );
};

export default WindowContent;
