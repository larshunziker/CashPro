// @description This caption component is only used on mobile viewport. It adds swipable captions to the fullscreen gallery. It can be moved to common in case there is a usecase for other publications

import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styles from './styles.legacy.css';
import type { CaptionProps } from './typings';

type CaptionPosition = 'bottom' | 'middle' | 'top';

const SCROLLABLECONTENT_ID = 'scrollable-content';
const DEFAULT_OFFSET = 55;

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const ScrollableContent = ({ children }) => {
  const height: number = global.innerHeight - 47;
  return (
    <div
      id={SCROLLABLECONTENT_ID}
      style={{ height }}
      className={styles.ScrollableContentWrapper}
    >
      {children}
    </div>
  );
};

/**
 *
 * @param {HTMLElement} captionEl
 * @returns Returns the translateY value from the input element
 */
const getCurrentTransformYValue = (captionEl: HTMLElement | null): number => {
  const computedTransformStyleValue: Array<string> = global
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Element'. */
    .getComputedStyle(captionEl)
    .transform.split(',');

  return (
    Math.floor(
      Number(
        computedTransformStyleValue[
          computedTransformStyleValue.length - 1
        ].split(')')[0],
      ),
    ) || 0
  );
};

const setCaptionPostion = (
  element: HTMLElement,
  preferedCaptionPos: CaptionPosition,
) => {
  if (!element) {
    return;
  }

  switch (preferedCaptionPos) {
    case 'bottom':
      element.style.transform = `translateY(0)`;
      element.style.opacity = `0.8`;
      break;

    case 'middle':
      element.style.transform = `translateY(-150px)`;
      element.style.opacity = `0.8`;
      break;

    case 'top':
      element.style.transform = `translateY(calc(-100% + ${DEFAULT_OFFSET}px))`;
      element.style.opacity = `1`;
      break;

    default:
      break;
  }
};

