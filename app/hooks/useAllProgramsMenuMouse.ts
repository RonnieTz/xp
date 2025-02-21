import { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import {
  openAllProgramsMenu,
  closeAllProgramsMenu,
} from '../features/startMenu/startMenuSlice';

export default function useAllProgramsMenuMouse() {
  const [hover, setHover] = useState(false);
  const dispatch = useAppDispatch();
  const menuVisible = useAppSelector(
    (state) => state.startMenu.allProgramsMenuVisible
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const openTimerRef = useRef<number | null>(null);

  const effectiveHover = hover || menuVisible;

  const handleMouseEnter = () => {
    setHover(true);
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    openTimerRef.current = window.setTimeout(() => {
      dispatch(openAllProgramsMenu());
    }, 500); // changed delay to 500ms
  };

  const handleMouseLeave = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    setHover(false);
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        dispatch(closeAllProgramsMenu());
        setHover(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [dispatch]);

  return {
    containerRef,
    effectiveHover,
    handleMouseEnter,
    handleMouseLeave,
    menuVisible,
  };
}
