import React, { ReactElement, memo, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'lodash.throttle'. '/Users/bhs/code/work/rasch-stack/node_modules/lodash.t */
import throttle from 'lodash.throttle';
import storageAvailable from '../../../shared/helpers/storage';
import { tealiumTrackEvent } from '../../../shared/helpers/tealium';
import alertListStateSelector from '../../../shared/selectors/alertListStateSelector';
import authStateSelector from '../../../shared/selectors/authStateSelector';
import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import {
  subscribeToAlert,
  unsubscribeToAlert,
} from '../../../shared/actions/alertList';
import SubscribeIconDefault from './components/SubscribeIcon';
import { ALERTLIST_SUBSCRIPTION_ID_KEY } from './constants';
import type {
  SubscribeButtonComponent,
  SubscribeButtonFactoryOptions,
  SubscribeButtonProps,
  SubscribeButtonToastService,
} from './typings';

type SubscribeButtonPropsInner = SubscribeButtonProps & {
  alertListState: AlertListState;
  subscribeToAlert: Function;
  unsubscribeToAlert: Function;
  isAuthenticated: boolean;
  isHybridApp: boolean;
  deviceId: string;
};

type ClickHandlerOptions = {
  setIsActive: Function;
  setIsAnimating: Function;
  isActive: boolean;
  isAnimating: boolean;
  type: string;
  id: number;
  label: string;
  isAuthenticated: boolean;
  isHybridApp: boolean;
  deviceId: string;
  subscribeToAlert: Function;
  unsubscribeToAlert: Function;
  anchorId: string;
  ToastService: SubscribeButtonToastService;
};

export const filterSubscribedAlerts = (
  alerts: AlertListState,
): AlertListState => {
  const subscribedList = Object.keys(alerts).filter((key) => {
    // if there is no subscribed property, then use key as default because it exists
    const objectKeySubscribedExists = Object.prototype.hasOwnProperty.call(
      alerts[key],
      'subscribed',
    );
    if (objectKeySubscribedExists) {
      return alerts[key].subscribed;
    }
    return alerts[key];
  });
  return subscribedList.reduce((acc, key) => {
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
    acc[key] = alerts[key];
    return acc;
  }, {});
};

const isLocalStorageAvailable: boolean = storageAvailable('localStorage');

const clickHandler = ({
  setIsActive,
  setIsAnimating,
  isActive,
  isAnimating,
  type,
  id,
  label,
  isAuthenticated,
  isHybridApp,
  deviceId,
  subscribeToAlert,
  unsubscribeToAlert,
  anchorId,
  ToastService,
}: ClickHandlerOptions) => {
  if ((isHybridApp || isAuthenticated) && type && id) {
    if (isActive) {
      tealiumTrackEvent({
        type: 'link',
        payload: {
          event_name: 'topic_alert',
          event_category: 'email alert',
          event_action: 'unfollow',
          event_label: `${type}:${label || id}`,
        },
      });
      unsubscribeToAlert(type, id, ToastService, setIsActive, deviceId);
    } else {
      tealiumTrackEvent({
        type: 'link',
        payload: {
          event_name: 'topic_alert',
          event_category: 'email alert',
          event_action: 'follow',
          event_label: `${type}:${label || id}`,
        },
      });

      subscribeToAlert(type, id, ToastService, setIsActive, deviceId);
    }

    if (!isAnimating && !isActive) {
      setIsAnimating(true);
    }
  } else {
    if (anchorId) {
      if (global.history.replaceState) {
        global.history.replaceState(
          {},
          '',
          global.location.pathname + global.location.search + `#${anchorId}`,
        );
      } else {
        global.location.hash = anchorId;
      }
    }

    // save the term/keyword ID in localstorage for automatic subscription after login
    if (isLocalStorageAvailable) {
      global.localStorage.setItem(ALERTLIST_SUBSCRIPTION_ID_KEY, String(id));
    }

    ToastService && ToastService.displayAuthenticationInfoToast();

    tealiumTrackEvent({
      type: 'link',
      payload: {
        event_name: 'topic_alert',
        event_category: 'email alert',
        event_action: 'login_required',
        event_label: `${type}:${label || id}`,
      },
    });
  }
};

const SubscribeButtonFactory = ({
  styles,
  Icon,
  followText = 'Folgen',
  followingText = 'Folge ich',
  ToastService: appToastService,
  SubscribeIcon = SubscribeIconDefault,
}: SubscribeButtonFactoryOptions): SubscribeButtonComponent => {
  const SubscribeButton = ({
    theme = 'default',
    id,
    type = 'keyword',
    label = '',
    anchorId = '',
    alertListState,
    subscribeToAlert,
    unsubscribeToAlert,
    isAuthenticated = false,
    isHybridApp,
    deviceId,
    source,
  }: SubscribeButtonPropsInner): ReactElement => {
    const ToastService =
      (typeof appToastService === 'function' && appToastService({ source })) ||
      (typeof appToastService === 'object' && appToastService) ||
      {};

    const [isActive, setIsActive] = useState<boolean>(
      !!(type && id && alertListState[`${type.toLowerCase()}-${id}`]) || false,
    );
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const throttledClickHandlerRef = useRef<any>(null);
    useEffect(() => {
      throttledClickHandlerRef.current = throttle(clickHandler, 500, {
        trailing: false,
      });
    }, []);

    useEffect(() => {
      if (isAnimating) {
        setTimeout(() => {
          setIsAnimating(false);
        }, 500);
      }
    }, [isAnimating]);

    useEffect(() => {
      if (alertListState[`${type.toLowerCase()}-${id}`]) {
        setIsActive(true);
      }
    }, [alertListState, type, id]);

    useEffect(() => {
      // automatic subscription after login
      if (isLocalStorageAvailable && (isHybridApp || isAuthenticated)) {
        const subscriptionId = Number(
          global.localStorage.getItem(ALERTLIST_SUBSCRIPTION_ID_KEY),
        );
        if (subscriptionId === id) {
          global.localStorage.removeItem(ALERTLIST_SUBSCRIPTION_ID_KEY);
          throttledClickHandlerRef.current({
            setIsActive,
            setIsAnimating,
            isActive,
            isAnimating,
            type,
            id,
            label,
            isAuthenticated,
            subscribeToAlert,
            unsubscribeToAlert,
            deviceId,
            anchorId,
            appToastService,
          });
          setIsActive(true);
        }
      }
    }, [
      setIsActive,
      setIsAnimating,
      isActive,
      isAnimating,
      type,
      id,
      label,
      isAuthenticated,
      subscribeToAlert,
      unsubscribeToAlert,
      anchorId,
      isHybridApp,
      deviceId,
    ]);

    return (
      <button
        className={classNames(styles.SubscribeButtonWrapper, {
          [styles.LightTheme]: theme === 'light',
          /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
          [styles.SubscribeButtonActive]:
            isActive && styles.SubscribeButtonActive,
          /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
          [styles.SubscribeButtonInactive]:
            !isActive && styles.SubscribeButtonInactive,
        })}
        onClick={(event) => {
          event.preventDefault();
          throttledClickHandlerRef.current({
            setIsActive,
            setIsAnimating,
            isActive,
            isAnimating,
            type,
            id,
            label,
            isAuthenticated,
            isHybridApp,
            deviceId,
            subscribeToAlert,
            unsubscribeToAlert,
            anchorId,
            ToastService,
          });
        }}
      >
        <SubscribeIcon
          Icon={Icon}
          styles={styles}
          isActive={isActive}
          isAnimating={isAnimating}
          isHybridApp={isHybridApp}
        />
        <span
          className={classNames(styles.Text, {
            [styles.Active]: isActive,
          })}
        >
          {isActive ? followingText : followText}
        </span>
      </button>
    );
  };

  const mapDispatchToProps: Record<string, any> = {
    subscribeToAlert,
    unsubscribeToAlert,
  };

  const mapStateToProps = (state: ReduxState) => ({
    alertListState: filterSubscribedAlerts(alertListStateSelector(state)),
    isAuthenticated: authStateSelector(state).isAuthenticated,
    deviceId: authStateSelector(state)?.deviceId,
    isHybridApp: locationStateSelector(state)?.isHybridApp || false,
  });

  function arePropsEqual(
    prevProps: SubscribeButtonPropsInner,
    nextProps: SubscribeButtonPropsInner,
  ): boolean {
    // update if alertlist got a new subscriber
    if (
      !prevProps.alertListState?.[`${nextProps.type}-${nextProps.id}`] &&
      nextProps.alertListState?.[`${nextProps.type}-${nextProps.id}`]
    ) {
      return false;
    }

    // update if alertlist removed a subscriber
    if (
      prevProps.alertListState?.[`${nextProps.type}-${nextProps.id}`] &&
      !nextProps.alertListState?.[`${nextProps.type}-${nextProps.id}`]
    ) {
      return false;
    }

    // update if the isAuthenticated prop changes
    if (prevProps.isAuthenticated !== nextProps.isAuthenticated) {
      return false;
    }

    // update if the deviceId prop changes
    if (prevProps.deviceId !== nextProps.deviceId) {
      return false;
    }

    // do not update
    return true;
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(memo(SubscribeButton, arePropsEqual));
};

export default SubscribeButtonFactory;
