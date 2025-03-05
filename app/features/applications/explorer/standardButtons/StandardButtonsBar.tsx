import React from 'react';
import './StandardButtonsBar.css';
import BackButton from './BackButton';
import ForwardButton from './ForwardButton';
import VerticalDivider from './VerticalDivider';
import SearchButton from './SearchButton';
import FoldersButton from './FoldersButton';
import ViewsButton from './ViewsButton';
import UpButton from './UpButton';
import { useEntities } from '@/app/hooks/useEntities';
import { get } from 'http';

interface StandardButtonsBarProps {
  windowId: string;
}

const StandardButtonsBar = ({ windowId }: StandardButtonsBarProps) => {
  const { getNavigationState } = useEntities();
  const { canGoBack, canGoForward } = getNavigationState(windowId);
  return (
    <div className="standard-buttons-bar">
      <BackButton windowId={windowId} disabled={!canGoBack} />
      <ForwardButton windowId={windowId} disabled={!canGoForward} />
      <UpButton />
      <VerticalDivider />
      <SearchButton />
      <FoldersButton />
      <VerticalDivider />
      <ViewsButton />
    </div>
  );
};

export default StandardButtonsBar;
