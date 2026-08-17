import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import { tealiumTrackEvent } from '../../../../../shared/helpers/tealium';
import { log } from '../../../../../shared/helpers/utils';
import authStateSelector from '../../../../../shared/selectors/authStateSelector';
import autoUpdateStateSelector from '../../../../../shared/selectors/autoUpdateStateSelector';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import { AutoUpdateState } from '../../../../shared/reducers/autoUpdate';
import {
  setInstrumentData,
  setInstrumentKeysAnonymous,
  toggleAutoUpdate,
} from '../../../../shared/actions/autoUpdate';
import { useStableNavigate } from '../../../../../shared/hooks/useStableNavigateContext';
import useRefetchQueryInterval from '../../../../shared/hooks/useRefetchQueryInterval';
import Icon from '../Icon';
import modal from '../Modal';
import { ROUTE_BOERSEN_ABOS, SUBSCRIPTION_TYPE_BASIC } from '../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS } from './queries';
import styles from './styles.legacy.css';

export const ensureAutoUpdateData = (data: QuoteListEdge[]) => {
  if (!Array.isArray(data)) {
    return {};
  }

  const result: Record<string, Instrument> = {};
  for (const edge of data) {
    const node = (edge as { node: Instrument }).node;
    if (node?.instrumentKey) {
      result[node.instrumentKey] = { ...node };
    }
  }

  return result;
};

export const getFilteredInstrumentKeys = (
  instrumentData: AutoUpdateState['instrumentKeysAnonymous'],
  isMarketOpen = true,
) => {
  const list = Object.values(instrumentData)
    .filter(
      (item) =>
        item.isMarketOpen === isMarketOpen && item.constituents !== true,
    )
    .map((item) => item.listingKey);
  // remove duplicates, then sort so the resulting query variables are stable
  // regardless of insertion order. Without this, reordering of the redux key
  // arrays changes the joined `listingKeys` variable and makes Apollo cancel
  // and refire the polling queries (request flood).
  return list.filter((item, index) => list.indexOf(item) === index).sort();
};

