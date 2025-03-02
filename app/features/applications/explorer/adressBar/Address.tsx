import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import foldericon from '@/public/Folder Closed.png';
import ExpandButton from './ExpandButton';
import { useEntityPath } from '@/app/features/fileSystem/hooks/useEntityPath';
import './AddressBar.css';

interface AddressProps {
  folderId: string;
}

const Address = ({ folderId }: AddressProps) => {
  // Get the current path based on the first selected entity
  const currentPath = useEntityPath(folderId);
  const [displayPath, setDisplayPath] = useState(currentPath);

  // Update display path when the selected entity changes
  useEffect(() => {
    setDisplayPath(currentPath);
  }, [currentPath]);

  const handlePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayPath(e.target.value);
  };

  // Handler to select all text when input receives focus
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div className="address-display-container">
      <input
        className="address-display"
        value={displayPath}
        onChange={handlePathChange}
        onFocus={handleFocus}
      />
      <Image
        className="address-folder-icon"
        src={foldericon}
        alt="icon"
        height={24}
        width={24}
      />
      <ExpandButton />
    </div>
  );
};

export default Address;
