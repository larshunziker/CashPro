/* istanbul ignore file */

import { useEffect } from 'react';
import { connect } from 'react-redux';
import authStateSelector from '../../../shared/selectors/authStateSelector';
import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import { fetchAlertList } from '../../../shared/actions/alertList';
import { fetchBookmarkList } from '../../../shared/actions/bookmarkList';
import {
  BackgroundFetchProviderComponent,
  BackgroundFetchProviderProps,
} from './typings';

type BackgroundFetchProviderPropsInner = BackgroundFetchProviderProps & {
  isAuthenticated: boolean;
  isHybridApp: boolean;
  deviceId: string;
  fetchAlertList: (deviceId?: string) => void;
  fetchBookmarkList: () => void;
};

const BackgroundFetchProvider: BackgroundFetchProviderComponent = ({
  isAuthenticated,
  isHybridApp,
  deviceId,
  fetchAlertList,
  fetchBookmarkList,
}: BackgroundFetchProviderPropsInner): null => {
  useEffect(() => {
    if (isAuthenticated) {
      fetchBookmarkList();
    }

    const hasDeviceId = deviceId ? deviceId?.length !== 0 : false;
    if ((isHybridApp && hasDeviceId) || (!isHybridApp && isAuthenticated)) {
      fetchAlertList(deviceId);
    }
  }, [
    isAuthenticated,
    fetchAlertList,
    fetchBookmarkList,
    isHybridApp,
    deviceId,
  ]);
  return null;
};

const mapStateToProps = (state: ReduxState) => ({
  isAuthenticated: authStateSelector(state).isAuthenticated,
  deviceId: authStateSelector(state)?.deviceId || '',
  isHybridApp: locationStateSelector(state)?.isHybridApp || false,
});

const mapDispatchToProps = {
  fetchAlertList,
  fetchBookmarkList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BackgroundFetchProvider);
