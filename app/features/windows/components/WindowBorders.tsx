import React from 'react';
import ImageNext from 'next/image';
import leftborder from '@/public/leftborder.png';
import rightborder from '@/public/rightborder.png';
import bottomborder from '@/public/bottomborder.png';

interface WindowBordersProps {
  isFocused: boolean;
}

const WindowBorders: React.FC<WindowBordersProps> = ({ isFocused }) => (
  <>
    <ImageNext
      src={leftborder}
      alt="left border"
      className={`left-border${!isFocused ? ' unfocused' : ''}`}
    />
    <ImageNext
      src={rightborder}
      alt="right border"
      className={`right-border${!isFocused ? ' unfocused' : ''}`}
    />
    <ImageNext
      src={bottomborder}
      alt="bottom border"
      className={`bottom-border${!isFocused ? ' unfocused' : ''}`}
    />
  </>
);

export default WindowBorders;
