import React from 'react';
import ResizeAnchor from './ResizeAnchor';

interface ResizeAnchorProps {
  handleAnchorMouseDown: (
    anchor:
      | 'top'
      | 'bottom'
      | 'left'
      | 'right'
      | 'top-left'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-right',
    e: React.MouseEvent
  ) => void;
}

const ResizeAnchors = ({ handleAnchorMouseDown }: ResizeAnchorProps) => {
  return (
    <>
      <ResizeAnchor
        direction="top"
        onMouseDown={(e) => handleAnchorMouseDown('top', e)}
      />
      <ResizeAnchor
        direction="bottom"
        onMouseDown={(e) => handleAnchorMouseDown('bottom', e)}
      />
      <ResizeAnchor
        direction="left"
        onMouseDown={(e) => handleAnchorMouseDown('left', e)}
      />
      <ResizeAnchor
        direction="right"
        onMouseDown={(e) => handleAnchorMouseDown('right', e)}
      />
      <ResizeAnchor
        direction="top-left"
        onMouseDown={(e) => handleAnchorMouseDown('top-left', e)}
      />
      <ResizeAnchor
        direction="top-right"
        onMouseDown={(e) => handleAnchorMouseDown('top-right', e)}
      />
      <ResizeAnchor
        direction="bottom-left"
        onMouseDown={(e) => handleAnchorMouseDown('bottom-left', e)}
      />
      <ResizeAnchor
        direction="bottom-right"
        onMouseDown={(e) => handleAnchorMouseDown('bottom-right', e)}
      />
    </>
  );
};

export default ResizeAnchors;
