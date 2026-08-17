import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import ButtonWithLoading from '../../../../components/ButtonWithLoading';
import Helmet from '../../../../components/Helmet';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import Table from '../Table';
import { addCashItem } from './components/AddCashItem';
import { useStableNavigate } from '../../../../../../../shared/hooks/useStableNavigateContext';
import { portfolioTransactionsApolloConfig } from '../PortfolioInstrument/apolloConfig';
import { cashItemsApolloConfig } from './apolloConfig';
import { ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE } from '../../../../../../../shared/constants/structuredData';
import { PARAGRAPHS_RENDERER_ORIGIN } from '../../../../components/Paragraphs/components/ParagraphsRenderer/constants';
import { ROUTE_PORTFOLIO } from '../../../../constants';
import { ACCOUNT_OVERVIEW_TABLE_HEADERS } from '../Portfolio/constants';
import { TOTALS_ROW_IDENTIFIER } from '../Table/constants';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'location' implicitly has an 'any' type. */
const CashItems = ({ location }) => {
  const { portfolioKey } = useParams();
  const navigate = useStableNavigate();
  const [cashItemData, setCashItemData] = useState(null);
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );

  const { query, ...options } = portfolioTransactionsApolloConfig.options({
    location,
    params: {
      /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
      portfolioKey: portfolioKey,
    },
  });

  const { data } = useQuery(query, options);

  const { query: cashItemsQuery, ...cashItemsOptions } =
    cashItemsApolloConfig.options({
      params: {
        /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
        portfolioKey: portfolioKey,
      },
    });

  const {
    data: apolloData,
    loading,
    refetch,
  } = useQuery(cashItemsQuery, cashItemsOptions);

  useEffect(() => {
    if (!loading && apolloData?.getCashItems && !cashItemData) {
      setCashItemData(apolloData);
    }
  }, [apolloData, cashItemData, loading]);

  /* @ts-ignore TODO: TS2339 ->  Property 'getCashItems' does not exist on type 'never'. */
  const cashItems = cashItemData?.getCashItems?.cashItems?.edges;
  if (refetch) {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.refetchCashItems = async () => {
      const {
        data: refetchData,
        loading: refetchLoading,
        error: refetchError,
      } = await refetch(options);

      if (refetchData && !refetchLoading && !refetchError) {
        setCashItemData(refetchData);
      }
    };
  }
  // map fields to match instruments structure
  const instruments =
    /* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */
    cashItems?.map(({ node }) => {
      return {
        id: node.id,
        instrumentKey: node.id,
        date: node.date,
        comment: node.comment,
        amount: node.amount,
        instrumentTitle: node.instrumentTitle,
        cashItemKey: node.cashItemKey,
        fullquoteUri: null,
        toggleable: !node?.instrumentTitle ? true : false,
      } as Instrument;
    }) || null;

  if (instruments) {
    const totalRow = {
      identifier: TOTALS_ROW_IDENTIFIER,
      id: 'total',
      name: 'Total',
      toggleable: false,
      /* @ts-ignore TODO: TS2339 ->  Property 'getCashItems' does not exist on type 'never'. */
      total: cashItemData?.getCashItems?.total,
    };

    // push totalRow to the end of the array only once if it does not exist
    if (
      instruments.length &&
      instruments[instruments.length - 1].identifier !== TOTALS_ROW_IDENTIFIER
    ) {
      instruments.push(totalRow);
    }
  }

  const isDefaultPortfolio = data?.portfolio?.defaultPortfolio;
  const breadcrumbItems: Omit<ActiveMenuTrailItemConnection, 'pageInfo'> = {
    count: 3,
    totalCount: 3,
    edges: [
      {
        node: {
          id: 'portfolios',
          label: 'Portfolios',
          link: '/portfolios',
          __typename: 'ActiveMenuTrailItem',
        },
        __typename: 'ActiveMenuTrailItemEdge',
      },
      {
        node: {
          id: 'portfolio',
          label: 'Portfolio',
          link: `/portfolio${
            isDefaultPortfolio && data?.portfolio?.portfolioKey === portfolioKey
              ? ''
              : `/${portfolioKey}`
          }`,
          __typename: 'ActiveMenuTrailItem',
        },
        __typename: 'ActiveMenuTrailItemEdge',
      },
      {
        node: {
          id: 'account',
          label: 'Konto',
          link: '',
          __typename: 'ActiveMenuTrailItem',
        },
        __typename: 'ActiveMenuTrailItemEdge',
      },
    ],
    __typename: 'ActiveMenuTrailItemConnection',
  };

  /************ Tealium tracking start ***************/
  const tealiumPayloadRef = useRef(null);
  if (!loading && cashItems) {
    const groupedListForTracking =
      /* @ts-ignore TODO: TS7006 ->  Parameter 'acc' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
      cashItems?.reduce((acc, item) => {
        const { instrumentTitle, amount } = item.node;
        acc.Withdraw = acc?.Withdraw || 0;
        acc.Default = acc?.Default || 0;
        acc.Deposits = acc?.Deposits || 0;
        if (instrumentTitle) {
          acc.Default = acc?.Default ? acc.Default + 1 : 1;
        } else if (amount > 0 && !instrumentTitle) {
          acc.Deposits = acc?.Deposits ? acc.Deposits + 1 : 1;
        } else if (amount < 0 && !instrumentTitle) {
          acc.Withdraw = acc?.Withdraw ? acc.Withdraw + 1 : 1;
        }

        return acc;
      }, {}) || null;
    /* @ts-ignore TODO: TS2322 ->  Type '{ cms_preferredUri */
    tealiumPayloadRef.current = {
      cms_preferredUri: location.pathname,
      cms_page_type: 'CashAccount',
      portfolio_key: portfolioKey,
      cash_items_positions: (Array.isArray(cashItems) && cashItems.length) || 0,
      cash_items_groups: groupedListForTracking,
    };
  }

  useEffect(() => {
    if (cashItems && tealiumPayloadRef.current && !loading) {
      tealiumTrackEvent({
        type: 'view',
        payload: {
          /* @ts-ignore TODO: TS2698 ->  Spread types may only be created from object types. */
          ...tealiumPayloadRef.current,
        },
      });
    }
  }, [cashItems, loading]);

  /************ Tealium tracking end ***************/

  if (data?.portfolio?.name) {
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    breadcrumbItems.edges[1].node.label = data?.portfolio?.name;
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    breadcrumbItems.edges[1].node.link =
      (isDefaultPortfolio && `/${ROUTE_PORTFOLIO}`) ||
      `/${ROUTE_PORTFOLIO}/${portfolioKey}`;
  }
  return (
    <>
      <Helmet
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
              navigate(
                `/portfolio${
                  isDefaultPortfolio &&
                  data?.portfolio?.portfolioKey === portfolioKey
                    ? ''
                    : `/${portfolioKey}`
                }`,
              );
            }}
          >
            zurück zum Portfolio
          </ButtonWithLoading>
        </div>
        <h1 className={styles.Heading}>Konto Übersicht</h1>
        <div className={styles.ShortTitle}>
          {data?.portfolio?.name || <>&nbsp;</>}
        </div>
        <div className={styles.ButtonWrapper}>
          <ButtonWithLoading
            size="small"
            variant="secondary"
            iconTypeLeft="IconCirclePlus"
            onClick={() => {
              addCashItem({
                portfolioKey,
                portfolioCurrency: data?.portfolio?.currency,
                navigate,
                type: 'deposit',
                origin: 'account-overview/cash-items-deposit',
              });
            }}
          >
            Einzahlung
          </ButtonWithLoading>
          <ButtonWithLoading
            size="small"
            variant="secondary"
            iconTypeLeft="IconCircleMinus"
            onClick={() => {
              addCashItem({
                portfolioKey,
                portfolioCurrency: data?.portfolio?.currency,
                navigate,
                type: 'withdraw',
                origin: 'account-overview/cash-items-withdraw',
              });
            }}
          >
            Abhebung
          </ButtonWithLoading>
        </div>
        {!loading && cashItems && cashItems.length > 0 && (
          <div className={classNames(styles.TableWrapper)}>
            <Table
              /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'MutableRefObject<boolean>'. */
              isDirtySortTableRef={null}
              component={'default'}
              data={{
                /* @ts-ignore TODO: TS2339 ->  Property 'getCashItems' does not exist on type 'never'. */
                id: cashItemData?.getCashItems?.id,
                portfolioKey: data?.portfolio?.portfolioKey,
                items: instruments,
              }}
              groupType={'no-grouping'}
              type="cash-item-overview"
              tableHeaders={ACCOUNT_OVERVIEW_TABLE_HEADERS}
              location={location}
              origin={PARAGRAPHS_RENDERER_ORIGIN}
            />
          </div>
        )}
        <div
          className={classNames(styles.Content, {
            [styles.Centered]: !instruments || loading,
          })}
        >
          {loading && <LoadingSpinner />}
          {!loading && !instruments && (
            <div className={styles.NoResult}>
              Ihre Kontoübersicht ist noch leer. Hier werden Ihre
              Portfolio-Transaktionen und Ihre Ein- und Auszahlungen angezeigt.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CashItems;
