import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'lodash.merge'. '/Users/bhs/code/work/rasch-stack/node_modules/lodash.merg */
import merge from 'lodash.merge';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import { enableAutoFocus } from '../../../../components/AutoSuggestSearch/helpers';
import { calculateDepotPrice } from '../../../../components/Widgets/components/TradingTeaser/helpers';
import { GetAlerts, hasAlertsColumn } from '../Alerts/helpers';
import { sort, sortTableItems } from '../Table/helpers';
import { hasTransactionFields, tableByViewtype } from './helpers';
import authStateSelector from '../../../../../../../shared/selectors/authStateSelector';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import { skipQueryConfig } from '../../../../../../../shared/decorators/withRaschRouterFactory';
import { setInstrumentKeysCustom } from '../../../../../../shared/actions/autoUpdate';
import { useStableNavigate } from '../../../../../../../shared/hooks/useStableNavigateContext';
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
import AddInstrumentToPortfolio from './components/AddInstrumentToPortfolio';
import PortfolioNews from './components/PortfolioNews';
import PortfolioSummary from './components/PortfolioSummary';
import BigPortfolioWarning, {
  MAX_INSTRUMENT_PER_PORTFOLIO,
} from './components/BigPortfolioWarning';
import { portfolioCreate } from '../../../../components/PortfolioManagementForm';
import { addOtherAsset } from '../../../../components/PortfolioManagementForm/components/AddOtherAssetForm';
import {
  portfolioAlertsByKeyApolloConfig,
  portfolioByKeyApolloConfig,
  portfolioScreenApolloConfig,
} from './apolloConfig';
import { ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE } from '../../../../../../../shared/constants/structuredData';
import { ROUTE_PORTFOLIO, ROUTE_PORTFOLIOS } from '../../../../constants';
import {
  DEFAULT_TABLE,
  OTHER_ASSETS_TITLE,
  PAPER_VALUES_GROUPING_MAPPING,
} from '../Table/constants';
import { SOLDOUT_TEXT, TABLE_HEADERS } from './constants';
import styles from './styles.legacy.css';
import { PortfolioProps } from './typings';

