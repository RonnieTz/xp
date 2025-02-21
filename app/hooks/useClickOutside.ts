import { useEffect } from 'react';

export default function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClick, true);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref, callback]);
}
