import React from 'react';
import './StandardButtonsBar.css';
import BackButton from './BackButton';
import ForwardButton from './ForwardButton';
import VerticalDivider from './VerticalDivider';
import SearchButton from './SearchButton';
import FoldersButton from './FoldersButton';
import ViewsButton from './ViewsButton';
import UpButton from './UpButton';

const StandardButtonsBar: React.FC = () => {
  return (
    <div className="standard-buttons-bar">
      <BackButton />
      <ForwardButton />
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
