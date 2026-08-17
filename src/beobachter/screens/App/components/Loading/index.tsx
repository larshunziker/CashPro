import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useSSRContext } from '../../../../../common/components/SSRContext';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import LoadingBar from './components/LoadingBar';

const Loading = () => {
  const screenReady = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).screenReady,
  );
  const { isSSR } = useSSRContext();

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
  const loading = useSelector((state) => locationStateSelector(state).loading);
  return !isSSR && (!screenReady || loading) ? (
    <TestFragment data-testid="loading-indicator-wrapper">
      <LoadingBar />
    </TestFragment>
  ) : null;
};

export default memo(Loading);
