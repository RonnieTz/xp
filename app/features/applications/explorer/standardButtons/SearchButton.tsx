import React from 'react';
import Image from 'next/image';
import searchIcon from '@/public/Search.png';

const SearchButton = () => {
  return (
    <div className="back-button">
      <Image
        style={{ margin: '0 5px' }}
        src={searchIcon}
        alt="search icon"
        width={30}
        height={30}
      />
      <span className="back-label">Search</span>
    </div>
  );
};

export default SearchButton;
