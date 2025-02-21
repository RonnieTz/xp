import React from 'react';

interface TriangleIndicatorProps {
  hover: boolean;
  marginRight?: boolean;
}

export default function TriangleIndicator({
  hover,
  marginRight,
}: TriangleIndicatorProps) {
  const style: React.CSSProperties = {
    marginLeft: 'auto',
    width: 0,
    height: 0,
    borderTop: '5px solid transparent',
    borderBottom: '5px solid transparent',
    borderLeft: `5px solid ${hover ? '#fff' : '#0a246a'}`,
    marginRight: marginRight ? 7 : -4,
  };

  return <div style={style} />;
}
