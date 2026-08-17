import { useEffect, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { tealiumTrackEvent } from '../../../shared/helpers/tealium';
import { log } from '../../../shared/helpers/utils';
import { removeHyphen } from './helper';

/**
 * Since not all metrics are always available,
every performance metric that is present has an additional attribute with the suffix _count and the value 1. performance metrics that are not present can either be omitted or sent with _count 0. 
This is required to calculate correct average values (averaged over number of measured values, not number of page views or similar).

 If all of them had always been present, the BI team
 would have simply counted the number of performance_metric_onload events globally.  But this way we have to count it individually per metric. 
 */
type PerformanceTrackingData = {
  first_paint?: number;
  first_paint_count?: number;
  first_contentful_paint?: number;
  first_contentful_paint_count?: number;
  time_to_first_byte?: number;
  time_to_first_byte_count?: number;
};

const sendLargestContentfulPaintTracking = (lcpValue: number) => {
  tealiumTrackEvent({
    type: 'link',
    payload: {
      event_name: 'performance_metric_largest_contentful_paint',
      largest_contentful_paint: lcpValue,
      largest_contentful_paint_count: 1,
    },
  });
  log(
    'Performance-Measure-Provider ',
    [
      'tracking sent on location/visiblity change',
      { largest_contentful_paint: lcpValue, largest_contentful_paint_count: 1 },
    ],
    'green',
  );
};

const useLargestContentfulPaintTracking = () => {
  const [isLcpDataSent, setIsLcpDataSent] = useState(false);
  const lcpRef = useRef(null);
  const initialRouteRef = useRef(null);

  const pathname: string = useSelector(
    ({ route }: ReduxState) => route.locationBeforeTransitions.pathname,
    shallowEqual,
  );

  if (!initialRouteRef.current) {
    /* @ts-ignore TODO: TS2322 ->  Type 'string' is not assignable to type 'null'. */
    initialRouteRef.current = pathname;
  }

  // useEffect for largest contentful paint
  useEffect(() => {
    try {
      /**
       * As of writing this, the PerformanceObserver is widely supported by many browsers, but the "largest-contentful-paint" metric was only available in chrome
       */
      const po = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcp =
          (lastEntry as any).renderTime || (lastEntry as any).loadTime;

        /* @ts-ignore TODO: TS2322 ->  Type 'number' is not assignable to type 'null'. */
        lcpRef.current = Number(lcp.toFixed());
        // use when need to test INP long task processing time
        //   for (const entry of entries) {
        //     // Check for relevant events, such as first-input or long task events
        //     if (entry.entryType === 'longtask') {
        //       // Calculate processing time for long tasks
        //       const processingTime = entry.duration;
        //       console.log('Processing time of long task:', processingTime);
        //     }
        //   }
      });
      po.observe({ type: 'largest-contentful-paint', buffered: true });
      // po.observe({
      //   type: 'longtask',
      //   buffered: true,
      // });
    } catch (error) {
      log(
        'Performance-Measure-Provider ',
        ['PerformanceObserver error', error],
        'red',
      );
    }

    const visibilitychangeHandler = () => {
      if (
        lcpRef.current &&
        document.visibilityState === 'hidden' &&
        !isLcpDataSent
      ) {
        sendLargestContentfulPaintTracking(lcpRef.current);

        setIsLcpDataSent(true);
      }
    };

    if (!isLcpDataSent) {
      addEventListener('visibilitychange', visibilitychangeHandler, true);
    }

    return () => {
      removeEventListener('visibilitychange', visibilitychangeHandler, true);
    };
  }, [isLcpDataSent]);

  // useEffect to send LCP data once on location change
  useEffect(() => {
    if (
      initialRouteRef.current !== pathname &&
      !isLcpDataSent &&
      !!lcpRef.current
    ) {
      sendLargestContentfulPaintTracking(lcpRef.current);

      setIsLcpDataSent(true);
    }
  }, [pathname, isLcpDataSent]);
};

const PerformanceMeasureProvider = () => {
  useLargestContentfulPaintTracking();

  useEffect(() => {
    const output: PerformanceTrackingData = {};

    /**
     * Gather performance data for first_paint, first_contentful_paint and time_to_first_byte. The setTimeout is necessary, otherwise the data will be null.
     */
    setTimeout(() => {
      if (window.performance) {
        const performance = window.performance;
        const performanceTiming = performance?.timing;
        const ttfb =
          performanceTiming?.responseStart - performanceTiming?.requestStart;
        if (ttfb) {
          output.time_to_first_byte = ttfb;
          output.time_to_first_byte_count = 1;
        }

        const performanceEntries = performance?.getEntriesByType?.('paint');

        performanceEntries &&
          Array.isArray(performanceEntries) &&
          performanceEntries.forEach((performanceEntry) => {
            /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'PerformanceTracki */
            output[removeHyphen(performanceEntry.name)] = Number(
              performanceEntry.startTime.toFixed(),
            );
            /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '`${string}_count`' can't be used to index type 'Perfor */
            output[`${removeHyphen(performanceEntry.name)}_count`] = 1;
          });
      } else {
        log(
          'Performance-Measure-Provider ',
          ["Performance timing isn't supported."],
          'red',
        );
      }
    });

    setTimeout(() => {
      tealiumTrackEvent({
        type: 'link',
        payload: {
          event_name: 'performance_metric_onload',
          ...output,
        },
      });
      log(
        'Performance-Measure-Provider ',
        ['tracking sent on load', output],
        'green',
      );
    }, 0);
  }, []);

  return null;
};

export default PerformanceMeasureProvider;
