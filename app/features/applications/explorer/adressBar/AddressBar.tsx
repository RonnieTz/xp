import React from 'react';
import './AddressBar.css';
import Label from './Label';
import Address from './Address';
import GoButton from './GoButton';

interface AddressBarProps {
  folderId: string;
}

const AddressBar = ({ folderId }: AddressBarProps) => {
  return (
    <div className="address-bar">
      <Label />
      <Address folderId={folderId} />
      <GoButton />
    </div>
  );
};

export default AddressBar;
