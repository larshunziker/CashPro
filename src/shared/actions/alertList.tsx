import { getServiceUrl } from '../helpers/serviceUrl';
import { log } from '../helpers/utils';
import {
  PUBLICATION_BEOBACHTER,
  PUBLICATION_BIL,
  PUBLICATION_CASH,
  PUBLICATION_GROUP_BEO,
  PUBLICATION_GROUP_BIL,
  PUBLICATION_GROUP_CASH,
  PUBLICATION_GROUP_GM,
  PUBLICATION_GROUP_HZ,
  PUBLICATION_GROUP_SI,
  PUBLICATION_HZ,
} from '../constants/publications';
import { Auth0 } from '../../common/components/Auth0Provider';
import { SubscribeButtonToastService } from '../../common/components/SubscribeButton/typings';

export const SET_ALERT_LIST_DATA = 'alertList/set-alertList-data';
export const ADD_ALERT_LIST_ITEM = 'alertList/add-alertList-item';
export const REMOVE_ALERT_LIST_ITEM = 'alertList/remove-alertList-item';

type AlertListStateActionTypes =
  | 'alertList/set-alertList-data'
  | 'alertList/add-alertList-item'
  | 'alertList/remove-alertList-item';

export type AlertListStateAction = {
  type: AlertListStateActionTypes;
  payload: AlertListState | string | [];
};

// TODO: move this mapping to a more global file
export const APP_NAME_ALERT_PUBLICATION_MAPPING = {
  [PUBLICATION_BEOBACHTER]: PUBLICATION_GROUP_BEO,
  [PUBLICATION_HZ]: PUBLICATION_GROUP_HZ,
  [PUBLICATION_BIL]: PUBLICATION_GROUP_BIL,
  ['gaultmillau']: PUBLICATION_GROUP_GM,
  ['schweizer-illustrierte']: PUBLICATION_GROUP_SI,
  [PUBLICATION_CASH]: PUBLICATION_GROUP_CASH,
};

export const setAlertListData = (
  data: AlertListState,
): AlertListStateAction => ({
  type: SET_ALERT_LIST_DATA,
  payload: data,
});

export const addAlertListData = (
  alertListItem: string,
): AlertListStateAction => ({
  type: ADD_ALERT_LIST_ITEM,
  payload: alertListItem,
});

export const removeAlertListData = (
  alertListItem: string,
): AlertListStateAction => ({
  type: REMOVE_ALERT_LIST_ITEM,
  payload: alertListItem,
});

const getHeaders = (deviceId: string) => {
  const token = Auth0.getIdToken();
  return {
    ...(deviceId?.length ? { 'x-device-id': deviceId } : {}),
    // Only attach the Authorization header when an identity token is present.
    // The hybrid app authenticates via `x-device-id` and may have no token,
    // so we avoid sending an empty `Bearer` value.
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const fetchAlertList = (deviceId: string) => (dispatch: Function) => {
  fetch(
    `${getServiceUrl(__ALERTS_SERVICE_ENDPOINT__)}/subscriptions/${
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ beobachter */
      APP_NAME_ALERT_PUBLICATION_MAPPING[__APP_NAME__]
    }`,
    {
      /* @ts-ignore TODO: TS2322 ->  Type '{ 'x-device-id' */
      headers: getHeaders(deviceId),
    },
  )
    .then((res) => {
      if (res?.status === 200 || res?.status === 201) {
        return res.json();
      }
      return [];
    })
    .then((res: AlertListState) => {
      dispatch(setAlertListData(res));
    })
    .catch((error) => {
      log('alertList fetch action', ['error catched:', error], 'red');
    });
};

export const subscribeToAlert =
  (
    type: string,
    id: number,
    ToastService: SubscribeButtonToastService,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'setIsActive' implicitly has an 'any' type. */
    setIsActive,
    deviceId: string,
  ) =>
  (dispatch: Function) => {
    fetch(
      `${getServiceUrl(__ALERTS_SERVICE_ENDPOINT__)}/subscriptions/${
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ beobachter */
        APP_NAME_ALERT_PUBLICATION_MAPPING[__APP_NAME__]
      }/${type}/${id}`,
      {
        method: 'POST',
        /* @ts-ignore TODO: TS2322 ->  Type '{ 'x-device-id' */
        headers: getHeaders(deviceId),
      },
    )
      .then(({ status }) => {
        switch (status) {
          case 200:
          case 201:
            dispatch(addAlertListData(`${type}-${id}`));
            setIsActive(true);
            break;
          case 403:
            ToastService.displayAuthenticationErrorToast();
            break;
          case 420:
            deviceId?.length
              ? /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
                ToastService.displayPushLimitExceededToast()
              : ToastService.displayLimitExceededToast();
            break;
          default:
            ToastService.displayDefaultErrorToast();
        }
      })
      .catch((error) => {
        ToastService.displayDefaultErrorToast();
        log('alertList subscribe action', ['error catched:', error], 'red');
      });
  };

export const unsubscribeToAlert =
  (
    type: string,
    id: number,
    ToastService: SubscribeButtonToastService,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'setIsActive' implicitly has an 'any' type. */
    setIsActive,
    deviceId: string,
  ) =>
  (dispatch: Function) => {
    fetch(
      `${getServiceUrl(__ALERTS_SERVICE_ENDPOINT__)}/subscriptions/${
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ beobachter */
        APP_NAME_ALERT_PUBLICATION_MAPPING[__APP_NAME__]
      }/${type}/${id}`,
      {
        method: 'DELETE',
        /* @ts-ignore TODO: TS2322 ->  Type '{ 'x-device-id' */
        headers: getHeaders(deviceId),
      },
    )
      .then(({ status }) => {
        switch (status) {
          case 200:
            dispatch(removeAlertListData(`${type}-${id}`));
            setIsActive(false);
            break;
          case 403:
            ToastService.displayAuthenticationErrorToast();
            break;
          case 420:
            deviceId.length
              ? /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
                ToastService.displayPushLimitExceededToast()
              : ToastService.displayLimitExceededToast();
            break;
          default:
            ToastService.displayDefaultErrorToast();
        }
      })
      .catch((error) => {
        ToastService.displayDefaultErrorToast();
        log('alertList unsubscribe action', ['error catched:', error], 'red');
      });
  };
