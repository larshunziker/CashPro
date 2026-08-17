import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import LoadingBar from './components/LoadingBar';
import { useSSRContext } from '../../../../../common/components/SSRContext';

const Loading = () => {
  const routeScreenReady = useSelector(
    (state: ReduxState) => state.route?.screenReady,
  );

  const isRefetchingData = useSelector(
    (state: ReduxState) => state.route?.isRefetchingData,
  );

  const { isSSR } = useSSRContext();

  return !isSSR && (!routeScreenReady || isRefetchingData) ? (
    <LoadingBar />
  ) : null;
};

export default memo(Loading);
