import React, { useState, useRef } from 'react';
import TriangleIndicator from './TriangleIndicator'; // import TriangleIndicator
import AllProgramsMenu from './AllProgramsMenu';
import Tooltip from '../../../components/Tooltip';
import useTooltipMouse from '../../../hooks/useTooltipMouse';

export interface AllProgramsMenuItemProps {
  icon: string;
  title: string;
  triangle?: boolean; // added optional triangle prop
  onClick?: () => void;
  children?: React.ReactNode;
  description?: string;
}

const baseItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 10px',
  height: 25,
  textWrap: 'nowrap',
};

const iconStyle: React.CSSProperties = {
  width: 18,
  height: 18,
  marginRight: 10,
};

export default function AllProgramsMenuItem({
  icon,
  title,
  triangle,
  onClick,
  children,
  description,
}: AllProgramsMenuItemProps) {
  const [hover, setHover] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const expandTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null); // new close timer ref
  const {
    position,
    showTooltip,
    handleMouseMove,
    handleMouseLeave: hookMouseLeave,
  } = useTooltipMouse();

  const containerStyle: React.CSSProperties = {
    ...baseItemStyle,
    background: hover ? '#316ac5' : 'transparent',
    position: 'relative',
    cursor: 'default',
  };

  const textStyle: React.CSSProperties = {
    fontSize: 14,
    color: hover ? '#fff' : '#000',
    paddingRight: 15,
  };

  const handleMouseEnter = () => {
    setHover(true);
    if (closeTimerRef.current) {
      // cancel pending close timer
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (triangle) {
      expandTimerRef.current = window.setTimeout(() => {
        setExpanded(true);
      }, 500);
    }
  };

  const handleMouseLeave = () => {
    setHover(false);
    if (expandTimerRef.current) {
      clearTimeout(expandTimerRef.current);
      expandTimerRef.current = null;
    }
    if (triangle) {
      closeTimerRef.current = window.setTimeout(() => {
        setExpanded(false);
      }, 500); // delay before collapse
    } else {
      setExpanded(false);
    }
  };

  return (
    <div
      style={containerStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave();
        hookMouseLeave();
      }}
    >
      <img src={icon} alt={title} style={iconStyle} />
      <span style={textStyle}>{title}</span>
      {triangle && <TriangleIndicator hover={hover} />}
      {triangle && expanded && (
        <AllProgramsMenu position="top">{children}</AllProgramsMenu>
      )}
      {description && showTooltip && (
        <Tooltip title={description} top={position.y} left={position.x} />
      )}
    </div>
  );
}
