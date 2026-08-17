import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useFeatureValue } from '@growthbook/growthbook-react';
import { tealiumTrackEvent } from '../../../../../shared/helpers/tealium';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import ClientSideOnly from '../../../../../common/components/ClientSideOnly';
import Icon from '../Icon';
import RefetchGqlDataLink from '../RefetchGqlDataLink';
import { TOP_PROMO_BANNER_FEATURE } from '../../../../shared/constants/features';
import styles from './styles.legacy.css';

export const BANNER_VISIBLE_CLASS = 'beo-top-promo-banner-visible';

export const TOP_PROMO_BANNER_TEST_ID = 'top-promo-banner';

export type TopPromoBannerConfig = Readonly<{
  growthBookFeature: string;
  message: string;
  ctaPath: string;
  ctaLabel: string;
  ctaAriaLabel?: string;
}>;

export const isTopPromoBannerConfig = (
  value: unknown,
): value is TopPromoBannerConfig => {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const config = value as TopPromoBannerConfig;
  return (
    typeof config.growthBookFeature === 'string' &&
    typeof config.message === 'string' &&
    typeof config.ctaPath === 'string' &&
    typeof config.ctaLabel === 'string'
  );
};

const trackBanner = (
  growthBookFeature: string,
  elementAction: string,
  eventName: 'element_click' | 'element_view' = 'element_click',
  extra?: Record<string, string>,
) => {
  tealiumTrackEvent({
    type: 'link',
    payload: {
      event_name: eventName,
      element_name: growthBookFeature,
      element_action: elementAction,
      ...extra,
    },
  });
};

const getIsDismissedFromStorage = (growthBookFeature: string): boolean => {
  if (!growthBookFeature || globalThis.localStorage === undefined) {
    return false;
  }
  try {
    return globalThis.localStorage.getItem(growthBookFeature) === '1';
  } catch {
    return false;
  }
};

const TopPromoBannerInner = (): ReactElement | null => {
  const isHybridApp = useSelector(
    (state: ReduxState) => locationStateSelector(state).isHybridApp,
  );

  const gbActive = __ENABLE_GROWTHBOOK__ && !__TESTING__;
  const featureValue = useFeatureValue<TopPromoBannerConfig | false>(
    TOP_PROMO_BANNER_FEATURE,
    false,
  );
  const config = isTopPromoBannerConfig(featureValue) ? featureValue : null;
  const shouldShowByGrowthBook = !gbActive || config !== null;

  const growthBookFeature = config?.growthBookFeature ?? '';

  const [sessionDismissed, setSessionDismissed] = useState(false);

  useEffect(() => {
    setSessionDismissed(false);
    return undefined;
  }, [growthBookFeature]);

  const dismissed =
    sessionDismissed || getIsDismissedFromStorage(growthBookFeature);

  const isVisible = useMemo(
    () =>
      config !== null && !isHybridApp && !dismissed && shouldShowByGrowthBook,
    [config, dismissed, isHybridApp, shouldShowByGrowthBook],
  );

  const hasTrackedImpression = useRef(false);

  const handleDismiss = useCallback(() => {
    if (!config) {
      return;
    }
    trackBanner(config.growthBookFeature, 'close');
    try {
      globalThis.localStorage?.setItem(config.growthBookFeature, '1');
    } catch {}
    setSessionDismissed(true);
  }, [config]);

  const handleCtaClick = useCallback(() => {
    if (!config) {
      return;
    }
    trackBanner(config.growthBookFeature, 'click_cta', 'element_click', {
      link_url: config.ctaPath,
    });
  }, [config]);

  useEffect(() => {
    if (!isVisible || !config) {
      hasTrackedImpression.current = false;
      return undefined;
    }
    if (!hasTrackedImpression.current) {
      trackBanner(config.growthBookFeature, 'impression', 'element_view');
      hasTrackedImpression.current = true;
    }
    return undefined;
  }, [config, isVisible]);

  useEffect(() => {
    if (globalThis.document === undefined) {
      return undefined;
    }
    if (isVisible) {
      document.documentElement.classList.add(BANNER_VISIBLE_CLASS);
    } else {
      document.documentElement.classList.remove(BANNER_VISIBLE_CLASS);
    }
    return () => {
      document.documentElement.classList.remove(BANNER_VISIBLE_CLASS);
    };
  }, [isVisible]);

  if (!isVisible || !config) {
    return null;
  }

  const resolvedCtaAriaLabel = config.ctaAriaLabel ?? config.ctaLabel;

  return (
    <div className={styles.Wrapper} data-testid={TOP_PROMO_BANNER_TEST_ID}>
      <div className={styles.Inner}>
        <p className={styles.Message}>{config.message}</p>
        <RefetchGqlDataLink
          path={config.ctaPath}
          className={styles.Cta}
          onClick={handleCtaClick}
          title={config.ctaLabel}
          ariaLabel={resolvedCtaAriaLabel}
        >
          <span>{config.ctaLabel}</span>
        </RefetchGqlDataLink>
        <button
          type="button"
          className={styles.CloseButton}
          aria-label="Banner schliessen"
          onClick={handleDismiss}
        >
          <Icon type="IconXMark" addClass={styles.CloseIcon} />
        </button>
      </div>
    </div>
  );
};

export default function TopPromoBanner(): ReactElement {
  return (
    <ClientSideOnly>
      <TopPromoBannerInner />
    </ClientSideOnly>
  );
}
