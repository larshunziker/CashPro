import { useEffect, useRef, useState } from 'react';
import scrollableContentStyles from '../components/ScrollableDrawerContent/styles.legacy.css';
type DrawerPosition = 'open';
const DEFAULT_OFFSET = 55;

/* @ts-ignore TODO: TS7031 ->  Binding element 'drawerRef' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'contentRef' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'isMobile' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'setIsOpen' implicitly has an 'any' type. */
const useBottomDrawer = ({ drawerRef, contentRef, isMobile, setIsOpen }) => {
  const transformValueAtTouchstartRef = useRef(null);
  const startYRef = useRef<number | null>(null);
  const currentYRef = useRef<number | null>(null);
  const userPreferredDrawerPosition = useRef<DrawerPosition>(null);
  const [lastUpdated, setLastUpdated] = useState(+new Date());

  const getCurrentTransformYValue = (
    drawerElement: HTMLElement | null,
  ): number => {
    const computedTransformStyleValue: Array<string> = global
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Element'. */
      .getComputedStyle(drawerElement)
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

  const setDrawerPosition = (element: HTMLElement, preferredDrawerPos: any) => {
    if (!element) {
      return;
    }

    if (preferredDrawerPos === 'open') {
      element.style.transform = `translateY(calc(0px))`;
      element.style.opacity = `1`;
    } else {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
      element.style.transform = null;
    }
  };

  useEffect(() => {
    // @ts-ignore
    const isKeyboardOpen = global?.visualViewport?.height < global?.innerHeight;
    const drawerElement: HTMLElement | null = drawerRef?.current;
    const contentEl: HTMLElement | null = contentRef?.current;
    if (!drawerElement || !contentEl || isKeyboardOpen) {
      return;
    }
    const scrollableContentElementRef = drawerRef.current.querySelector(
      `.${scrollableContentStyles.ScrollableContentWrapper}`,
    ) as HTMLElement;

    const handleTouchStart = ({ touches }: TouchEvent) => {
      /* @ts-ignore TODO: TS2322 ->  Type 'number' is not assignable to type 'null'. */
      transformValueAtTouchstartRef.current =
        getCurrentTransformYValue(drawerElement);
      startYRef.current = touches[0].pageY;
      currentYRef.current = touches[0].pageY;
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

      // @ts-ignore
      const isKeyboardOpen = global.visualViewport.height < global.innerHeight;
      if (deltaY > 0 && drawerElement && !isKeyboardOpen) {
        drawerElement.style.transform = `translateY(${deltaY}px)`;
        drawerElement && drawerElement.classList.add('touch-move');
      }
    };

    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    const handleTouchEnd = (event) => {
      if (drawerElement.classList.contains('touch-move')) {
        setLastUpdated(event.timeStamp);
        drawerElement && drawerElement.classList.remove('touch-move');
      }
    };

    const handleContentTouchMove = (event: TouchEvent) => {
      if (Math.abs(getCurrentTransformYValue(drawerElement)) < 120) {
        if (
          scrollableContentElementRef &&
          scrollableContentElementRef.scrollTop !== 0
        ) {
          event.stopPropagation();
          startYRef.current = null;
        } else {
          if (startYRef.current === null) {
            startYRef.current = event.touches[0].pageY;
          }
        }
      }
    };

    if (drawerElement && isMobile) {
      drawerElement.addEventListener('touchstart', handleTouchStart, {
        passive: true,
      });
      drawerElement.addEventListener('touchmove', handleTouchMove, {
        passive: true,
      });
      drawerElement.addEventListener('touchend', handleTouchEnd, {
        passive: true,
      });
    }

    if (contentEl && isMobile) {
      contentEl.addEventListener('touchmove', handleContentTouchMove, {
        passive: true,
      });
    }

    return () => {
      (drawerElement && (drawerElement.removeEventListener as any))(
        'touchstart',
        handleTouchStart,
        {
          passive: true,
        },
      );
      (drawerElement && (drawerElement.removeEventListener as any))(
        'touchmove',
        handleTouchMove,
        {
          passive: true,
        },
      );
      (drawerElement && (drawerElement.removeEventListener as any))(
        'touchend',
        handleTouchEnd,
        {
          passive: true,
        },
      );

      (contentEl && (contentEl.removeEventListener as any))(
        'touchmove',
        handleContentTouchMove,
        {
          passive: true,
        },
      );
    };
  }, [contentRef, drawerRef, isMobile, lastUpdated]);

  useEffect(() => {
    if (startYRef.current === null || !isMobile || !drawerRef?.current) {
      return;
    }

    if (drawerRef.current) {
      if (
        global.innerHeight - drawerRef.current.getBoundingClientRect().top <
        drawerRef.current.getBoundingClientRect().height - 80
      ) {
        setIsOpen(false);
        setTimeout(() => {
          /* @ts-ignore TODO: TS2540 ->  Cannot assign to 'current' because it is a read-only property. */
          userPreferredDrawerPosition.current = null;
          setDrawerPosition(
            drawerRef.current,
            userPreferredDrawerPosition.current,
          );
        }, 300);
      } else {
        /* @ts-ignore TODO: TS2540 ->  Cannot assign to 'current' because it is a read-only property. */
        userPreferredDrawerPosition.current = 'open';
        setDrawerPosition(
          drawerRef.current,
          userPreferredDrawerPosition.current,
        );
      }
    }

    // reset scroll position references
    startYRef.current = null;
    currentYRef.current = null;
  }, [lastUpdated, setIsOpen, isMobile, drawerRef]);
};

export default useBottomDrawer;
