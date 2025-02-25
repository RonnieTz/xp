import React from 'react';

interface ResizeAnchorProps {
  direction: string;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ResizeAnchor: React.FC<ResizeAnchorProps> = ({
  direction,
  onMouseDown,
}) => {
  return (
    <div
      className={`resize-anchor ${direction}`}
      onMouseDown={(e) => {
        e.stopPropagation();
        onMouseDown(e);
      }}
    />
  );
};

export default ResizeAnchor;