const AutoUpdateProvider = () => {
  const manuallyDisabledAutoupdate = useRef(false);
  const isShowNotification = useRef(true);
  const dispatch = useDispatch();
  const navigate = useStableNavigate();
  const instrumentDataAnonymous = useSelector(
    (state: ReduxState) =>
      autoUpdateStateSelector(state).instrumentKeysAnonymous,
  );
  const isAutoUpdateEnabled = useSelector(
    (state: ReduxState) => autoUpdateStateSelector(state).isAutoUpdateEnabled,
  );
  const instrumentDataCustom = useSelector(
    (state: ReduxState) => autoUpdateStateSelector(state).instrumentKeysCustom,
  );
  const subscriptions = useSelector(
    (state: ReduxState) => authStateSelector(state).subscriptions,
  );
  const isRealTimeUser = useSelector(
    (state: ReduxState) => authStateSelector(state).realtime,
  );
  const routerLoading = useSelector(
    (state: ReduxState) => locationStateSelector(state).loading,
  );
  const inactiveTimeoutIdRef = useRef(null);

  const instrumentKeysAnonymous = useMemo(
    () => getFilteredInstrumentKeys(instrumentDataAnonymous),
    [instrumentDataAnonymous],
  );
  const instrumentKeysCustom = useMemo(
    () => getFilteredInstrumentKeys(instrumentDataCustom),
    [instrumentDataCustom],
  );

  const instrumentKeysCustomWithoutDuplicates = useMemo(
    () =>
      instrumentKeysCustom.filter(
        (item) => !instrumentKeysAnonymous.includes(item),
      ),
    [instrumentKeysCustom, instrumentKeysAnonymous],
  );

  const { loading, data } = useQuery<{
    quoteList: QuoteList;
  }>(GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS, {
    variables: {
      listingKeys:
        Array.isArray(instrumentKeysCustomWithoutDuplicates) &&
        instrumentKeysCustomWithoutDuplicates?.length > 0
          ? instrumentKeysCustomWithoutDuplicates.join(',')
          : '',
    },
    fetchPolicy: 'no-cache',
    pollInterval: isRealTimeUser ? 10_000 : 30_000,
    ssr: false,
    skip:
      !instrumentKeysCustomWithoutDuplicates?.length || !isAutoUpdateEnabled,
  });
  const instrumentKeysAnonymousConstituents = useMemo(() => {
    if (!instrumentKeysAnonymous?.length) {
      return null;
    }
    return Object.values(instrumentDataAnonymous)
      .map((item: any) => {
        if (item?.constituents && item?.listingKey) {
          return item?.listingKey;
        }
        return null;
      })
      .filter((item: any) => item !== null);
  }, [instrumentKeysAnonymous, instrumentDataAnonymous]);

  const { loading: sharedLoading, data: sharedData } = useQuery<{
    quoteList: QuoteList;
  }>(GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS, {
    variables: {
      listingKeys:
        Array.isArray(instrumentKeysAnonymous) &&
        instrumentKeysAnonymous?.length > 0
          ? instrumentKeysAnonymous.join(',')
          : '',
    },
    fetchPolicy: 'no-cache',
    pollInterval: isRealTimeUser ? 10_000 : 30_000,
    ssr: false,
    skip: !instrumentKeysAnonymous?.length || !isAutoUpdateEnabled,
  });

  const { loading: constituentsLoading, data: constituentsData } = useQuery<{
    quoteList: QuoteList;
  }>(GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS, {
    variables: {
      listingKeys:
        Array.isArray(instrumentKeysAnonymousConstituents) &&
        instrumentKeysAnonymousConstituents?.length > 0
          ? instrumentKeysAnonymousConstituents.join(',')
          : '',
      constituents: true,
    },
    fetchPolicy: 'no-cache',
    pollInterval: isRealTimeUser ? 10_000 : 30_000,
    ssr: false,
    skip: !instrumentKeysAnonymousConstituents?.length || !isAutoUpdateEnabled,
  });

  const constituentsEdges = constituentsData?.quoteList?.quoteList?.edges;
  const instrumentKeysConstituentsData = useMemo(
    () =>
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      constituentsEdges
        ?.filter((node: any) => node?.isMarketOpen === false)
        .map((node: any) => node?.instrumentKey) || [],
    [constituentsEdges],
  );

  const instrumentKeysClosedMarket = useMemo(() => {
    const closedInstruments = {
      ...instrumentDataAnonymous,
      ...instrumentDataCustom,
      ...instrumentKeysConstituentsData,
    };
    return getFilteredInstrumentKeys(closedInstruments, false);
  }, [
    instrumentDataAnonymous,
    instrumentDataCustom,
    instrumentKeysConstituentsData,
  ]);

  const {
    loading: closedMarketLoading,
    data: closedMarketData,
    refetch: refetchClosedMarketsQuery,
  } = useQuery<{
    quoteList: QuoteList;
  }>(GET_AUTO_UPDATE_DATA_BY_INSTRUMENT_KEYS, {
    variables: {
      listingKeys:
        Array.isArray(instrumentKeysClosedMarket) &&
        instrumentKeysClosedMarket?.length > 0
          ? instrumentKeysClosedMarket.join(',')
          : '',
    },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    ssr: false,
    skip: !instrumentKeysClosedMarket?.length || !isAutoUpdateEnabled,
  });

  let refetchClosedMarkets = null;
  // we only want to refetch closed markets if auto update is enabled
  // and we wanna show the toast callback all the time if auto update is enabled even if the market is open
  if (isAutoUpdateEnabled) {
    refetchClosedMarkets = refetchClosedMarketsQuery;
  }

  if (
    subscriptions &&
    subscriptions?.some(
      (subscription) => subscription !== SUBSCRIPTION_TYPE_BASIC,
    )
  ) {
    isShowNotification.current = false;
  }

  useEffect(() => {
    if (global.self !== global.top) {
      isShowNotification.current = false;
    }
  }, []);

  const refetchCallback = useCallback(() => {
    const modalEl = document.querySelector('.' + styles.ModalWrapper);
    if (isShowNotification.current && !modalEl) {
      setTimeout(() => dispatch(toggleAutoUpdate(false)), 0);
      modal({
        type: 'drawer',
        hasStickyHeader: false,
        hasStickyFooter: false,
        hideDefaultButtons: false,
        isCloseVisible: false,
        closeOnClickOutside: false,
        closeOnLocationChange: true,
        /* @ts-ignore TODO: TS7031 ->  Binding element 'close' implicitly has an 'any' type. */
        customUi: ({ close }) => {
          return (
            <div className={styles.ModalWrapper}>
              <div
                role={'button'}
                tabIndex={0}
                onKeyDown={close}
                onClick={close}
                className={classNames(styles.CloseIconWrapper, {
                  [styles.DrawerBottom]: global.innerWidth < 760,
                })}
              >
                <Icon type={'IconXMark'} />
              </div>
              <div className={styles.Title}>Kurs-Daten in Echtzeit</div>
              <div className={styles.Description}>
                Verfolgen Sie Kurs-Daten live und bleiben Sie stets informiert.
                Wünschen Sie eine 15-minütige Verlängerung der
                Echtzeit-Aktualisierung? Als Abonnent erhalten Sie durchgehend
                Live-Updates.
              </div>
            </div>
          );
        },
        buttons: [
          {
            variant: 'secondary',
            children: '15 min verlängern',
            onClick: () => {
              tealiumTrackEvent({
                type: 'link',
                payload: {
                  event_name: `auto_update_click`,
                  event_category: 'auto_update',
                  event_action: `stay_active`,
                },
              });
              log('AutoUpdateProvider', `auto update enabled`, 'green');
              dispatch(toggleAutoUpdate(true));
            },
          },
          {
            variant: 'primary',
            children: 'Zu den Abos',
            onClick: () => {
              tealiumTrackEvent({
                type: 'link',
                payload: {
                  event_name: `auto_update_click`,
                  event_category: 'auto_update',
                  event_action: `stay_active`,
                },
              });
              navigate('/' + ROUTE_BOERSEN_ABOS);
            },
          },
        ],
      });
    }
  }, [dispatch, navigate]);

  useRefetchQueryInterval({
    refetch: refetchClosedMarkets,
    /* @ts-ignore TODO: TS2322 ->  Type '() => void' is not assignable to type 'null | undefined'. */
    callback: refetchCallback,
  });

  const closedMarketEdges = closedMarketData?.quoteList?.quoteList?.edges;
  const closedMarketIsOpenKeys = useMemo(
    () =>
      closedMarketEdges && closedMarketEdges.length > 0
        ? closedMarketEdges.filter(({ node }: any) => node.isMarketOpen)
        : null,
    [closedMarketEdges],
  );

  useEffect(() => {
    if (
      routerLoading &&
      !isAutoUpdateEnabled &&
      manuallyDisabledAutoupdate.current
    ) {
      log(
        'AutoUpdateProvider',
        `auto update re-enabled on route change`,
        'green',
      );
      dispatch(toggleAutoUpdate(true));
    }
  }, [routerLoading, dispatch, isAutoUpdateEnabled]);
  // set auto update data in redux store
  useEffect(() => {
    if (!loading && !sharedLoading && !constituentsLoading) {
      const quoteList = [] as QuoteListEdge[];

      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      if (data?.quoteList && data?.quoteList?.quoteList?.count > 0) {
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        /* @ts-ignore TODO: TS2488 ->  Type 'Maybe<QuoteListEdge[]> | undefined' must have a '[Symbol.iterator]()' method that returns an iterator. */
        quoteList.push(...data.quoteList.quoteList.edges);
      }

      if (
        sharedData?.quoteList &&
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        sharedData?.quoteList?.quoteList?.count > 0
      ) {
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        quoteList.push(...sharedData.quoteList.quoteList.edges);
      }

      if (
        constituentsData?.quoteList &&
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        constituentsData?.quoteList?.quoteList?.count > 0
      ) {
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        quoteList.push(...constituentsData.quoteList.quoteList.edges);
      }

      if (closedMarketIsOpenKeys && closedMarketIsOpenKeys?.length > 0) {
        quoteList.push(...closedMarketIsOpenKeys);
      }

      dispatch(setInstrumentData(ensureAutoUpdateData(quoteList)));
    }
  }, [
    data?.quoteList,
    sharedData?.quoteList,
    constituentsData?.quoteList,
    loading,
    sharedLoading,
    constituentsLoading,
    closedMarketIsOpenKeys,
    dispatch,
  ]);

  useEffect(() => {
    if (
      !closedMarketLoading &&
      closedMarketIsOpenKeys &&
      closedMarketIsOpenKeys?.length > 0
    ) {
      dispatch(
        setInstrumentKeysAnonymous(
          closedMarketIsOpenKeys &&
            closedMarketIsOpenKeys.map(({ node }: Record<string, any>) => ({
              listingKey: node?.instrumentKey,
              isMarketOpen: node?.isMarketOpen,
            })),
        ),
      );
    }
  }, [closedMarketLoading, closedMarketIsOpenKeys, dispatch]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      log(
        'AutoUpdateProvider',
        `tab active/visible state: ${!document.hidden}`,
        'white',
      );

      if (document.hidden) {
        log(
          'AutoUpdateProvider',
          `auto update will be disabled in 10 seconds`,
          'orange',
        );
        /* @ts-ignore TODO: TS2322 ->  Type 'Timeout' is not assignable to type 'null'. */
        inactiveTimeoutIdRef.current = setTimeout(() => {
          dispatch(toggleAutoUpdate(false));
          log('AutoUpdateProvider', `auto update disabled`, 'red');
        }, 10_000);
      } else {
        /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
        clearTimeout(inactiveTimeoutIdRef.current);
        dispatch(toggleAutoUpdate(true));
        log('AutoUpdateProvider', `auto update enabled`, 'green');
      }
    };

    if (!manuallyDisabledAutoupdate.current) {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
      clearTimeout(inactiveTimeoutIdRef.current);
    };
  }, [isAutoUpdateEnabled, dispatch]);

  return null;
};

export default AutoUpdateProvider;
