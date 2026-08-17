import { useEffect, useRef } from 'react';

const DEFAULT_SCROLL_DIRECTION = 'vertical';

type ScrollDirection = 'vertical' | 'horizontal';

export const useScrollbarSync = (
  el1: Element,
  el2: Element,
  scrolldirection: ScrollDirection = DEFAULT_SCROLL_DIRECTION,
) => {
  const ignoreScrollEventsRef = useRef(false);

  useEffect(() => {
    if (!el1 || !el2) return;

    const handleScroll = () => {
      ignoreScrollEventsRef.current = false;
      if (ignoreScrollEventsRef.current) return;

      ignoreScrollEventsRef.current = true;
      if (scrolldirection === 'vertical') {
        el2.scrollTop = el1.scrollTop;
      } else {
        el2.scrollLeft = el1.scrollLeft;
      }
    };

    el1.addEventListener('scroll', handleScroll);

    return () => {
      el1.removeEventListener('scroll', handleScroll);
    };
  }, [el1, el2, scrolldirection]);
};
