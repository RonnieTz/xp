import React from 'react';

export default function HorizontalDivider() {
  return (
    <div
      style={{
        height: '1.5px',
        width: '100%',
        background:
          'linear-gradient(to right, transparent, #d3d3c8, transparent)',
        margin: '5px 0',
      }}
    />
  );
}
