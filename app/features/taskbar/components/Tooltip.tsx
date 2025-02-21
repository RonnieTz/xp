import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './tooltip.css';

type TooltipProps = {
  text: string;
  children: React.ReactNode;
};

export default function Tooltip({ text, children }: TooltipProps) {
  const [hover, setHover] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'visible',
        height: '100%',
      }}
      onMouseEnter={() => {
        timerRef.current = setTimeout(() => {
          setHover(true);
        }, 500); // 1 second delay
      }}
      onMouseLeave={() => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        setHover(false);
      }}
    >
      {children}
      <CSSTransition
        in={hover}
        timeout={200}
        classNames="tooltip"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div
          ref={nodeRef}
          style={{
            position: 'absolute',
            bottom: '100%',
            right: 0,
            background: '#fff',
            color: '#000',
            border: '2px solid #000',
            padding: '2px 4px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            zIndex: 1000,
            boxSizing: 'border-box',
          }}
        >
          {text}
        </div>
      </CSSTransition>
    </div>
  );
}
