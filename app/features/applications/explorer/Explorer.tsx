import React from 'react';
import ExplorerToolbar from './toolbar/ExplorerToolbar';
import './explorer.css';
import StandardButtonsBar from './standardButtons/StandardButtonsBar';
import AddressBar from './adressBar/AddressBar';

interface ExplorerProps {
  folderId: string;
}

const Explorer = ({ folderId }: ExplorerProps) => {
  return (
    <div className="explorer-container">
      <ExplorerToolbar />
      <StandardButtonsBar />
      <AddressBar folderId={folderId} />
    </div>
  );
};

export default Explorer;
