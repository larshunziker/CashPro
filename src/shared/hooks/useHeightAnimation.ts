import { CSSProperties, useMemo, useRef, useState } from 'react';

const EXPAND_DURATION = 300;

export function useHeightAnimation<T extends HTMLElement>(
  isOpen = false,
  duration = EXPAND_DURATION,
) {
  const contentRef = useRef<T>();
  const [maxHeight, setMaxHeight] = useState(isOpen ? '100%' : 0);

  const handleClick = () => {
    setMaxHeight('100%');
    setTimeout(() => setMaxHeight(maxHeight === 0 ? '100%' : 0));
  };

  const inlineStyles: CSSProperties = useMemo(
    () => ({
      transformOrigin: 'top',
      transform: maxHeight === '100%' ? 'scaleY(1)' : 'scaleY(0)',
      transition: `transform ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out 100ms`,
      opacity: maxHeight === '100%' ? '1' : '0',
      maxHeight: maxHeight,
    }),
    [duration, maxHeight],
  );

  return { maxHeight, handleClick, contentRef, inlineStyles };
}
