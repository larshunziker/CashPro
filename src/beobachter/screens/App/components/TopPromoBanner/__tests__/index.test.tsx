import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useFeatureValue } from '@growthbook/growthbook-react';
import { tealiumTrackEvent } from '../../../../../../shared/helpers/tealium';
import { routeInitialState } from '../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import SSRContextProvider from '../../../../../../common/components/SSRContext';
import TopPromoBanner, {
  BANNER_VISIBLE_CLASS,
  TOP_PROMO_BANNER_TEST_ID,
  type TopPromoBannerConfig,
} from '../index';

jest.mock('../../../../../../shared/helpers/tealium', () => ({
  tealiumTrackEvent: jest.fn(),
}));

jest.mock('@growthbook/growthbook-react', () => ({
  useFeatureValue: jest.fn(),
}));

const mockBannerConfig: TopPromoBannerConfig = {
  growthBookFeature: 'beo-test-top-promo-banner',
  message: 'Test promo message',
  ctaPath: '/test-promo-path',
  ctaLabel: 'Jetzt entdecken',
};

const renderBanner = (routeOverrides: Record<string, unknown> = {}) => {
  const initialState = {
    route: { ...routeInitialState, ...routeOverrides },
  };
  return render(
    <ReduxProvider initialState={initialState}>
      <SSRContextProvider>
        <TopPromoBanner />
      </SSRContextProvider>
    </ReduxProvider>,
  );
};

describe('[Component] TopPromoBanner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFeatureValue as jest.Mock).mockReturnValue(mockBannerConfig);
    try {
      globalThis.localStorage?.removeItem(mockBannerConfig.growthBookFeature);
    } catch {
      // ignore
    }
    document.documentElement.classList.remove(BANNER_VISIBLE_CLASS);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('does not render in hybrid app', () => {
    renderBanner({ isHybridApp: true });
    expect(screen.queryByTestId(TOP_PROMO_BANNER_TEST_ID)).toBeNull();
    expect(
      document.documentElement.classList.contains(BANNER_VISIBLE_CLASS),
    ).toBe(false);
  });

  it('does not render when previously dismissed in localStorage', () => {
    globalThis.localStorage?.setItem(mockBannerConfig.growthBookFeature, '1');
    renderBanner();
    expect(screen.queryByTestId(TOP_PROMO_BANNER_TEST_ID)).toBeNull();
    expect(tealiumTrackEvent).not.toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({ element_action: 'impression' }),
      }),
    );
  });

  it('tracks impression when visible', () => {
    renderBanner();
    expect(tealiumTrackEvent).toHaveBeenCalledWith({
      type: 'link',
      payload: {
        event_name: 'element_view',
        element_name: mockBannerConfig.growthBookFeature,
        element_action: 'impression',
      },
    });
  });

  it('renders CTA and tracks click', () => {
    renderBanner();
    expect(screen.getByTestId(TOP_PROMO_BANNER_TEST_ID)).toBeInTheDocument();
    expect(
      document.documentElement.classList.contains(BANNER_VISIBLE_CLASS),
    ).toBe(true);
    const cta = screen.getByRole('link', { name: /jetzt entdecken/i });
    fireEvent.click(cta);
    expect(tealiumTrackEvent).toHaveBeenCalledWith({
      type: 'link',
      payload: {
        event_name: 'element_click',
        element_name: mockBannerConfig.growthBookFeature,
        element_action: 'click_cta',
        link_url: mockBannerConfig.ctaPath,
      },
    });
  });

  it('tracks close and hides banner', () => {
    renderBanner();
    fireEvent.click(screen.getByRole('button', { name: /banner schliessen/i }));
    expect(tealiumTrackEvent).toHaveBeenCalledWith({
      type: 'link',
      payload: {
        event_name: 'element_click',
        element_name: mockBannerConfig.growthBookFeature,
        element_action: 'close',
      },
    });
    expect(screen.queryByTestId(TOP_PROMO_BANNER_TEST_ID)).toBeNull();
    expect(
      globalThis.localStorage?.getItem(mockBannerConfig.growthBookFeature),
    ).toBe('1');
    expect(
      document.documentElement.classList.contains(BANNER_VISIBLE_CLASS),
    ).toBe(false);
  });

  it('does not render when GrowthBook is active and feature is off', () => {
    const g = globalThis as typeof globalThis & {
      __TESTING__?: boolean;
      __ENABLE_GROWTHBOOK__?: boolean;
    };
    const prevTesting = g.__TESTING__;
    const prevGb = g.__ENABLE_GROWTHBOOK__;
    g.__TESTING__ = false;
    g.__ENABLE_GROWTHBOOK__ = true;
    (useFeatureValue as jest.Mock).mockReturnValue(false);

    renderBanner();

    expect(screen.queryByTestId(TOP_PROMO_BANNER_TEST_ID)).toBeNull();

    g.__TESTING__ = prevTesting;
    g.__ENABLE_GROWTHBOOK__ = prevGb;
  });

  it('does not render when GrowthBook value is not a valid config', () => {
    const g = globalThis as typeof globalThis & {
      __TESTING__?: boolean;
      __ENABLE_GROWTHBOOK__?: boolean;
    };
    const prevTesting = g.__TESTING__;
    const prevGb = g.__ENABLE_GROWTHBOOK__;
    g.__TESTING__ = false;
    g.__ENABLE_GROWTHBOOK__ = true;
    (useFeatureValue as jest.Mock).mockReturnValue(true);

    renderBanner();

    expect(screen.queryByTestId(TOP_PROMO_BANNER_TEST_ID)).toBeNull();

    g.__TESTING__ = prevTesting;
    g.__ENABLE_GROWTHBOOK__ = prevGb;
  });

  it('uses separate dismiss state per growthBookFeature', () => {
    const otherConfig: TopPromoBannerConfig = {
      growthBookFeature: 'beo-other-top-promo-banner',
      message: 'Other promo',
      ctaPath: '/other-path',
      ctaLabel: 'Other CTA',
    };
    globalThis.localStorage?.setItem(mockBannerConfig.growthBookFeature, '1');
    (useFeatureValue as jest.Mock).mockReturnValue(otherConfig);
    try {
      renderBanner();
      expect(screen.getByTestId(TOP_PROMO_BANNER_TEST_ID)).toBeInTheDocument();
    } finally {
      globalThis.localStorage?.removeItem(otherConfig.growthBookFeature);
    }
  });
});
