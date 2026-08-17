import { renderHook, act } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { useFeature } from '@growthbook/growthbook-react';
import useBottomBarConfig, {
  computeIsBottomBarActive,
} from '../useBottomBarConfig';
import { BOTTOM_BAR_NAV_ITEMS } from '../constants';
import * as utils from '../../../../../../shared/helpers/utils.tsx';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('@growthbook/growthbook-react', () => ({
  useFeature: jest.fn(),
}));

jest.mock('../../../../../../shared/helpers/utils.tsx', () => ({
  ...jest.requireActual('../../../../../../shared/helpers/utils.tsx'),
  getMobileOperatingSystem: jest.fn(() => 'iOS'),
}));

type MediaQueryChangeListener = (event: MediaQueryListEvent) => void;

const setupOrientationMatchMedia = (initialLandscape: boolean) => {
  let isLandscape = initialLandscape;
  const listeners = new Set<MediaQueryChangeListener>();

  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: isLandscape,
      media: query,
      onchange: null,
      addEventListener: (event: string, listener: MediaQueryChangeListener) => {
        if (event === 'change') {
          listeners.add(listener);
        }
      },
      removeEventListener: (
        event: string,
        listener: MediaQueryChangeListener,
      ) => {
        if (event === 'change') {
          listeners.delete(listener);
        }
      },
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  return {
    setLandscape(nextValue: boolean) {
      isLandscape = nextValue;
      listeners.forEach((listener) => {
        listener({
          matches: nextValue,
          media: '(orientation: landscape)',
        } as MediaQueryListEvent);
      });
    },
  };
};

describe('[Hook] useBottomBarConfig', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSelector as jest.Mock).mockReturnValue(false);
    (useFeature as jest.Mock).mockReturnValue({ on: true, value: undefined });
    (utils.getMobileOperatingSystem as jest.Mock).mockReturnValue('iOS');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('keeps BottomBar active and updates orientation state on rotation', () => {
    const orientation = setupOrientationMatchMedia(true);
    const { result } = renderHook(() => useBottomBarConfig());

    expect(result.current.isBottomBarActive).toBe(true);
    expect(result.current.isLandscapeOrientation).toBe(true);

    act(() => {
      orientation.setLandscape(false);
    });

    expect(result.current.isBottomBarActive).toBe(true);
    expect(result.current.isLandscapeOrientation).toBe(false);
  });
});

describe('computeIsBottomBarActive', () => {
  it('returns true when all activation conditions are met', () => {
    expect(
      computeIsBottomBarActive({
        isFeatureOn: true,
        isHybridApp: false,
        navItems: BOTTOM_BAR_NAV_ITEMS,
        isMobileViewport: true,
      }),
    ).toBe(true);
  });

  it('returns false when feature flag is off', () => {
    expect(
      computeIsBottomBarActive({
        isFeatureOn: false,
        isHybridApp: false,
        navItems: BOTTOM_BAR_NAV_ITEMS,
        isMobileViewport: true,
      }),
    ).toBe(false);
  });

  it('returns false in hybrid app', () => {
    expect(
      computeIsBottomBarActive({
        isFeatureOn: true,
        isHybridApp: true,
        navItems: BOTTOM_BAR_NAV_ITEMS,
        isMobileViewport: true,
      }),
    ).toBe(false);
  });

  it('returns false when nav items are disabled by config', () => {
    expect(
      computeIsBottomBarActive({
        isFeatureOn: true,
        isHybridApp: false,
        navItems: null,
        isMobileViewport: true,
      }),
    ).toBe(false);
  });

  it('returns false on non-mobile viewport', () => {
    expect(
      computeIsBottomBarActive({
        isFeatureOn: true,
        isHybridApp: false,
        navItems: BOTTOM_BAR_NAV_ITEMS,
        isMobileViewport: false,
      }),
    ).toBe(false);
  });
});
