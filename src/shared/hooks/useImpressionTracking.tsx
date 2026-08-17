// INFO: a hook used for impression tracking on NativeAdvertisings
// the fetch gets called on mount and on update if a user switches between different NativeAdvertisings

import { useEffect, useRef } from 'react';
import { replaceTrackingUrlPlaceholders } from '../helpers/tracking';

type useImpressionTrackingConfig = {
  trackingDetailImpression: string;
  isNativeAdvertising: boolean;
} & Pick<LocationBeforeTransitions, 'pathname'> &
  Pick<LocationState, 'screenReady'>;

type useImpressionTrackingType = (options: useImpressionTrackingConfig) => void;

const useImpressionTracking: useImpressionTrackingType = ({
  trackingDetailImpression = '',
  screenReady,
  pathname,
  isNativeAdvertising,
}) => {
  const trackingDetailImpressionRef = useRef(trackingDetailImpression || '');

  useEffect(() => {
    trackingDetailImpressionRef.current = trackingDetailImpression;
  });

  useEffect(() => {
    if (screenReady && trackingDetailImpressionRef.current) {
      fetch(
        replaceTrackingUrlPlaceholders(trackingDetailImpressionRef.current),
        {
          mode: 'no-cors',
        },
      );
    }
  }, [isNativeAdvertising, pathname, screenReady]);
};

export default useImpressionTracking;
