import { useEffect, useRef, useState } from 'react';

export type ScrollDirection = 'up' | 'down' | null;

const SCROLL_THRESHOLD_PX = 5;

/**
 * Returns the current scroll direction ('up' | 'down') or null before any scroll.
 * Uses requestAnimationFrame to throttle scroll event handling and avoid jank.
 */
function useScrollDirection(): ScrollDirection {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const lastScrollYRef = useRef<number>(
    typeof window !== 'undefined' ? window.scrollY : 0,
  );
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafIdRef.current !== null) {
        return;
      }
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollYRef.current;

        if (Math.abs(delta) >= SCROLL_THRESHOLD_PX) {
          setScrollDirection(delta > 0 ? 'down' : 'up');
          lastScrollYRef.current = currentScrollY;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return scrollDirection;
}

export default useScrollDirection;