const breadcrumbItems: Omit<ActiveMenuTrailItemConnection, 'pageInfo'> = {
  count: 3,
  totalCount: 3,
  edges: [
    {
      node: {
        id: 'portfolios',
        label: 'Portfolios',
        link: `/${ROUTE_PORTFOLIOS}`,
        __typename: 'ActiveMenuTrailItem',
      },
      __typename: 'ActiveMenuTrailItemEdge',
    },
    {
      node: {
        id: '',
        label: 'Portfolio',
        link: null,
        __typename: 'ActiveMenuTrailItem',
      },
      __typename: 'ActiveMenuTrailItemEdge',
    },
  ],
  __typename: 'ActiveMenuTrailItemConnection',
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'portfolio' implicitly has an 'any' type. */
export const filterSoldItems = (portfolio) => {
  if (portfolio?.calculatedFields?.instruments) {
    const filteredInstruments =
      Array.isArray(portfolio?.calculatedFields?.instruments) &&
      portfolio?.calculatedFields?.instruments.length > 0 &&
      /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
      portfolio.calculatedFields.instruments.filter((item) => {
        return Number(item.quantity) !== 0;
      });

    const portfolioDataCopy = JSON.parse(JSON.stringify(portfolio));
    portfolioDataCopy.calculatedFields.instruments = filteredInstruments;
    return portfolioDataCopy;
  }
  return portfolio;
};

const Portfolio = ({ location }: PortfolioProps) => {
  const { portfolioKey } = useParams();
  /* @ts-ignore TODO: TS2339 ->  Property 'query' does not exist on type 'Partial<RaschRouterLocation> | undefined'. */
  const { query: locationQuery } = location;
  const navigate = useStableNavigate();
  const dispatch = useDispatch();
  const hasInstruments = useRef(true);
  const hasSoldOutPositions = useRef(false);
  const currentPortfolioName = useRef(null);
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );
  const isDirtyRef = useRef(null);
  const isDirtySortTableRef = useRef(null);
  const customOrderRef = useRef(null);
  const isAuthenticated = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => authStateSelector(state).isAuthenticated,
  );

  const { query: porfolioQuery, ...portfolioOptions } =
    portfolioScreenApolloConfig.options({
      location,
      params: {
        /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string'. */
        isAuthenticated: (isAuthenticated && `${isAuthenticated}`) || null,
      },
    });

  const {
    loading,
    data,
    error: allPortfolioRefetchError,
    refetch: allPortfolioRefetch,
  } = useQuery(porfolioQuery, portfolioOptions);

  if (allPortfolioRefetch) {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.refetchAllPortfoliosGQL = async () => {
      await allPortfolioRefetch(options);
    };
  }

  const allPortfolios = data?.portfolios?.items || [];
  const defaultPortfolio = allPortfolios?.find(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'portfolio' implicitly has an 'any' type. */
    (portfolio) => portfolio.defaultPortfolio,
  );

  const hasPortfolios = allPortfolios?.length > 0;

  const queryCopy = JSON.parse(JSON.stringify(locationQuery));
  const currentPortfolioKey = portfolioKey || defaultPortfolio?.portfolioKey;
  const currentPortfolioInstrumentCount = allPortfolios.find(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'portfolio' implicitly has an 'any' type. */
    (portfolio) => portfolio.portfolioKey === currentPortfolioKey,
  )?.instrumentCount;
  const currentCustomView = data?.portfolios?.items?.find(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
    (item) => item.portfolioKey === currentPortfolioKey,
  )?.portfolioSettings?.customView;

  const { query, ...options } =
    portfolioByKeyApolloConfig.options({
      location,
      params: {
        portfolioKey: currentPortfolioKey,
        withTransaction:
          (hasTransactionFields(queryCopy.type, currentCustomView) && 'true') ||
          'false',
      },
    }) || skipQueryConfig;

  const {
    data: apolloData,
    error,
    loading: defaultPortfolioLoading,
    refetch,
  } = useQuery(query, options);

  const portfolioSettings =
    (!defaultPortfolioLoading && apolloData?.portfolio?.portfolioSettings) ||
    null;

  const tableView =
    queryCopy?.type ||
    (!isDirtyRef.current && portfolioSettings?.view) ||
    DEFAULT_TABLE;

  const hasAlerts = hasAlertsColumn(tableView, currentCustomView);

  const { data: apolloAlertsData, loading: alertsLoading } = GetAlerts({
    hasAlerts,
    currentKey: { portfolioKey: currentPortfolioKey },
    apolloConfig: portfolioAlertsByKeyApolloConfig,
  });

  customOrderRef.current = JSON.parse(
    apolloData?.portfolio?.portfolioSettings?.customOrder || null,
  );
  currentPortfolioName.current = apolloData?.portfolio?.name;

  const apolloDataCopy =
    (apolloData && JSON.parse(JSON.stringify(apolloData))) || null;

  const apolloAlertsDataCopy =
    (apolloAlertsData && JSON.parse(JSON.stringify(apolloAlertsData))) || null;

  const mergedDataCopy = JSON.parse(
    JSON.stringify(merge(apolloDataCopy, apolloAlertsDataCopy)),
  );

  useEffect(() => {
    const instrumentKeys =
      apolloData?.portfolio?.instruments
        ?.filter((instrument: Instrument) => !!instrument?.instrumentKey)
        ?.map((instrument: Instrument) => ({
          listingKey: instrument.instrumentKey,
          isMarketOpen: instrument.isMarketOpen,
        })) || [];

    dispatch(setInstrumentKeysCustom(instrumentKeys));
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  }, [apolloData, dispatch, location.href]);

  if (mergedDataCopy?.portfolio?.calculatedFields?.instruments) {
    const withoutSoldOut = filterSoldItems(mergedDataCopy?.portfolio);
    if (withoutSoldOut.calculatedFields?.instruments?.length !== 0) {
      hasSoldOutPositions.current = false;
    } else {
      hasSoldOutPositions.current = true;
    }
    hasInstruments.current = true;
  } else {
    hasInstruments.current = false;
  }

  const depotPrice = calculateDepotPrice(
    mergedDataCopy?.portfolio?.calculatedFields?.cashAccountTotal,
  );

  if (refetch) {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.refetchPortfoliosGQL = async () => {
      const {
        data: refetchData,
        loading: refetchLoading,
        error: refetchError,
      } = await refetch(options);

      if (refetchData && !refetchLoading && !refetchError) {
        isDirtyRef.current = null;
        isDirtySortTableRef.current = null;
        currentPortfolioName.current = refetchData?.portfolio?.name;
        if (refetchData.portfolio?.calculatedFields?.instruments) {
          const withoutSoldOut = filterSoldItems(refetchData?.portfolio);
          if (withoutSoldOut.calculatedFields?.instruments?.length !== 0) {
            hasSoldOutPositions.current = false;
          } else {
            hasSoldOutPositions.current = true;
          }
          hasInstruments.current = true;
        } else {
          hasInstruments.current = false;
        }
      }
    };
  }

  const portfolioLoading = loading || defaultPortfolioLoading || alertsLoading;
  hasInstruments.current =
    apolloData?.portfolio?.calculatedFields?.instruments !== null &&
    !portfolioLoading;

  const sortBy = queryCopy?.sortBy;
  const direction = queryCopy?.direction;

  const grouping =
    queryCopy?.group ||
    (!isDirtyRef.current && portfolioSettings?.grouping) ||
    'no-grouping';

  const tableType = tableByViewtype(tableView);

  if (grouping) {
    queryCopy.group = grouping;
  }

  if (tableView) {
    queryCopy.type = tableView;
  }
  const showSoldOut =
    (!locationQuery?.['sold-out'] &&
      locationQuery['sold-out'] !== 'show' &&
      hasSoldOutPositions.current &&
      true) ||
    false;

  if (sortBy && isDirtySortTableRef.current) {
    queryCopy.sortBy = sortBy;
  }

  if (direction && isDirtySortTableRef.current) {
    queryCopy.direction = direction;
  }

  const filteredData =
    (!locationQuery?.['sold-out'] &&
      locationQuery['sold-out'] !== 'show' &&
      filterSoldItems(mergedDataCopy?.portfolio)) ||
    mergedDataCopy?.portfolio;

  if (
    filteredData &&
    ((queryCopy?.sortBy && queryCopy?.direction) ||
      (!isDirtySortTableRef.current &&
        !isDirtyRef.current &&
        !customOrderRef.current))
  ) {
    // sort when user has clicked on sort
    if (
      (filteredData?.calculatedFields?.instruments &&
        isDirtySortTableRef.current) ||
      (filteredData?.calculatedFields?.instruments &&
        // sort when we got params from url on load
        !isDirtySortTableRef.current &&
        !isDirtyRef.current &&
        queryCopy?.sortBy)
    ) {
      filteredData.calculatedFields.instruments = sortTableItems(
        filteredData.calculatedFields.instruments,
        queryCopy?.sortBy,
        queryCopy?.direction,
      );
    } else if (filteredData?.calculatedFields?.instruments) {
      // default sort by name if no custom order
      filteredData.calculatedFields.instruments = sortTableItems(
        filteredData.calculatedFields.instruments,
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
    filteredData.calculatedFields.instruments = sortTableItems(
      filteredData.calculatedFields.instruments,
      'mName',
      'asc',
    );
  } else if (
    // custom order stored in dynamoDB but can be overwritten by sorting the table
    !queryCopy?.sortBy &&
    !queryCopy?.direction &&
    portfolioSettings?.view &&
    filteredData &&
    customOrderRef.current &&
    filteredData?.calculatedFields?.instruments
  ) {
    filteredData.calculatedFields.instruments = sort(
      filteredData?.calculatedFields?.instruments,
      'instrumentKey',
      'asc',
      customOrderRef.current,
    );
  }
  const valorList: string[] =
    filteredData?.calculatedFields?.instruments
      ?.filter?.((item: Instrument) => !item.otherAsset)
      ?.map?.((item: Instrument) => item?.mValor)
      ?.filter?.(Boolean) || [];

  /************ Tealium tracking start ***************/

  const tealiumPayloadRef = useRef(null);
  if (currentPortfolioKey) {
    const customViewForTracking =
      apolloData?.portfolio?.portfolioSettings?.customView &&
      apolloData?.portfolio?.portfolioSettings?.customView.length > 0 &&
      JSON.parse(apolloData?.portfolio?.portfolioSettings?.customView)?.reduce(
        /* @ts-ignore TODO: TS7006 ->  Parameter 'acc' implicitly has an 'any' type. */
        /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
        (acc, item) => {
          acc.push(item.field);
          return acc;
        },
        [],
      );

    const groupedListForTracking =
      (apolloData?.portfolio?.calculatedFields?.instruments &&
        apolloData?.portfolio?.calculatedFields?.instruments?.reduce(
          /* @ts-ignore TODO: TS7006 ->  Parameter 'acc' implicitly has an 'any' type. */
          /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
          (acc, item) => {
            if (item?.otherAsset) {
              acc[OTHER_ASSETS_TITLE] = acc[OTHER_ASSETS_TITLE]
                ? acc[OTHER_ASSETS_TITLE] + 1
                : 1;
            } else {
              const groupLabel =
                /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ EQU */
                (PAPER_VALUES_GROUPING_MAPPING[item.type] &&
                  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ EQU */
                  `${PAPER_VALUES_GROUPING_MAPPING[item.type]} (${
                    item.type
                  })`) ||
                `Diverse (${item.type})`;
              acc[groupLabel] = acc[groupLabel] ? acc[groupLabel] + 1 : 1;
            }
            return acc;
          },
          {},
        )) ||
      null;
    /* @ts-ignore TODO: TS2322 ->  Type '{ cms_preferredUri */
    tealiumPayloadRef.current = {
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      cms_preferredUri: location.pathname,
      cms_page_type: 'Portfolio',
      portfolio_key: currentPortfolioKey,
      portfolio_positions:
        (apolloData?.portfolio?.calculatedFields?.instruments &&
          apolloData?.portfolio?.calculatedFields.instruments?.length) ||
        0,
      portfolio_positions_by_type: groupedListForTracking,
      portfolio_custom_view_fields: customViewForTracking?.join?.(',') || '',
    };
  }

  useEffect(() => {
    if (
      currentPortfolioKey &&
      tealiumPayloadRef.current &&
      !defaultPortfolioLoading
    ) {
      tealiumTrackEvent({
        type: 'view',
        payload: {
          /* @ts-ignore TODO: TS2698 ->  Spread types may only be created from object types. */
          ...tealiumPayloadRef.current,
          portfolio_view: tableView,
          portfolio_grouping: grouping,
        },
      });
    }
    // having tableView and grouping in the dependency array will cause an double tracking
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPortfolioKey,
    locationQuery.group,
    locationQuery.type,
    defaultPortfolioLoading,
  ]);

  /************ Tealium tracking end ***************/

  // use portfolio name as breadcrumb label on last item in breadcrumbItems
  if (mergedDataCopy?.portfolio?.name) {
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    breadcrumbItems.edges[breadcrumbItems.edges.length - 1].node.label =
      mergedDataCopy?.portfolio?.name;
  }

  return (
    <>
      <Helmet
        title="Portfolio | cash"
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
        <div className={classNames(styles.BackButtonWrapper, 'hide-on-print')}>
          <ButtonWithLoading
            size="small"
            variant="secondary"
            iconTypeLeft="IconChevronLeft"
            onClick={() => {
              navigate(`/${ROUTE_PORTFOLIOS}`);
            }}
          >
            Alle Portfolios
          </ButtonWithLoading>
        </div>
        <h1
          key={`portfolio-heading-${Math.random()}`}
          className={classNames(
            styles.Heading,
            {
              [styles.HeadingSkeleton]: portfolioLoading && !mergedDataCopy,
            },
            'hide-on-print',
          )}
        >
          {mergedDataCopy?.portfolio?.name ||
            (portfolioLoading && <>&nbsp;</>) ||
            'Alle Portfolios'}
        </h1>
        {currentPortfolioInstrumentCount >= MAX_INSTRUMENT_PER_PORTFOLIO && (
          <BigPortfolioWarning
            instrumentCount={currentPortfolioInstrumentCount}
          />
        )}

        {/* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'never'. */}
        {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
        <CategoryButtons pathname={location.pathname} />
        <>
          {!error &&
            !allPortfolioRefetchError &&
            allPortfolios &&
            defaultPortfolio &&
            Array.isArray(allPortfolios) && (
              <>
                <ActionButtons
                  currentKey={currentPortfolioKey}
                  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
                  name={currentPortfolioName.current}
                  isDefault={
                    defaultPortfolio?.portfolioKey === currentPortfolioKey
                  }
                  userSettings={portfolioSettings}
                  query={queryCopy}
                  isDirty={isDirtyRef}
                  isDirtySortTableRef={isDirtySortTableRef}
                  tableType={tableType}
                  isLoading={portfolioLoading}
                  isEmpty={!hasInstruments.current}
                  soldOutPositions={hasSoldOutPositions.current}
                  portfolio={mergedDataCopy?.portfolio}
                  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'TableType' can't be used to index type '{ "limit-table */
                  headers={TABLE_HEADERS[tableType]}
                />
                <div>
                  <div className={styles.PortfolioSelectionWrapper}>
                    <div className={styles.PortfolioSelection}>
                      <Dropdown
                        iconTypeRight="IconChevronDown"
                        iconTypeRightActive="IconChevronUp"
                        key={`dropdown-portfolio-selection-${currentPortfolioName.current}`}
                        label={
                          mergedDataCopy?.portfolio?.name ||
                          'Portfolio auswählen'
                        }
                        variant="secondary"
                        size="small"
                        loading={
                          !mergedDataCopy?.portfolio?.name &&
                          apolloData?.portfolio
                        }
                      >
                        <>
                          <DropdownItem
                            key={`all-portfolios-${allPortfolios.length}`}
                            label={`Alle Portfolios (${allPortfolios.length})`}
                          >
                            {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                            {({ label }) => (
                              <Link
                                className={classNames(
                                  styles.PortfolioDropdownItem,
                                  styles.DropdownViewLink,
                                  styles.AllPortfolios,
                                )}
                                path={`/${ROUTE_PORTFOLIOS}`}
                              >
                                <div className={styles.RowWrapper}>
                                  <span>{label}</span>
                                </div>
                              </Link>
                            )}
                          </DropdownItem>
                          {allPortfolios.map((portfolio) => {
                            return (
                              <DropdownItem
                                key={`portfolio-names-${portfolio?.portfolioKey}-${currentPortfolioName.current}`}
                                label={portfolio.name}
                              >
                                {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
                                {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
                                {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                                {({ handleOptionClick, itemId, label }) => (
                                  <Link
                                    className={classNames(
                                      styles.PortfolioDropdownItem,
                                      styles.DropdownViewLink,
                                    )}
                                    path={
                                      (portfolio.defaultPortfolio &&
                                        `/${ROUTE_PORTFOLIO}`) ||
                                      `/${ROUTE_PORTFOLIO}/${portfolio.portfolioKey}`
                                    }
                                    onClick={() => {
                                      setTimeout(() => {
                                        isDirtySortTableRef.current = null;
                                        customOrderRef.current = null;
                                      }, 0);
                                      handleOptionClick(itemId);
                                      isDirtyRef.current = null;
                                    }}
                                  >
                                    <div className={styles.RowWrapper}>
                                      <span
                                        className={classNames({
                                          [styles.ActiveItem]:
                                            portfolio?.portfolioKey ===
                                            mergedDataCopy?.portfolio
                                              ?.portfolioKey,
                                        })}
                                      >
                                        {label}
                                      </span>
                                      <div className={styles.DefaultIcon}>
                                        {portfolio.defaultPortfolio && (
                                          <Icon type="IconFavouriteFill" />
                                        )}
                                      </div>
                                      <div className={styles.CheckmarkIcon}>
                                        {portfolio?.portfolioKey ===
                                          mergedDataCopy?.portfolio
                                            ?.portfolioKey && (
                                          <Icon type="IconCheck" />
                                        )}
                                      </div>
                                    </div>
                                  </Link>
                                )}
                              </DropdownItem>
                            );
                          })}
                          <DropdownItem label={`Neues Portfolio anlegen`}>
                            {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                            {/* @ts-ignore TODO: TS7031 ->  Binding element 'setIsOpen' implicitly has an 'any' type. */}
                            {({ label, setIsOpen }) => (
                              <div
                                className={classNames(
                                  styles.PortfolioDropdownItem,
                                  styles.DropdownViewLink,
                                  styles.NewPortfolio,
                                )}
                                role="link"
                                tabIndex={0}
                                onClick={(event) => {
                                  event.preventDefault();
                                  setIsOpen(false);
                                  portfolioCreate({
                                    /* @ts-ignore TODO: TS2322 ->  Type 'NavigateFunction' is not assignable to type 'null | undefined'. */
                                    navigate,
                                    origin: 'portfolio',
                                  });
                                }}
                                onKeyDown={(event) => {
                                  event.preventDefault();
                                  setIsOpen(false);
                                  portfolioCreate({
                                    /* @ts-ignore TODO: TS2322 ->  Type 'NavigateFunction' is not assignable to type 'null | undefined'. */
                                    navigate,
                                    origin: 'portfolio',
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
                                <Link
                                  className={styles.AddTitleLink}
                                  onClick={(event) => {
                                    event.preventDefault();
                                    addOtherAsset({
                                      portfolioKey: currentPortfolioKey,
                                      portfolioCurrency:
                                        mergedDataCopy?.portfolio.currency,
                                      navigate,
                                    });
                                    setIsOpen(false);
                                  }}
                                >
                                  <div className={styles.AddTitleWrapper}>
                                    <Icon type="IconPlus"></Icon>
                                    <p>Titel manuell eintragen</p>
                                  </div>
                                </Link>
                                <AddInstrumentToPortfolio
                                  portfolioKey={currentPortfolioKey}
                                  instrumentCount={
                                    currentPortfolioInstrumentCount
                                  }
                                  closeDrawer={setIsOpen}
                                  isInsideDrawer
                                  origin="portfolio/add-instrument/plus-icon"
                                />
                              </div>
                            );
                          }}
                        </DropdownItem>
                      </Dropdown>
                    </div>
                  </div>
                  <div className={styles.MainPortfolioCurrency}>
                    {mergedDataCopy?.portfolio?.currency}
                  </div>
                </div>
              </>
            )}
          <div
            className={classNames(styles.Content, {
              [styles.Centered]: !mergedDataCopy?.portfolio,
            })}
          >
            {((currentPortfolioInstrumentCount > 0 &&
              !hasInstruments.current) ||
              portfolioLoading) && <LoadingSpinner />}
            {!mergedDataCopy &&
              !error &&
              !allPortfolioRefetchError &&
              !defaultPortfolio?.portfolio &&
              !portfolioLoading && (
                <div className={styles.NoResult}>
                  Sie haben noch kein Portfolio
                  <div className={styles.NewPortfolioButtonWrapper}>
                    <ButtonWithLoading
                      onClick={(event) => {
                        event.preventDefault();
                        /* @ts-ignore TODO: TS2322 ->  Type 'NavigateFunction' is not assignable to type 'null | undefined'. */
                        portfolioCreate({ navigate, origin: 'portfolio' });
                      }}
                      variant="primary"
                      ariaLabel="Neues Portfolio anlegen"
                    >
                      Neues Portfolio anlegen
                    </ButtonWithLoading>
                  </div>
                </div>
              )}
            {(error || allPortfolioRefetchError) && (
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
            {(!portfolioLoading &&
              mergedDataCopy?.portfolio &&
              hasInstruments.current && (
                <>
                  {!showSoldOut && (
                    <Table
                      /* @ts-ignore TODO: TS2322 ->  Type 'MutableRefObject<null>' is not assignable to type 'MutableRefObject<boolean>'. */
                      isDirtySortTableRef={isDirtySortTableRef}
                      component={tableType}
                      data={filteredData}
                      groupType={grouping || 'no-grouping'}
                      type="portfolio"
                      tableHeaders={TABLE_HEADERS}
                      /* @ts-ignore TODO: TS2322 ->  Type 'Partial<RaschRouterLocation> | undefined' is not assignable to type 'Partial<RaschRouterLocation>'. */
                      location={location}
                    />
                  )}
                  {showSoldOut && (
                    <p className={styles.FallbackText}>{SOLDOUT_TEXT}</p>
                  )}
                </>
              )) ||
              (!portfolioLoading &&
                mergedDataCopy?.portfolio &&
                currentPortfolioInstrumentCount === 0 &&
                !hasInstruments.current && (
                  <p
                    className={classNames(styles.FallbackText, 'hide-on-print')}
                  >
                    Beginnen Sie, Instrumente zu Ihrem Portfolio hinzuzufügen.
                    Sie können diese direkt z.B. aus der{' '}
                    <Link
                      className={styles.Link}
                      path="/kurse/aktien/schweiz/smi-index"
                    >
                      SMI Kursliste
                    </Link>{' '}
                    oder über die Detail-Ansichten hinzufügen. Oder verwenden
                    Sie das folgende Suchfeld um direkt zu suchen.
                  </p>
                )) ||
              null}

            {!portfolioLoading && mergedDataCopy?.portfolio && (
              <div className={styles.InputSearchWrapper}>
                <AddInstrumentToPortfolio
                  portfolioKey={currentPortfolioKey}
                  instrumentCount={currentPortfolioInstrumentCount}
                  searchResultWithBorder={true}
                  searchResultHeight={384}
                  origin="portfolio/add-instrument/search-input"
                ></AddInstrumentToPortfolio>
              </div>
            )}
            {!hasPortfolios && !portfolioLoading && !error && (
              <EmptyScreen entity="portfolio" />
            )}
          </div>

          {!portfolioLoading &&
            mergedDataCopy?.portfolio &&
            hasInstruments.current && (
              <PortfolioSummary
                portfolio={mergedDataCopy?.portfolio}
                depotPrice={depotPrice}
              />
            )}
        </>
      </div>

      <div className={classNames(styles.Wrapper, styles.PortfolioNewsWrapper)}>
        <PortfolioNews
          valorList={valorList}
          key={`portfolio-news-${currentPortfolioKey}-${JSON.stringify(
            valorList,
          )}`}
        />
      </div>
    </>
  );
};

export default Portfolio;
