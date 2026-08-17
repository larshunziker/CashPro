import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';

export const BOTTOM_BAR_ACTIVE_INDICATOR_WIDTH_PX = 56;
export const BOTTOM_BAR_ACTIVE_INDICATOR_TEST_ID =
  'bottom-bar-active-indicator';

type IndicatorState = {
  translateX: number;
  isVisible: boolean;
};

type UseBottomBarActiveIndicatorParams = {
  activeNavItemId: string | null;
  isIndicatorVisible: boolean;
};

type UseBottomBarActiveIndicatorResult = {
  navRef: RefObject<HTMLElement>;
  setNavItemRef: (id: string, element: HTMLLIElement | null) => void;
  indicatorState: IndicatorState;
};

export default function useBottomBarActiveIndicator({
  activeNavItemId,
  isIndicatorVisible,
}: UseBottomBarActiveIndicatorParams): UseBottomBarActiveIndicatorResult {
  const navRef = useRef<HTMLElement>(null);
  const navItemRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const [indicatorState, setIndicatorState] = useState<IndicatorState>({
    translateX: 0,
    isVisible: false,
  });

  const setNavItemRef = useCallback(
    (id: string, element: HTMLLIElement | null) => {
      if (element) {
        navItemRefs.current.set(id, element);
        return;
      }
      navItemRefs.current.delete(id);
    },
    [],
  );

  useLayoutEffect(() => {
    const updatePosition = () => {
      if (!isIndicatorVisible || !activeNavItemId) {
        setIndicatorState((prev) =>
          prev.isVisible
            ? { translateX: prev.translateX, isVisible: false }
            : prev,
        );
        return;
      }

      const nav = navRef.current;
      const activeItem = navItemRefs.current.get(activeNavItemId);
      if (!nav || !activeItem) {
        return;
      }

      const navRect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const itemCenterX = itemRect.left + itemRect.width / 2 - navRect.left;
      const translateX = itemCenterX - BOTTOM_BAR_ACTIVE_INDICATOR_WIDTH_PX / 2;

      setIndicatorState({
        translateX,
        isVisible: true,
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [activeNavItemId, isIndicatorVisible]);

  return { navRef, setNavItemRef, indicatorState };
}
