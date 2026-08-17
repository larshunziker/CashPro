import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'lodash.merge'. '/Users/bhs/code/work/rasch-stack/node_modules/lodash.merg */
import merge from 'lodash.merge';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import { enableAutoFocus } from '../../../../components/AutoSuggestSearch/helpers';
import { GetAlerts, hasAlertsColumn } from '../Alerts/helpers';
import { sort, sortTableItems } from '../Table/helpers';
import { tableByViewtype } from './helpers';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import { setInstrumentKeysCustom } from '../../../../../../shared/actions/autoUpdate';
import Link from '../../../../../../../common/components/Link';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import ButtonWithLoading from '../../../../components/ButtonWithLoading';
import Dropdown from '../../../../components/Dropdown';
import DropdownItem from '../../../../components/Dropdown/components/DropdownItem';
import Helmet from '../../../../components/Helmet';
import Icon from '../../../../components/Icon';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import ActionButtons from '../ActionButtons';
import CategoryButtons from '../CategoryButtons';
import EmptyScreen from '../EmptyScreen';
import Table from '../Table';
import AddInstrumentToWatchlist from './components/AddInstrumentToWatchlist';
import { watchlistCreate } from '../../../../components/WatchlistManagementForm';
import {
  watchlistAlertsByKeyApolloConfig,
  watchlistByKeyApolloConfig,
  watchlistScreenApolloConfig,
} from './apolloConfig';
import { useStableNavigate } from '../../../../../../../shared/hooks/useStableNavigateContext';
import { ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE } from '../../../../../../../shared/constants/structuredData';
import { ROUTE_WATCHLIST } from '../../../../constants';
import {
  DEFAULT_TABLE,
  OTHER_ASSETS_TITLE,
  PAPER_VALUES_GROUPING_MAPPING,
} from '../Table/constants';
import { TABLE_HEADERS } from './constants';
import styles from './styles.legacy.css';
import { WatchlistProps } from './typings';

const breadcrumbItems: Omit<ActiveMenuTrailItemConnection, 'pageInfo'> = {
  count: 2,
  totalCount: 2,
  edges: [
    {
      node: {
        id: '',
        label: 'Watchlist',
        link: null,
        __typename: 'ActiveMenuTrailItem',
      },
      __typename: 'ActiveMenuTrailItemEdge',
    },
  ],
  __typename: 'ActiveMenuTrailItemConnection',
};

