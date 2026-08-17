import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import locationStateSelector from '../selectors/locationStateSelector';

const useIsSSR = (): boolean => {
  const isInitialPage = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isInitialPage,
  );
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'boolean | undefined' is not assignable to parameter of type 'boolean | (() => boolean)'. */
  const [isSSR, setIsSSR] = useState<boolean>(isInitialPage);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return isSSR;
};

export default (!__TESTING__ && useIsSSR) || (() => false);
