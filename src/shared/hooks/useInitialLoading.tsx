import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import locationStateSelector from '../selectors/locationStateSelector';

/**
 * Only changes loading once. Stays true after pages was loaded once.
 * Otherwise pages rerender after navigating away.
 */

export const useInitialLoading = () => {
  const [initialLoading, setInitialLoading] = useState(undefined);
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
  const loading = useSelector((state) => locationStateSelector(state).loading);

  useEffect(() => {
    if (initialLoading === undefined) {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'boolean | undefined' is not assignable to parameter of type 'SetStateAction<undefined>'. */
      setInitialLoading(loading);
      return;
    }
    if (initialLoading === true) {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'boolean | undefined' is not assignable to parameter of type 'SetStateAction<undefined>'. */
      setInitialLoading(loading);
    }
  }, [loading, initialLoading]);

  return initialLoading;
};
