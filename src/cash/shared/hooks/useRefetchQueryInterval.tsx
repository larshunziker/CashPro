import { useEffect, useRef } from 'react';
import { log } from '../../../shared/helpers/utils';

const useRefetchQueryInterval = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'refetch' implicitly has an 'any' type. */
  refetch,
  minutes = 15,
  callback = null,
  minTimeForCallback = 10,
}): boolean => {
  const refetchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const refetchIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  const milliseconds = 60_000;
  const pollInterval = milliseconds * minutes;

  useEffect(() => {
    if (!refetch) {
      log('HOOKS', ['useRefetchQueryInterval', 'no refetch'], 'red');
      return;
    }

    const now = new Date();
    const min = now.getMinutes();
    const minutesToNextQuarterHour = minutes - (min % minutes);
    const minutesToNextQuarterInterval =
      minutesToNextQuarterHour * milliseconds;

    log(
      'HOOKS',
      ['useRefetchQueryInterval', { minutesToNextQuarterHour, pollInterval }],
      'green',
    );

    refetchTimeoutRef.current = setTimeout(() => {
      refetch().then(() => {
        if (callback && minutesToNextQuarterHour >= minTimeForCallback) {
          /* @ts-ignore TODO: TS2349 ->  This expression is not callable. */
          callback();
        }
        refetchIntervalRef.current = setInterval(() => {
          refetch().then(() => {
            if (callback) {
              /* @ts-ignore TODO: TS2349 ->  This expression is not callable. */
              callback();
            }
          });
        }, pollInterval);
      });
    }, minutesToNextQuarterInterval);

    return () => {
      if (refetchTimeoutRef.current) {
        clearTimeout(refetchTimeoutRef.current);
        refetchTimeoutRef.current = null;
      }
      if (refetchIntervalRef.current) {
        clearInterval(refetchIntervalRef.current);
        refetchIntervalRef.current = null;
      }
    };
  }, [refetch, pollInterval, callback, minTimeForCallback, minutes]);

  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'boolean'. */
  return null;
};

export default (!__TESTING__ && useRefetchQueryInterval) || (() => false);
