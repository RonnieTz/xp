import React, { useState, useRef, useEffect } from 'react';
import './SidebarButton.css';
import Image from 'next/image';
import doubleArrow from '@/public/arrow-double.svg';
import doubleArrowHighlighted from '@/public/arrow-double-highlighted.svg';

interface SidebarButtonProps {
  onClick?: () => void;
  title: string;
  children?: React.ReactNode;
}

const SidebarButton = ({ onClick, title, children }: SidebarButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded, children]);

  const handleClick = (e: React.MouseEvent) => {
    setIsExpanded((prev) => !prev);
    onClick && onClick();
  };

  return (
    <div className="sidebar-button-wrapper">
      <button
        className={`sidebar-button ${isExpanded ? 'expanded' : ''}`}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {title}
        <div className="arrow-circle">
          <Image
            src={isHovered ? doubleArrowHighlighted : doubleArrow}
            style={{
              rotate: isExpanded ? '90deg' : '-90deg',
              transition: 'rotate 0.3s ease',
            }}
            alt="Double arrow"
            width={5}
            height={5}
          />
        </div>
      </button>
      <div
        className={`sidebar-content ${isExpanded ? 'expanded' : ''}`}
        style={{ height: `${contentHeight}px` }}
      >
        <div ref={contentRef} className="sidebar-content-inner">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarButton;
