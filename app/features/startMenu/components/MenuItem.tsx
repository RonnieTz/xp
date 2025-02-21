import React, { useState, useRef } from 'react';
import TriangleIndicator from './TriangleIndicator'; // updated import
import { useAppDispatch } from '@/app/hooks/reduxHooks';
import { closeAllProgramsMenu } from '../startMenuSlice';
import Tooltip from '../../../components/Tooltip';
import useTooltipMouse from '../../../hooks/useTooltipMouse';

interface MenuItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  bold?: boolean;
  small?: boolean;
  blue?: boolean;
  triangle?: boolean;
  description?: string;
}

export default function MenuItem({
  icon,
  title,
  subtitle,
  bold = false,
  small = false,
  blue = false,
  triangle = false,
  description,
}: MenuItemProps) {
  const [hover, setHover] = useState(false);
  const dispatch = useAppDispatch();
  const timerRef = useRef<number | null>(null);
  const { position, showTooltip, handleMouseMove, handleMouseLeave } =
    useTooltipMouse();

  const titleStyle: React.CSSProperties = {
    color: hover ? '#fff' : blue ? '#0a246a' : '#373738',
    fontWeight: bold ? 'bold' : 'normal',
    fontSize: '13px',
    textWrap: 'nowrap',
  };

  const subtitleStyle: React.CSSProperties = {
    color: hover ? '#fff' : '#808080',
    fontSize: 12,
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: hover ? '#316ac5' : 'transparent',
    height: small ? 32 : 38,
    marginBottom: 5,
    position: 'relative',
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => {
        setHover(true);
        timerRef.current = window.setTimeout(() => {
          dispatch(closeAllProgramsMenu());
        }, 400);
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setHover(false);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        handleMouseLeave();
      }}
    >
      <div
        style={{
          margin: '0 7px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={icon}
          alt=""
          style={{
            width: small ? 25 : 35,
            height: small ? 25 : 35,
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <div style={titleStyle}>{title}</div>
        {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
      </div>
      {triangle && <TriangleIndicator hover={hover} marginRight />}
      {description && showTooltip && (
        <Tooltip title={description} top={position.y} left={position.x} />
      )}
    </div>
  );
}
