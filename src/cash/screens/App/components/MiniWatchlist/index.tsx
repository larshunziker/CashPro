import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import raf from 'raf';
import { useStableNavigate } from '../../../../../shared/hooks/useStableNavigateContext';
import { tealiumTrackEvent } from '../../../../../shared/helpers/tealium';
import { truncateByChars } from '../../../../../shared/helpers/utils';
import {
  sort,
  sortTableItems,
} from '../../screens/MyCash/components/Table/helpers';
import { recalculateMainContainerMinHeight } from '../MonsterSky/helpers';
import authStateSelector from '../../../../../shared/selectors/authStateSelector';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import { setInstrumentKeysCustom } from '../../../../shared/actions/autoUpdate';
import useRaschRouterLocation from '../../../../../shared/hooks/useRaschRouterLocation';
import Link from '../../../../../common/components/Link';
import ButtonWithLoading from '../ButtonWithLoading';
import Icon from '../Icon';
import { useSSRContext } from '../../../../../common/components/SSRContext';
import { headerMapping } from '../../screens/MyCash/components/Table/components/headerMapping';
import { watchlistCreate } from '../WatchlistManagementForm';
import {
  watchlistByKeyApolloConfig,
  watchlistScreenApolloConfig,
} from '../../screens/MyCash/components/Watchlist/apolloConfig';
import { ROUTE_WATCHLIST } from '../../constants';
import { STATUS_PAGE_ORIGIN } from '../../screens/StatusPage/components/StatusSubpage/constants';
import { MINI_WATSCHLIST_ID } from './constants';
import styles from './styles.legacy.css';

