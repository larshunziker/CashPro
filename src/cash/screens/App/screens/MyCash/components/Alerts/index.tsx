import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import { sortTableItems } from '../Table/helpers';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import { skipQueryConfig } from '../../../../../../../shared/decorators/withRaschRouterFactory';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import Helmet from '../../../../components/Helmet';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import CategoryButtons from '../CategoryButtons';
import EmptyScreen from '../EmptyScreen';
import Table from '../Table';
import AlertActions from './components/AlertActions';
import { alertsScreenApolloConfig } from './apolloConfig';
import ButtonWithLoading from '../../../../components/ButtonWithLoading';
import { ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE } from '../../../../../../../shared/constants/structuredData';
import { ALERTS_OVERVIEW_TABLE, TABLE_HEADERS } from './constants';
import styles from './styles.legacy.css';
import { AlertListData, AlertsProps, ExtendedAlertListItem } from './typings';

const breadcrumbItems: Omit<ActiveMenuTrailItemConnection, 'pageInfo'> = {
  count: 2,
  totalCount: 2,
  edges: [
    {
      node: {
        id: '',
        label: 'Alerts',
        link: null,
        __typename: 'ActiveMenuTrailItem',
      },
      __typename: 'ActiveMenuTrailItemEdge',
    },
  ],
  __typename: 'ActiveMenuTrailItemConnection',
};

const Alerts = ({ location }: AlertsProps) => {
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );
  /* @ts-ignore TODO: TS2339 ->  Property 'query' does not exist on type 'Partial<RaschRouterLocation> | undefined'. */
  const { query: locationQuery } = location;
  const { query, ...options } =
    alertsScreenApolloConfig.options({
      location,
    }) || skipQueryConfig;
  const isDirtySortTableRef = useRef(null);

  const {
    data,
    loading,
    error,
    refetch: alertListRefetch,
  } = useQuery(query, options);

  if (alertListRefetch) {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.refetchAlertListGQL = async () => {
      const { data: refetchAlertListData, loading: refetchAlertListLoading } =
        await alertListRefetch(options);

      if (refetchAlertListData && !refetchAlertListLoading && !error) {
        setAlertListData(refetchAlertListData);
      }
    };
  }

  const [alertListData, setAlertListData] = useState(null);
  const items: AlertListItem[] = data?.getAlertsList?.items || null;

  useEffect(() => {
    if (!loading && items && !alertListData) {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'AlertListItem[]' is not assignable to parameter of type 'SetStateAction<null>'. */
      setAlertListData(items);
    }

    return () => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'AlertListItem[]' is not assignable to parameter of type 'SetStateAction<null>'. */
      setAlertListData(items);
    };
  }, [data, loading, locationQuery, alertListData, items]);

  const queryCopy = JSON.parse(JSON.stringify(locationQuery));
  const sortBy = queryCopy?.sortBy;
  const direction = queryCopy?.direction;

  const alertsData: AlertListData = {
    id: `alert-view`,
    items: [],
  };

  items?.map((alert: ExtendedAlertListItem) => {
    const receiveType =
      (alert?.useProfileEmail &&
        alert?.useProfileMobile &&
        'E-Mail / Mobile') ||
      (alert?.useProfileEmail && 'E-Mail') ||
      (alert?.useProfileMobile && 'Mobile');

    alert = {
      id: `${alert?.alertKey}`,
      // we used transactionKey because we need to have unique key for each row
      transactionKey: `${alert?.alertKey}`,
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
      instrumentKey: alert?.listingKey,
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
      mName: alert?.fullquote?.title,
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
      fullquoteUri: alert?.fullquote?.fullquoteUri,
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
      mValor: alert?.fullquote?.mValor,
      value: alert?.value,
      type: alert?.type,
      expiration: alert?.expiration,
      brokenTime: alert?.brokenTime || '–',
      status: alert?.status,
      /* @ts-ignore TODO: TS2322 ->  Type 'false | "E-Mail" | "E-Mail / Mobile" | "Mobile" | null | undefined' is not assignable to type 'string | undefined */
      receiveType: receiveType,
    };
    alertsData.items.push(alert);
  });

  if (sortBy && isDirtySortTableRef.current) {
    queryCopy.sortBy = sortBy;
  }

  if (direction && isDirtySortTableRef.current) {
    queryCopy.direction = direction;
  }

  if (
    alertsData &&
    ((queryCopy?.sortBy && queryCopy?.direction) ||
      !isDirtySortTableRef.current)
  ) {
    // sort when user has clicked on sort
    if (
      (alertsData?.items && isDirtySortTableRef.current) ||
      (alertsData?.items &&
        // sort when we got params from url on load
        !isDirtySortTableRef.current &&
        queryCopy?.sortBy)
    ) {
      alertsData.items = sortTableItems(
        alertsData.items,
        queryCopy?.sortBy,
        queryCopy?.direction,
      );
    } else if (alertsData?.items) {
      // default sort by name
      alertsData.items = sortTableItems(alertsData.items, 'mName', 'asc');
    }
  } else if (
    !isDirtySortTableRef.current &&
    !queryCopy?.sortBy &&
    !queryCopy?.direction &&
    alertsData?.items
  ) {
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    alertListData.items = sortTableItems(alertsData.items, 'mName', 'asc');
  }

  return (
    <>
      <Helmet
        title="Alerts | cash"
        meta={[
          {
            name: 'robots',
            content: ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE,
          },
        ]}
      ></Helmet>
      <div className={styles.Wrapper}>
        {(!isHybridApp && (
          /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
          /* @ts-ignore TODO: TS2322 ->  Type 'Omit<ActiveMenuTrailItemConnection, "pageInfo">' is not assignable to type 'BreadcrumbsItems'. */
          <Breadcrumbs pageUrl={location.pathname} items={breadcrumbItems} />
        )) ||
          null}
        <h1 className={styles.Heading}>Kurs-Alerts</h1>
        {/* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'never'. */}
        {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
        <CategoryButtons pathname={location.pathname} />
        <AlertActions items={alertsData?.items} />

        <div
          id="page"
          /* @ts-ignore TODO: TS2339 ->  Property 'items' does not exist on type 'never'. */
          key={`alert-list-wrapper-${JSON.stringify(alertListData?.items)}`}
          className={classNames(styles.Content, {
            [styles.Centered]: !alertsData?.items?.length,
          })}
        >
          {loading && <LoadingSpinner />}
          {/* @ts-ignore TODO: TS2339 ->  Property 'length' does not exist on type 'never'. */}
          {!items && !items?.length && !loading && !error && (
            <EmptyScreen entity="alert" />
          )}
          {!loading && error && (
            <div className={styles.NoResult}>
              <p>Wir haben derzeit technische Probleme. </p>
              <p>Bitte probieren Sie es zu einem späteren Zeitpunkt nochmals</p>
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
          {!loading && items?.length && (
            <>
              <div className={styles.TableWrapper}>
                <Table
                  /* @ts-ignore TODO: TS2322 ->  Type 'MutableRefObject<null>' is not assignable to type 'MutableRefObject<boolean>'. */
                  isDirtySortTableRef={isDirtySortTableRef}
                  component={ALERTS_OVERVIEW_TABLE}
                  data={alertsData}
                  groupType={'no-grouping'}
                  type="alert-overview"
                  tableHeaders={TABLE_HEADERS}
                  /* @ts-ignore TODO: TS2322 ->  Type 'Partial<RaschRouterLocation> | undefined' is not assignable to type 'Partial<RaschRouterLocation>'. */
                  location={location}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Alerts;
