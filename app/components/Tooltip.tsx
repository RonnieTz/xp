import React from 'react';

interface TooltipProps {
  title: string;
  top: number | string;
  left: number | string;
}

const Tooltip: React.FC<TooltipProps> = ({ title, top, left }) => {
  const style: React.CSSProperties = {
    position: 'fixed',
    top: top,
    left: left,
    backgroundColor: '#ffffe1',
    color: '#000',
    border: '1.5px solid #000',
    padding: '2px 7px',
    pointerEvents: 'none',
    fontSize: 11,
    zIndex: 2147483647,
  };

  return <div style={style}>{title}</div>;
};

export default Tooltip;
