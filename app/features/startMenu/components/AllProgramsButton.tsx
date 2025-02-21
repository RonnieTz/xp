import React from 'react';
import Image from 'next/image';
import AllProgramsMenu from './AllProgramsMenu';
import useAllProgramsMenuMouse from '../../../hooks/useAllProgramsMenuMouse';
import AllProgramsMenuContent from './AllProgramsMenuContent';

export default function AllProgramsButton() {
  const {
    containerRef,
    effectiveHover,
    handleMouseEnter,
    handleMouseLeave,
    menuVisible,
  } = useAllProgramsMenuMouse();

  // Extract styles for readability
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    height: 35,
    backgroundColor: effectiveHover ? '#316ac5' : 'transparent',
    padding: '0 7px',
    cursor: 'pointer',
  };

  const textStyle: React.CSSProperties = {
    color: effectiveHover ? '#fff' : '#373738',
    fontSize: 13,
    fontWeight: 'bold',
  };

  const iconStyle: React.CSSProperties = { backgroundColor: 'transparent' };

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={textStyle}>All Programs</div>
      <Image
        src="/All Programs Icon.png"
        alt="All Programs Icon"
        width={25}
        height={25}
        style={iconStyle}
      />
      {menuVisible && (
        <AllProgramsMenu root position="bottom">
          <AllProgramsMenuContent />
        </AllProgramsMenu>
      )}
    </div>
  );
}
