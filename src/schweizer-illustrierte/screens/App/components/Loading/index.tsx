import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import LoadingBar from './components/LoadingBar';
import { useSSRContext } from '../../../../../common/components/SSRContext';

const Loading = () => {
  const { isSSR } = useSSRContext();
  const isRefetchingData = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isRefetchingData,
  );
  const screenReady = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).screenReady,
  );
  return !isSSR && (!screenReady || isRefetchingData) ? <LoadingBar /> : null;
};

export default memo(Loading);
