import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFeature } from '@growthbook/growthbook-react';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import { getMobileOperatingSystem } from '../../../../../shared/helpers/utils.tsx';
import { BOTTOM_BAR_FEATURE } from '../../../../shared/constants/features';
import {
  BOTTOM_BAR_NAV_ITEMS,
  BottomBarNavItem,
  resolveBottomBarNavItems,
} from './constants';

type BottomBarConfig = {
  isBottomBarActive: boolean;
  isLandscapeOrientation: boolean;
  navItems: BottomBarNavItem[] | null;
};

const getIsLandscapeOrientation = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  if (typeof window.matchMedia === 'function') {
    return window.matchMedia('(orientation: landscape)').matches;
  }

  return window.innerWidth > window.innerHeight;
};

export const computeIsBottomBarActive = ({
  isFeatureOn,
  isHybridApp,
  navItems,
  isMobileViewport,
}: {
  isFeatureOn: boolean;
  isHybridApp: boolean;
  navItems: BottomBarNavItem[] | null;
  isMobileViewport: boolean;
}): boolean =>
  isFeatureOn && !isHybridApp && navItems !== null && isMobileViewport;

export default function useBottomBarConfig(): BottomBarConfig {
  const isHybridApp = useSelector(
    (state: ReduxState) => locationStateSelector(state)?.isHybridApp || false,
  );
  const bottomBarFeature = useFeature(BOTTOM_BAR_FEATURE);
  const isFeatureOn = bottomBarFeature.on;
  const navItems = useMemo(
    () =>
      isFeatureOn
        ? resolveBottomBarNavItems(bottomBarFeature.value)
        : BOTTOM_BAR_NAV_ITEMS,
    [bottomBarFeature.value, isFeatureOn],
  );
  const isMobileViewport = getMobileOperatingSystem() !== '';
  const [isLandscapeOrientation, setIsLandscapeOrientation] = useState(
    getIsLandscapeOrientation,
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const evaluateOrientation = () => {
      setIsLandscapeOrientation(getIsLandscapeOrientation());
    };

    evaluateOrientation();

    const mediaQueryList =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(orientation: landscape)')
        : null;

    mediaQueryList?.addEventListener('change', evaluateOrientation);
    window.addEventListener('orientationchange', evaluateOrientation);
    window.addEventListener('resize', evaluateOrientation);

    return () => {
      mediaQueryList?.removeEventListener('change', evaluateOrientation);
      window.removeEventListener('orientationchange', evaluateOrientation);
      window.removeEventListener('resize', evaluateOrientation);
    };
  }, []);

  return {
    navItems,
    isLandscapeOrientation,
    isBottomBarActive: computeIsBottomBarActive({
      isFeatureOn,
      isHybridApp,
      navItems,
      isMobileViewport,
    }),
  };
}
