import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import raf from 'raf';
import { getServiceUrl } from '../../../shared/helpers/serviceUrl';
import { getTealiumData } from '../../../shared/helpers/tealium/helper';
import { log } from '../../../shared/helpers/utils';
import authStateSelector from '../../../shared/selectors/authStateSelector';
import { APP_NAME_ALERT_PUBLICATION_MAPPING } from '../../../shared/actions/alertList';
import {
  FETCH_STATE_FAILED,
  FETCH_STATE_LOADING,
  FETCH_STATE_SUCCESS,
} from './constants';
import {
  AlertsUnsubscribeComponent,
  AlertsUnsubscribeFactoryOptions,
  AlertsUnsubscribeProps,
} from './typings';

type AlertsUnsubscribeFactoryPropsInner = AlertsUnsubscribeProps & {
  oneSignalExternalId: string;
  isAuthenticated: boolean;
};

const AlertsUnsubscribeFactory = ({
  styles,
  pleaseWaitText = 'Bitte warten...',
  successText = 'Sie haben sich von allen E-Mail-Alerts abgemeldet.',
  LoadingSpinner,
  LoginForm,
  loginText = 'Bitte melden Sie sich an, um E-Mail Alerts zu verwalten',
  actionFailedText = `Leider konnte die gewünschte Aktion nicht ausgeführt werden. Bitte
  versuchen Sie es später erneut.`,
  checkmarkIcon,
  button,
  setLoading,
  setScreenReady,
}: AlertsUnsubscribeFactoryOptions): AlertsUnsubscribeComponent => {
  const AlertsUnsubscribe: AlertsUnsubscribeComponent = ({
    isAuthenticated,
    oneSignalExternalId,
  }: AlertsUnsubscribeFactoryPropsInner) => {
    const dispatch = useDispatch();
    const [fetchState, setFetchState] = useState<string>(FETCH_STATE_LOADING);

    useEffect(() => {
      const setLoadingFinished = () => {
        if (setLoading && setScreenReady) {
          raf(() => {
            dispatch(setLoading(false));
            dispatch(
              setScreenReady(true, {
                pathname: location.pathname,
                ...getTealiumData({
                  object: {
                    preferredUri: location.pathname,
                    __typename: 'AlertsUnsubscribe',
                    pageId: 'alerts_unsubscribe_onesignal',
                  },
                }),
              }),
            );
          });
        }
      };
      if (isAuthenticated) {
        if (oneSignalExternalId) {
          fetch(
            `${getServiceUrl(
              __ALERTS_SERVICE_ENDPOINT__,
            )}/unsubscribeFromPublication/${
              /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ beobachter */
              APP_NAME_ALERT_PUBLICATION_MAPPING[__APP_NAME__]
            }/${oneSignalExternalId}`,
            {
              method: 'POST',
              credentials: 'include',
            },
          )
            .then((res) => {
              if (res.status === 500) {
                setFetchState(FETCH_STATE_FAILED);
              } else {
                setTimeout(
                  () => setFetchState(FETCH_STATE_SUCCESS),
                  Math.floor(Math.random() * 1000) + 2000,
                );
              }
            })
            .catch((error) => {
              setFetchState(FETCH_STATE_FAILED);
              log(
                'fetch error unsubscribe from all mail alerts',
                ['error catched:', error],
                'red',
              );
            });
        } else {
          setFetchState(FETCH_STATE_FAILED);
        }
      }
      fetchState !== FETCH_STATE_LOADING && setLoadingFinished();
    }, [isAuthenticated, oneSignalExternalId, dispatch, fetchState]);

    if (!isAuthenticated) {
      return (
        <div className={styles.LoginWrapper}>
          <LoginForm
            message={loginText}
            isDefaultLoginCase
            isCommentForm={false}
          />
        </div>
      );
    }

    const jsx =
      fetchState === FETCH_STATE_LOADING ? (
        <>
          <LoadingSpinner />
          <div className={styles.Text}>{pleaseWaitText}</div>
        </>
      ) : fetchState === FETCH_STATE_SUCCESS ? (
        <>
          <div className={styles.Icon}>{checkmarkIcon}</div>
          <div className={styles.Text}>{successText}</div>
          {button && <div className={styles.Wrapper}>{button}</div>}
        </>
      ) : (
        <>
          <div className={styles.Text}>{actionFailedText}</div>
          {button && <div className={styles.Wrapper}>{button}</div>}
        </>
      );

    return <div className={styles.AlertsUnsubscribeWrapper}>{jsx}</div>;
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
  const mapStateToProps = (state) => ({
    isAuthenticated: authStateSelector(state).isAuthenticated,
  });

  return connect(mapStateToProps)(AlertsUnsubscribe);
};

export default AlertsUnsubscribeFactory;
