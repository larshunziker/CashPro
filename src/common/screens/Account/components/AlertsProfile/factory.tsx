import React, { useCallback, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import classNames from 'classnames';
import raf from 'raf';
import { getServiceUrl } from '../../../../../shared/helpers/serviceUrl';
import { getTealiumData } from '../../../../../shared/helpers/tealium/helper';
import { log } from '../../../../../shared/helpers/utils';
import authStateSelector from '../../../../../shared/selectors/authStateSelector';
import alertListStateSelector from '../../../../../shared/selectors/alertListStateSelector';
import {
  APP_NAME_ALERT_PUBLICATION_MAPPING,
  setAlertListData,
} from '../../../../../shared/actions/alertList';
import { ensureAlertListInterface } from '../../../../../common/components/AlertList/helper';
import { Auth0 } from '../../../../../common/components/Auth0Provider';
import {
  AlertsProfileComponent,
  AlertsProfileFactoryOptions,
  AlertsProfileProps,
} from './typings';

type AlertsProfilePropsInner = AlertsProfileProps & {
  isAuthenticated: boolean;
  initialAuthRequest: boolean;
  setAlertListData: (res: any) => void;
  alertListState: AlertListState;
};

const AlertsProfileFactory = ({
  Helmet,
  styles,
  grid,
  titleText = 'E-Mail Alerts',
  descriptionText = 'Folgen Sie interessanten Themen. Wir halten Sie per E-Mail auf dem Laufenden, sobald ein neuer Artikel zu Ihrem Thema erscheint.',
  loginText = 'Bitte melden Sie sich an um E-Mail Alerts zu verwalten',
  LoginForm,
  NoItems,
  LoadingSpinner,
  AlertList,
  setLoading,
  setScreenReady,
  hasContainer = true,
}: AlertsProfileFactoryOptions): AlertsProfileComponent => {
  const AlertsProfile = ({
    isAuthenticated,
    initialAuthRequest,
    setAlertListData,
    location,
  }: AlertsProfilePropsInner) => {
    const dispatch = useDispatch();
    const [subscriptions, setSubscriptions] = useState<AlertListState | any>(
      {},
    );
    const [isFetchingData, setIsFetchingData] = useState(true);
    const setLoadingFinished = useCallback(() => {
      if (setLoading && setScreenReady) {
        raf(() => {
          dispatch(setLoading(false));
          dispatch(
            setScreenReady(true, {
              pathname: location?.pathname,
              ...getTealiumData({
                object: {
                  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                  preferredUri: location.pathname,
                  __typename: 'Alerts',
                  pageId: 'alerts',
                },
              }),
            }),
          );
        });
      }
    }, [dispatch, location?.pathname]);

    useEffect(() => {
      if (isAuthenticated) {
        fetch(
          `${getServiceUrl(__ALERTS_SERVICE_ENDPOINT__)}/subscriptions/${
            /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ beobachter */
            APP_NAME_ALERT_PUBLICATION_MAPPING[__APP_NAME__]
          }?loadMetadata=true`,
          {
            /* @ts-ignore TODO: TS2322 ->  Type '{ Authorization */
            credentials: 'include',
            headers: {
              Authorization: `Bearer ${Auth0.getIdToken()}`,
            },
          },
        )
          .then((res) => {
            return res.json();
          })
          .then((res: AlertListState) => {
            // also update redux state
            setAlertListData(res);

            const items = Object.keys(res)
              .filter((key) => key !== 'error')
              .map((key) => {
                const isTerm = key.startsWith('term');
                const isNode = key.startsWith('node');
                const isAuthor = key.startsWith('author');

                const item = {
                  node: {
                    id: key.split('-')[1],
                    label: res[key].label,
                    __typename: null,
                  },
                };

                if (isTerm) {
                  /* @ts-ignore TODO: TS2322 ->  Type '"Keyword"' is not assignable to type 'null'. */
                  item.node.__typename = 'Keyword';
                }

                if (isNode) {
                  /* @ts-ignore TODO: TS2322 ->  Type '"Node"' is not assignable to type 'null'. */
                  item.node.__typename = 'Node';
                }

                if (isAuthor) {
                  /* @ts-ignore TODO: TS2322 ->  Type '"Author"' is not assignable to type 'null'. */
                  item.node.__typename = 'Author';
                }

                return item;
              });

            setSubscriptions(items);
            setTimeout(() => {
              setIsFetchingData(false);
            }, 1000);
          })
          .catch((error) => {
            log('AlertsProfile fetch failed', ['error catched:', error], 'red');
            setIsFetchingData(false);
          });
      } else {
        setTimeout(() => {
          setIsFetchingData(false);
        }, 1000);
      }
    }, [isAuthenticated, setAlertListData, setLoadingFinished]);

    useEffect(() => {
      if (!isFetchingData) {
        setLoadingFinished();
      }
    }, [setLoadingFinished, isFetchingData]);
    let jsx = null;

    if (!isAuthenticated) {
      jsx = (
        <>
          {(!initialAuthRequest && (
            <div className={(hasContainer && grid.Container) || null}>
              <LoadingSpinner />
            </div>
          )) || (
            <div
              className={classNames(
                styles.LoginWrapper,
                (hasContainer && grid.Container) || null,
              )}
            >
              <LoginForm message={loginText} isDefaultLoginCase />
            </div>
          )}
        </>
      );
    } else if (isFetchingData) {
      jsx = (
        <div className={hasContainer && grid.Container}>
          <LoadingSpinner />
        </div>
      );
    } else if (
      subscriptions &&
      Array.isArray(subscriptions) &&
      subscriptions.length > 0
    ) {
      jsx = (
        <>
          <div className={(hasContainer && grid.Container) || null}>
            <div className={grid.Row}>
              <div className={styles.ItemsWrapper}>
                <div className={styles.Description}>{descriptionText}</div>
              </div>
            </div>
          </div>
          <div className={styles.AlertListWrapper}>
            <AlertList items={ensureAlertListInterface(subscriptions)} />
          </div>
        </>
      );
    } else {
      jsx = (
        <div className={(hasContainer && grid.Container) || null}>
          <NoItems />
        </div>
      );
    }

    return (
      <>
        <Helmet title={titleText} />
        <div className={styles.AlertsProfileWrapper}>
          <div className={(hasContainer && grid.Container) || null}>
            <h2 className={styles.Title}>{titleText}</h2>
          </div>
          {jsx}
        </div>
      </>
    );
  };

  const mapDispatchToProps = {
    setAlertListData,
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
  const mapStateToProps = (state) => ({
    isAuthenticated: authStateSelector(state).isAuthenticated,
    initialAuthRequest: authStateSelector(state).initialAuthRequest,
    alertListState: alertListStateSelector(state),
  });

  return connect(mapStateToProps, mapDispatchToProps)(AlertsProfile);
};

export default AlertsProfileFactory;