const Caption = ({ children, activeIndex }: CaptionProps): ReactElement => {
  const captionRef = useRef(null);
  const contentRef = useRef(null);
  const transformValueAtTouchstartRef = useRef(null);
  const startYRef = useRef<number | null>(null);
  const currentYRef = useRef<number | null>(null);
  const userPreferedCaptionPosition = useRef<CaptionPosition>('middle');
  /* eslint-disable-next-line */
  const [lastUpdated, setLastUpdated] = useState(+new Date());

  useEffect(() => {
    const captionEl: HTMLElement | null = captionRef.current;
    const contentEl: HTMLElement | null = contentRef.current;

    const scrollableContentElementRef = document.querySelector(
      `#${SCROLLABLECONTENT_ID}`,
    );

    const handleTouchStart = ({ touches }: TouchEvent) => {
      /* @ts-ignore TODO: TS2322 ->  Type 'number' is not assignable to type 'null'. */
      transformValueAtTouchstartRef.current =
        getCurrentTransformYValue(captionEl);
      startYRef.current = touches[0].pageY;
      currentYRef.current = touches[0].pageY;

      /* @ts-ignore TODO: TS2339 ->  Property 'classList' does not exist on type 'never'. */
      captionEl && captionEl.classList.add('touch-move');
    };

    const handleTouchMove = (event: TouchEvent) => {
      const { touches } = event;

      currentYRef.current = touches[0].pageY;

      const deltaY = Math.floor(
        Math.max(
          -(global.innerHeight - DEFAULT_OFFSET),
          currentYRef.current -
            ((startYRef.current || 0) -
              (transformValueAtTouchstartRef.current || 0)),
        ),
      );

      if (deltaY <= 0 && captionEl) {
        /* @ts-ignore TODO: TS2339 ->  Property 'style' does not exist on type 'never'. */
        captionEl.style.transform = `translateY(${deltaY}px)`;
      }
    };

    const handleTouchEnd = () => {
      setLastUpdated(+new Date());
      /* @ts-ignore TODO: TS2339 ->  Property 'classList' does not exist on type 'never'. */
      captionEl && captionEl.classList.remove('touch-move');
    };

    const handleContentTouchMove = (event: TouchEvent) => {
      if (
        Math.abs(getCurrentTransformYValue(captionEl)) ===
        global.innerHeight - DEFAULT_OFFSET
      ) {
        if (
          scrollableContentElementRef &&
          scrollableContentElementRef.scrollTop !== 0
        ) {
          event.stopPropagation();
          startYRef.current = null;
        }
      } else {
        if (startYRef.current === null) {
          startYRef.current = event.touches[0].pageY;
        }
      }
    };

    if (captionEl) {
      /* @ts-ignore TODO: TS2339 ->  Property 'addEventListener' does not exist on type 'never'. */
      captionEl.addEventListener('touchstart', handleTouchStart, {
        passive: true,
      });
      /* @ts-ignore TODO: TS2339 ->  Property 'addEventListener' does not exist on type 'never'. */
      captionEl.addEventListener('touchmove', handleTouchMove, {
        passive: true,
      });
      /* @ts-ignore TODO: TS2339 ->  Property 'addEventListener' does not exist on type 'never'. */
      captionEl.addEventListener('touchend', handleTouchEnd, {
        passive: true,
      });
    }

    if (contentEl) {
      /* @ts-ignore TODO: TS2339 ->  Property 'addEventListener' does not exist on type 'never'. */
      contentEl.addEventListener('touchmove', handleContentTouchMove, {
        passive: true,
      });
    }

    const cleanup = () => {
      if (captionEl) {
        /* @ts-ignore TODO: TS2339 ->  Property 'removeEventListener' does not exist on type 'never'. */
        (captionEl.removeEventListener as any)('touchstart', handleTouchStart, {
          passive: true,
        });
        /* @ts-ignore TODO: TS2339 ->  Property 'removeEventListener' does not exist on type 'never'. */
        (captionEl.removeEventListener as any)('touchmove', handleTouchMove, {
          passive: true,
        });
        /* @ts-ignore TODO: TS2339 ->  Property 'removeEventListener' does not exist on type 'never'. */
        (captionEl.removeEventListener as any)('touchend', handleTouchEnd, {
          passive: true,
        });
      }

      if (contentEl) {
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        (captionEl.removeEventListener as any)(
          'touchmove',
          handleContentTouchMove,
          {
            passive: true,
          },
        );
      }
    };

    return cleanup;
  }, []);

  useEffect((): void => {
    if (startYRef.current === null) {
      return;
    }

    const deltaY = Math.floor(
      Math.max(
        -(global.innerHeight - DEFAULT_OFFSET),
        (currentYRef.current || 0) -
          (startYRef.current - (transformValueAtTouchstartRef.current || 0)),
      ),
    );

    if (captionRef.current) {
      // scroll to default pos if scroll distance is less than 1/12 of the window height
      if (Math.abs(deltaY) <= global.innerHeight / 12) {
        userPreferedCaptionPosition.current = 'bottom';

        setCaptionPostion(
          captionRef.current,
          userPreferedCaptionPosition.current,
        );

        //scroll to middle pos if scroll distance is less than half of the window height
      } else if (Math.abs(deltaY) <= global.innerHeight / 2) {
        userPreferedCaptionPosition.current = 'middle';

        setCaptionPostion(
          captionRef.current,
          userPreferedCaptionPosition.current,
        );

        // scroll to top position if scroll distance is more than half of the window height
      } else {
        setCaptionPostion(captionRef.current, 'top');
      }
    }

    // reset to default pos on initial render or on slide change
    if (currentYRef.current === null) {
      setCaptionPostion(
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'HTMLElement'. */
        captionRef.current,
        userPreferedCaptionPosition.current,
      );
    }
    // reset scroll position references
    startYRef.current = null;
    currentYRef.current = null;
  });

  useEffect(() => {
    // set default position if the image changes
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'HTMLElement'. */
    setCaptionPostion(captionRef.current, userPreferedCaptionPosition.current);
  }, [activeIndex]);

  if (typeof children !== 'function') {
    // This component uses the renderprops pattern, you can't pass plain strings or jsx as children
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  return (
    <div ref={captionRef} className={styles.Wrapper}>
      <div ref={contentRef}>{children({ ScrollableContent })}</div>
    </div>
  );
};

export default Caption;