const Watchlist = ({ location }: WatchlistProps) => {
  const { watchlistKey } = useParams();
  /* @ts-ignore TODO: TS2339 ->  Property 'query' does not exist on type 'Partial<RaschRouterLocation> | undefined'. */
  const { query: locationQuery } = location;
  const hasInstruments = useRef(true);
  const currentWatchlistName = useRef(null);
  const dispatch = useDispatch();
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );

  const isDirtyRef = useRef(null);
  const isDirtySortTableRef = useRef(null);
  const customOrderRef = useRef(null);

  const { query: watchlistQuery, ...watchlistOptions } =
    watchlistScreenApolloConfig.options({
      location,
      params: {
        isAuthenticated: 'true', // we use this inside Protected routes, so we can assume that the user is authenticated
      },
    });

  const {
    loading,
    data,
    error: allWatchlistRefetchError,
    refetch: allWatchlistRefetch,
  } = useQuery(watchlistQuery, watchlistOptions);

  if (allWatchlistRefetch) {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.refetchAllWatchlistsGQL = async () => {
      await allWatchlistRefetch(options);
    };
  }

  const allWatchlists = data?.watchlists?.items || [];
  const hasWatchlist = allWatchlists?.length > 0;

  const defaultWatchlist = allWatchlists?.find(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'watchlist' implicitly has an 'any' type. */
    (watchlist) => watchlist.standard,
  );

  const currentWatchlistKey = watchlistKey || defaultWatchlist?.watchlistKey;
  const currentCustomView = data?.watchlists?.items?.find(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
    (item) => item.watchlistKey === currentWatchlistKey,
  )?.watchlistSettings?.customView;

  const { query, ...options } = watchlistByKeyApolloConfig.options({
    location,
    params: {
      watchlistKey: currentWatchlistKey,
    },
  });

  const {
    data: apolloData,
    error,
    loading: defaultWatchlistLoading,
    refetch,
  } = useQuery(query, options);

  const queryCopy = JSON.parse(JSON.stringify(locationQuery));

  const watchlistSettings =
    (!defaultWatchlistLoading && apolloData?.watchlist?.watchlistSettings) ||
    null;

  const tableView =
    queryCopy?.type ||
    (!isDirtyRef.current && watchlistSettings?.view) ||
    DEFAULT_TABLE;

  const hasAlerts = hasAlertsColumn(tableView, currentCustomView);

  const { data: apolloAlertsData, loading: alertsLoading } = GetAlerts({
    hasAlerts,
    currentKey: { watchlistKey: currentWatchlistKey },
    apolloConfig: watchlistAlertsByKeyApolloConfig,
  });

  currentWatchlistName.current =
    apolloData?.watchlist?.name ||
    allWatchlists.find(
      /* @ts-ignore TODO: TS7006 ->  Parameter 'watchlist' implicitly has an 'any' type. */
      (watchlist) => watchlist.watchlistKey === currentWatchlistKey,
    )?.name ||
    '';

  const apolloDataCopy =
    (apolloData && JSON.parse(JSON.stringify(apolloData))) || null;

  const apolloAlertsDataCopy =
    (apolloAlertsData && JSON.parse(JSON.stringify(apolloAlertsData))) || null;

  const mergedDataCopy = JSON.parse(
    JSON.stringify(merge(apolloDataCopy, apolloAlertsDataCopy)),
  );

  useEffect(() => {
    const instrumentKeys =
      apolloData?.watchlist?.instruments
        ?.filter((instrument: Instrument) => !!instrument?.instrumentKey)
        ?.map((instrument: Instrument) => ({
          listingKey: instrument.instrumentKey,
          isMarketOpen: instrument.isMarketOpen,
        })) || [];

    dispatch(setInstrumentKeysCustom(instrumentKeys));
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  }, [apolloData, dispatch, location.href]);

  customOrderRef.current = JSON.parse(
    mergedDataCopy?.watchlist?.watchlistSettings?.customOrder || null,
  );

  if (refetch) {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.refetchWatchlistsGQL = async () => {
      const {
        data: refetchData,
        loading: refetchLoading,
        error: refetchError,
      } = await refetch(options);

      if (refetchData && !refetchLoading && !refetchError) {
        isDirtyRef.current = null;
        isDirtySortTableRef.current = null;
        currentWatchlistName.current = refetchData?.watchlist?.name;
        if (refetchData.watchlist?.instruments) {
          hasInstruments.current = true;
        } else {
          hasInstruments.current = false;
        }
      }

      // update MiniWatchlist component as well
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      if (global.MiniWatchlistRefetch) {
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global.MiniWatchlistRefetch();
      }
    };
  }

  const watchlistLoading = loading || defaultWatchlistLoading || alertsLoading;
  hasInstruments.current =
    apolloData?.watchlist?.instruments && !watchlistLoading;

  const sortBy = queryCopy?.sortBy;
  const direction = queryCopy?.direction;

  const grouping =
    queryCopy?.group ||
    (!isDirtyRef.current && watchlistSettings?.grouping) ||
    'no-grouping';

  const tableType = tableByViewtype(tableView);

  if (grouping) {
    queryCopy.group = grouping;
  }

  if (tableView) {
    queryCopy.type = tableView;
  }

  if (sortBy && isDirtySortTableRef.current) {
    queryCopy.sortBy = sortBy;
  }

  if (direction && isDirtySortTableRef.current) {
    queryCopy.direction = direction;
  }

  const navigate = useStableNavigate();

  const filteredData = mergedDataCopy?.watchlist || null;

  if (
    filteredData &&
    ((queryCopy?.sortBy && queryCopy?.direction) ||
      (!isDirtySortTableRef.current &&
        !isDirtyRef.current &&
        !customOrderRef.current))
  ) {
    // sort when user has clicked on sort
    if (
      (filteredData?.instruments && isDirtySortTableRef.current) ||
      (filteredData?.instruments &&
        // sort when we got params from url on load
        !isDirtySortTableRef.current &&
        !isDirtyRef.current &&
        queryCopy?.sortBy)
    ) {
      filteredData.instruments = sortTableItems(
        filteredData?.instruments,
        queryCopy?.sortBy,
        queryCopy?.direction,
      );
    } else if (filteredData?.instruments) {
      // default sort by name if no custom order
      filteredData.instruments = sortTableItems(
        filteredData?.instruments,
        'mName',
        'asc',
      );
    }
  } else if (
    filteredData &&
    !queryCopy?.sortBy &&
    !queryCopy?.direction &&
    !customOrderRef.current
  ) {
    filteredData.instruments = sortTableItems(
      filteredData.instruments,
      'mName',
      'asc',
    );
  } else if (
    // custom order stored in dynamoDB but can be overwritten by sorting the table
    !queryCopy?.sortBy &&
    !queryCopy?.direction &&
    watchlistSettings?.view &&
    filteredData &&
    customOrderRef.current &&
    filteredData.instruments
  ) {
    filteredData.instruments = sort(
      JSON.parse(JSON.stringify(filteredData?.instruments)),
      'instrumentKey',
      'asc',
      customOrderRef.current,
    );
  }

  /************ Tealium tracking start ***************/

  const tealiumPayloadRef = useRef(null);
  if (currentWatchlistKey) {
    const customViewForTracking =
      mergedDataCopy?.watchlist?.watchlistSettings?.customView &&
      mergedDataCopy?.watchlist?.watchlistSettings?.customView.length > 0 &&
      JSON.parse(
        mergedDataCopy?.watchlist?.watchlistSettings?.customView,
        /* @ts-ignore TODO: TS7006 ->  Parameter 'acc' implicitly has an 'any' type. */
        /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
      )?.reduce((acc, item) => {
        acc.push(item.field);
        return acc;
      }, []);

    const groupedListForTracking =
      (mergedDataCopy?.watchlist?.instruments &&
        /* @ts-ignore TODO: TS7006 ->  Parameter 'acc' implicitly has an 'any' type. */
        /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
        mergedDataCopy?.watchlist?.instruments?.reduce((acc, item) => {
          if (item?.otherAsset) {
            acc[OTHER_ASSETS_TITLE] = acc[OTHER_ASSETS_TITLE]
              ? acc[OTHER_ASSETS_TITLE] + 1
              : 1;
          } else {
            const groupLabel =
              /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ EQU */
              (PAPER_VALUES_GROUPING_MAPPING[item.type] &&
                /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ EQU */
                `${PAPER_VALUES_GROUPING_MAPPING[item.type]} (${item.type})`) ||
              `Diverse (${item.type})`;
            acc[groupLabel] = acc[groupLabel] ? acc[groupLabel] + 1 : 1;
          }
          return acc;
        }, {})) ||
      null;
    /* @ts-ignore TODO: TS2322 ->  Type '{ cms_preferredUri */
    tealiumPayloadRef.current = {
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      cms_preferredUri: location.pathname,
      cms_page_type: 'Watchlist',
      watchlist_key: currentWatchlistKey,
      watchlist_positions:
        (mergedDataCopy?.watchlist?.instruments &&
          mergedDataCopy?.watchlist.instruments?.length) ||
        0,
      watchlist_positions_by_type: groupedListForTracking,
      watchlist_view: tableView,
      watchlist_grouping: grouping || 'no-grouping',
      watchlist_custom_view_fields: customViewForTracking?.join?.(',') || '',
    };
  }

  useEffect(() => {
    if (
      currentWatchlistKey &&
      tealiumPayloadRef.current &&
      !defaultWatchlistLoading
    ) {
      tealiumTrackEvent({
        type: 'view',
        payload: {
          /* @ts-ignore TODO: TS2698 ->  Spread types may only be created from object types. */
          ...tealiumPayloadRef.current,
          watchlist_view: tableView,
          watchlist_grouping: grouping,
        },
      });
    }
    // having tableView and grouping in the dependency array will cause an double tracking
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentWatchlistKey,
    locationQuery.group,
    locationQuery.type,
    defaultWatchlistLoading,
  ]);

  /************ Tealium tracking end ***************/

  return (
    <>
      <Helmet
        title="Watchlist | cash"
        meta={[
          {
            name: 'robots',
            content: ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE,
          },
        ]}
      ></Helmet>
      <div className={styles.Wrapper}>
        {(!isHybridApp && (
          <Breadcrumbs
            /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
            pageUrl={location.pathname}
            /* @ts-ignore TODO: TS2322 ->  Type 'Omit<ActiveMenuTrailItemConnection, "pageInfo">' is not assignable to type 'BreadcrumbsItems'. */
            items={breadcrumbItems}
            addClass="hide-on-print"
          />
        )) ||
          null}
        <h1
          className={classNames(
            styles.Heading,
            {
              [styles.HeadingSkeleton]: watchlistLoading && !mergedDataCopy,
            },
            'hide-on-print',
          )}
        >
          {mergedDataCopy?.watchlist?.name ||
            (watchlistLoading && <>&nbsp;</>) ||
            'Alle Watchlists'}
        </h1>
        {/* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'never'. */}
        {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
        <CategoryButtons pathname={location.pathname} />
        <>
          {!error &&
            !allWatchlistRefetchError &&
            allWatchlists &&
            defaultWatchlist &&
            Array.isArray(allWatchlists) && (
              <>
                <ActionButtons
                  currentKey={currentWatchlistKey}
                  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
                  name={currentWatchlistName.current}
                  isDefault={
                    defaultWatchlist?.watchlistKey === currentWatchlistKey
                  }
                  userSettings={watchlistSettings}
                  query={queryCopy}
                  isDirty={isDirtyRef}
                  isDirtySortTableRef={isDirtySortTableRef}
                  tableType={tableType}
                  isLoading={watchlistLoading}
                  isEmpty={!hasInstruments.current}
                  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'TableType' can't be used to index type '{ "limit-table */
                  headers={TABLE_HEADERS[tableType]}
                />
                <div className={styles.WatchlistSelectionWrapper}>
                  <div className={styles.WatchlistSelection}>
                    <Dropdown
                      iconTypeRight="IconChevronDown"
                      iconTypeRightActive="IconChevronUp"
                      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | undefined'. */
                      label={currentWatchlistName.current}
                      variant="secondary"
                      size="small"
                      loading={
                        !mergedDataCopy?.watchlist?.name &&
                        apolloData?.watchlist
                      }
                      key={`dropdown-watchlist-selection-${currentWatchlistName.current}`}
                    >
                      <>
                        {allWatchlists.map((watchlist) => {
                          return (
                            <DropdownItem
                              key={`watchlist-names-${watchlist?.watchlistKey}-${currentWatchlistName.current}`}
                              label={watchlist.name}
                            >
                              {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
                              {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
                              {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                              {({ handleOptionClick, itemId, label }) => (
                                <Link
                                  className={classNames(
                                    styles.WatchlistDropdownItem,
                                    styles.DropdownViewLink,
                                  )}
                                  path={
                                    (watchlist.standard &&
                                      `/${ROUTE_WATCHLIST}`) ||
                                    `/${ROUTE_WATCHLIST}/${watchlist.watchlistKey}`
                                  }
                                  onClick={() => {
                                    handleOptionClick(itemId);
                                    isDirtyRef.current = null;
                                  }}
                                >
                                  <div className={styles.RowWrapper}>
                                    <span
                                      className={classNames({
                                        [styles.ActiveItem]:
                                          watchlist?.watchlistKey ===
                                          currentWatchlistKey,
                                      })}
                                    >
                                      {label}
                                    </span>
                                    <div className={styles.DefaultIcon}>
                                      {watchlist.standard && (
                                        <Icon type="IconFavouriteFill" />
                                      )}
                                    </div>
                                    <div className={styles.CheckmarkIcon}>
                                      {watchlist?.watchlistKey ===
                                        mergedDataCopy?.watchlist
                                          ?.watchlistKey && (
                                        <Icon type="IconCheck" />
                                      )}
                                    </div>
                                  </div>
                                </Link>
                              )}
                            </DropdownItem>
                          );
                        })}
                        <DropdownItem label={`Neue Watchlist anlegen`}>
                          {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                          {/* @ts-ignore TODO: TS7031 ->  Binding element 'setIsOpen' implicitly has an 'any' type. */}
                          {({ label, setIsOpen }) => (
                            <div
                              className={classNames(
                                styles.WatchlistDropdownItem,
                                styles.DropdownViewLink,
                                styles.NewWatchlist,
                              )}
                              role="link"
                              tabIndex={0}
                              onClick={(event) => {
                                event.preventDefault();
                                setIsOpen(false);
                                watchlistCreate({
                                  /* @ts-ignore TODO: TS2322 ->  Type 'NavigateFunction' is not assignable to type 'null | undefined'. */
                                  navigate,
                                  origin: 'watchlist',
                                });
                              }}
                              onKeyDown={(event) => {
                                event.preventDefault();
                                setIsOpen(false);
                                watchlistCreate({
                                  /* @ts-ignore TODO: TS2322 ->  Type 'NavigateFunction' is not assignable to type 'null | undefined'. */
                                  navigate,
                                  origin: 'watchlist',
                                });
                              }}
                            >
                              <Icon type="IconPlus" /> {label}
                            </div>
                          )}
                        </DropdownItem>
                      </>
                    </Dropdown>
                  </div>
                  <div
                    onClick={(event: React.MouseEvent) => {
                      enableAutoFocus(event);
                    }}
                    onKeyUp={(event: React.KeyboardEvent) => {
                      event.stopPropagation();

                      if (event.key === 'Enter') {
                        enableAutoFocus(event);
                      }
                    }}
                    role="presentation"
                    className={styles.AddInstrumentButtonWrapper}
                  >
                    <Dropdown iconTypeRight="IconPlus" variant="primary">
                      <DropdownItem>
                        {/* @ts-ignore TODO: TS7031 ->  Binding element 'setIsOpen' implicitly has an 'any' type. */}
                        {({ setIsOpen }) => {
                          return (
                            <div className={styles.SearchWrapperDrawer}>
                              <AddInstrumentToWatchlist
                                watchlistKey={currentWatchlistKey}
                                searchResultHeight={384}
                                closeDrawer={setIsOpen}
                                isInsideDrawer
                                origin="watchlist/add-instrument/plus-icon"
                              ></AddInstrumentToWatchlist>
                            </div>
                          );
                        }}
                      </DropdownItem>
                    </Dropdown>
                  </div>
                </div>
              </>
            )}
          <div
            className={classNames(styles.Content, {
              [styles.Centered]: !mergedDataCopy,
            })}
          >
            {watchlistLoading && <LoadingSpinner />}
            {!mergedDataCopy &&
              !error &&
              !defaultWatchlist?.watchlist &&
              !watchlistLoading && (
                <div className={styles.NoResult}>
                  Sie haben noch keine Watchlist
                  <div className={styles.NewWatchlistButtonWrapper}>
                    <ButtonWithLoading
                      onClick={(event) => {
                        event.preventDefault();
                        /* @ts-ignore TODO: TS2322 ->  Type 'NavigateFunction' is not assignable to type 'null | undefined'. */
                        watchlistCreate({ navigate, origin: 'watchlist' });
                      }}
                      variant="primary"
                      ariaLabel="Neue Watchlist anlegen"
                    >
                      Neue Watchlist anlegen
                    </ButtonWithLoading>
                  </div>
                </div>
              )}
            {error && (
              <div className={styles.NoResult}>
                <p>Wir haben derzeit technische Probleme. </p>
                <p>
                  Bitte probieren Sie es zu einem späteren Zeitpunkt nochmals
                </p>
                <p>
                  <br />
                  <ButtonWithLoading
                    size="small"
                    iconTypeLeft="IconArrowRotateRight"
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    Aktualisieren
                  </ButtonWithLoading>
                </p>
              </div>
            )}

            {!hasWatchlist && !watchlistLoading && !error && (
              <EmptyScreen entity="watchlist" />
            )}

            {(!watchlistLoading &&
              mergedDataCopy?.watchlist &&
              hasInstruments.current && (
                <>
                  <Table
                    /* @ts-ignore TODO: TS2322 ->  Type 'MutableRefObject<null>' is not assignable to type 'MutableRefObject<boolean>'. */
                    isDirtySortTableRef={isDirtySortTableRef}
                    component={tableType}
                    data={filteredData}
                    groupType={grouping || 'no-grouping'}
                    type={'watchlist'}
                    tableHeaders={TABLE_HEADERS}
                    /* @ts-ignore TODO: TS2322 ->  Type 'Partial<RaschRouterLocation> | undefined' is not assignable to type 'Partial<RaschRouterLocation>'. */
                    location={location}
                  />
                </>
              )) ||
              (!watchlistLoading && mergedDataCopy?.watchlist && (
                <p className={classNames(styles.FallbackText, 'hide-on-print')}>
                  Beginnen Sie, Instrumente zu Ihrer Watchlist hinzuzufügen. Sie
                  können diese direkt z.B. aus der{' '}
                  <Link
                    className={styles.Link}
                    path="/kurse/aktien/schweiz/smi-index"
                  >
                    SMI Kursliste
                  </Link>{' '}
                  oder über die Detail-Ansichten hinzufügen. Oder verwenden Sie
                  das folgende Suchfeld um direkt zu suchen.
                </p>
              )) ||
              null}

            {!watchlistLoading && mergedDataCopy && hasWatchlist && (
              <div className={styles.InputSearchWrapper}>
                <AddInstrumentToWatchlist
                  watchlistKey={currentWatchlistKey}
                  searchResultWithBorder={true}
                  searchResultHeight={384}
                  origin="watchlist/add-instrument/search-input"
                ></AddInstrumentToWatchlist>
              </div>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default Watchlist;