const MiniWatchlist = ({ origin = '' }) => {
  const isStatusPage = origin === STATUS_PAGE_ORIGIN;
  const miniWatchlistRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useStableNavigate();
  const location = useRaschRouterLocation();
  const { isSSR } = useSSRContext();
  const isAuthenticated = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => authStateSelector(state).isAuthenticated,
  );
  const routerLoading = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).loading,
  );
  const { query: watchlistQuery, ...watchlistOptions } =
    watchlistScreenApolloConfig.options({
      location,
      params: {
        /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string'. */
        isAuthenticated: (isAuthenticated && `${isAuthenticated}`) || null,
      },
    });

  const {
    loading,
    data,
    refetch: refetchAll,
  } = useQuery(watchlistQuery, watchlistOptions);
  const allWatchlists = data?.watchlists?.items || [];
  const defaultWatchlist = allWatchlists?.find(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'watchlist' implicitly has an 'any' type. */
    (watchlist) => watchlist.standard,
  );

  const { query, ...options } = watchlistByKeyApolloConfig.options({
    location,
    params: {
      watchlistKey: defaultWatchlist?.watchlistKey,
    },
  });

  const {
    data: defaultWatchlistData,
    error,
    loading: defaultWatchlistLoading,
    refetch,
  } = useQuery(query, options);
  const miniWatchlistLoading = loading || defaultWatchlistLoading;
  const defaultWatchlistDataCopy = useMemo(() => {
    if (!defaultWatchlistData) return null;
    const copy = JSON.parse(JSON.stringify(defaultWatchlistData));

    const customOrder = JSON.parse(
      copy?.watchlist?.watchlistSettings?.customOrder || null,
    );

    if (customOrder && copy?.watchlist?.instruments?.length > 0) {
      copy.watchlist.instruments = sort(
        copy.watchlist.instruments,
        'instrumentKey',
        'asc',
        customOrder,
      );
    } else if (copy?.watchlist?.instruments?.length > 0) {
      copy.watchlist.instruments = sortTableItems(
        copy.watchlist.instruments,
        'mName',
        'asc',
      );
    }

    return copy;
  }, [defaultWatchlistData]);

  const instruments = useMemo(
    () => defaultWatchlistDataCopy?.watchlist?.instruments || [],
    [defaultWatchlistDataCopy],
  );

  const instrumentKeysJson = useMemo(
    () =>
      JSON.stringify(
        instruments
          .filter((instrument: Instrument) => !!instrument?.instrumentKey)
          .map((instrument: Instrument) => instrument.instrumentKey),
      ),
    [instruments],
  );

  useEffect(() => {
    if (
      instruments.some((instrument: Instrument) => instrument?.instrumentKey)
    ) {
      const instrumentKeys = instruments
        .filter((instrument: Instrument) => !!instrument?.instrumentKey)
        .map((instrument: Instrument) => ({
          listingKey: instrument.instrumentKey,
          isMarketOpen: instrument.isMarketOpen,
        }));
      dispatch(setInstrumentKeysCustom(instrumentKeys));
    }
  }, [instrumentKeysJson, dispatch, instruments]);

  useEffect(() => {
    const mainContainer = document.getElementById('main');
    const height = mainContainer?.getBoundingClientRect?.()?.height;
    if (height && !defaultWatchlistLoading && !routerLoading) {
      const miniWatchlist = document.getElementById(MINI_WATSCHLIST_ID);
      if (miniWatchlist) {
        const miniWatchlistHeight =
          miniWatchlist?.getBoundingClientRect?.()?.height;
        miniWatchlist.style.maxHeight = `calc(100vh - 555px)`;
        if (miniWatchlist) {
          if (height < miniWatchlistHeight) {
            // we need to remove the footer height if the screen is not big enough
            miniWatchlist.style.maxHeight = `calc(100vh - 1005px)`;
          }
        }
      }
    }
  }, [defaultWatchlistLoading, routerLoading]);

  useEffect(() => {
    if (location.href && !routerLoading) {
      recalculateMainContainerMinHeight();
    }
  }, [location.href, routerLoading]);
  if (isSSR || !isAuthenticated || miniWatchlistLoading) {
    return null;
  }

  /* @ts-ignore TODO: TS2774 ->  This condition will always return true since this function is always defined. Did you mean to call it instead? */
  if (refetch && refetchAll) {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.MiniWatchlistRefetch = () => {
      refetchAll().then(() => {
        raf(() => {
          refetch();
        });
      });
    };
  }

  const itemCount =
    (defaultWatchlistDataCopy &&
      !error &&
      defaultWatchlistDataCopy?.watchlist?.instruments?.length) ||
    0;

  return (
    <div ref={miniWatchlistRef} className={styles.Wrapper}>
      <Link
        path={`/${ROUTE_WATCHLIST}`}
        onClick={() => {
          tealiumTrackEvent({
            type: 'link',
            payload: {
              event_name: 'watchlist_open',
              event_category: 'watchlist',
              event_action: 'watchlist_create',
              watchlist_key: defaultWatchlist?.watchlistKey,
              from: 'mini_watchlist',
            },
          });
        }}
        className={styles.Title}
      >
        <Icon type="IconEye" addClass={styles.Icon}></Icon>
        <span>{defaultWatchlist?.name || 'Meine Watchlist'}</span>
      </Link>
      {!!error && !defaultWatchlistDataCopy && (
        <div>
          <p className={styles.WelcomeText}>
            Aufgrund einer technischen Störung zeigen wir im Moment
            unvollständige Daten an. Wir bedauern diese Umstände und bedanken
            uns für Ihr Verständnis.
          </p>
        </div>
      )}
      {!defaultWatchlistDataCopy && !error && (
        <>
          <p className={styles.WelcomeText}>
            Legen Sie jetzt Ihre erste Watchlist an und fügen Instrumente hinzu,
            die Sie im Blick behalten wollen.
          </p>
          <ButtonWithLoading
            variant="primary"
            size="big"
            onClick={(event) => {
              event.preventDefault();
              /* @ts-ignore TODO: TS2322 ->  Type 'NavigateFunction' is not assignable to type 'null | undefined'. */
              watchlistCreate({ navigate, origin: 'mini_watchlist' });
            }}
          >
            <span>Watchlist anlegen</span>
          </ButtonWithLoading>
        </>
      )}

      {defaultWatchlistDataCopy && itemCount === 0 && (
        <>
          <p className={styles.WelcomeText}>
            Beginnen Sie, Instrumente{' '}
            <Link
              path={`/${ROUTE_WATCHLIST}`}
              onClick={() => {
                tealiumTrackEvent({
                  type: 'link',
                  payload: {
                    event_name: 'watchlist_open',
                    event_category: 'portfolio',
                    event_action: 'watchlist_open',
                    portfolio_key: defaultWatchlist?.portfolioKey,
                    from: 'mini_watchlist',
                  },
                });
              }}
              className={styles.Link}
            >
              <span>zu Ihrer Watchlist</span>
            </Link>{' '}
            hinzuzufügen. Sie können diese direkt z.B. aus der SMI Kursliste
            oder über die Detail-Ansichten hinzufügen. Oder verwenden Sie das
            folgende Suchfeld um direkt zu suchen.
          </p>
        </>
      )}

      {defaultWatchlistDataCopy && itemCount > 0 && (
        <div
          id={MINI_WATSCHLIST_ID}
          className={classNames(styles.ItemsWrapper, {
            [styles.StatusPage]: isStatusPage,
          })}
        >
          {defaultWatchlistDataCopy?.watchlist?.instruments &&
            defaultWatchlistDataCopy.watchlist.instruments.map(
              (instrument: Instrument) => {
                const mName = headerMapping['mName'].formatter({
                  instrument,
                  /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
                  value: truncateByChars(instrument.mName, 25, '...'),
                  data: defaultWatchlistDataCopy?.watchlist,
                  origin: 'mini_watchlist',
                });
                const price = headerMapping['lval'].formatter({
                  instrument,
                  value: instrument.lval,
                });
                const iNetVperprVPr = headerMapping['iNetVperprVPr'].formatter({
                  instrument,
                  value: instrument.iNetVperprVPr,
                });

                return (
                  <div
                    className={styles.ListItemWrapper}
                    key={instrument?.instrumentKey}
                  >
                    <div
                      className={classNames(styles.ListItem, styles.Heading)}
                    >
                      <div>{mName}</div>
                      <p>{iNetVperprVPr}</p>
                    </div>
                    <div
                      className={classNames(
                        styles.ListItem,
                        styles.Description,
                      )}
                    >
                      <p>
                        {instrument.mCur} | {instrument.type}
                      </p>
                      <p>{price}</p>
                    </div>
                  </div>
                );
              },
            )}
        </div>
      )}
    </div>
  );
};

export default MiniWatchlist;
