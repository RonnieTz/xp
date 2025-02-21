import { useState, useRef, useCallback } from 'react';

interface TooltipPosition {
  x: number;
  y: number;
}

export default function useTooltipMouse() {
  const [position, setPosition] = useState<TooltipPosition>({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    // Hide tooltip on mouse movement
    setShowTooltip(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setPosition({ x: e.clientX, y: e.clientY + 20 });
      setShowTooltip(true);
    }, 400);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setShowTooltip(false);
  }, []);

  return { position, showTooltip, handleMouseMove, handleMouseLeave };
}
