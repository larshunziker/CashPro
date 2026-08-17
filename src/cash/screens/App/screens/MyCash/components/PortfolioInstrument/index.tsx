import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import { formatPrice } from '../../../../components/Highcharts/helpers';
import { downloadTransactionsCSV, printTable } from '../Portfolio/helpers';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import Link from '../../../../../../../common/components/Link';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import ButtonWithLoading from '../../../../components/ButtonWithLoading';
import Dropdown from '../../../../components/Dropdown';
import DropdownItem from '../../../../components/Dropdown/components/DropdownItem';
import Helmet from '../../../../components/Helmet';
import Icon from '../../../../components/Icon';
import Table from '../Table';
import { useStableNavigate } from '../../../../../../../shared/hooks/useStableNavigateContext';
import { portfolioTransactionsApolloConfig } from './apolloConfig';
import { ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE } from '../../../../../../../shared/constants/structuredData';
import { PARAGRAPHS_RENDERER_ORIGIN } from '../../../../components/Paragraphs/components/ParagraphsRenderer/constants';
import { ROUTE_PORTFOLIOS } from '../../../../constants';
import { TRANSACTIONS_VIEW_HEADERS } from '../Portfolio/constants';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'location' implicitly has an 'any' type. */
const PortfolioTransaction = ({ location }) => {
  const { portfolioKey, instrumentKey } = useParams();
  const navigate = useStableNavigate();
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );
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
          id: 'portfolio',
          label: 'Portfolio',
          link: '/portfolio',
          __typename: 'ActiveMenuTrailItem',
        },
        __typename: 'ActiveMenuTrailItemEdge',
      },
    ],
    __typename: 'ActiveMenuTrailItemConnection',
  };

  // TODO: fetch instruments only when solid is ready so we can get rid of this filter here
  const { query, ...options } = portfolioTransactionsApolloConfig.options({
    location,
    params: {
      /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
      portfolioKey: portfolioKey,
    },
  });

  const { data, loading, refetch } = useQuery(query, options);

  /* @ts-ignore TODO: TS7034 ->  Variable 'buyInstruments' implicitly has type 'any[]' in some locations where its type cannot be determined. */
  const buyInstruments = [];
  /* @ts-ignore TODO: TS7034 ->  Variable 'sellInstruments' implicitly has type 'any[]' in some locations where its type cannot be determined. */
  const sellInstruments = [];
  let filteredInstruments =
    /* @ts-ignore TODO: TS7006 ->  Parameter 'instrument' implicitly has an 'any' type. */
    data?.portfolio?.calculatedFields?.instruments?.filter((instrument) => {
      if (!instrumentKey) {
        return true;
      } else {
        return instrument?.instrumentKey === instrumentKey;
      }
    });

  const filteredPortfolioData = data?.portfolio
    ? JSON.parse(JSON.stringify(data?.portfolio))
    : {};

  if (filteredPortfolioData?.calculatedFields?.instruments) {
    filteredPortfolioData.calculatedFields.instruments = filteredInstruments;
  }

  if (refetch) {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.refetchPortfolioGQL = async () => {
      const { data: refetchData, loading: refetchLoading } =
        await refetch(options);

      if (refetchData && !refetchLoading) {
        filteredInstruments = JSON.parse(
          JSON.stringify(
            refetchData?.portfolio?.calculatedFields?.instruments?.filter(
              /* @ts-ignore TODO: TS7006 ->  Parameter 'instrument' implicitly has an 'any' type. */
              (instrument) => instrument?.instrumentKey === instrumentKey,
            ),
          ),
        );
      }
    };
  }
  /* @ts-ignore TODO: TS7006 ->  Parameter 'instrument' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  filteredInstruments?.forEach((instrument, index) => {
    instrument?.transactions
      /* @ts-ignore TODO: TS7031 ->  Binding element 'type' implicitly has an 'any' type. */
      ?.filter(({ type }) => type === 'BUY')
      /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
      .map((item) =>
        buyInstruments.push({
          ...item,
          name: instrument.mName,
          fullquoteUri: instrument.fullquoteUri,
          instrumentType: instrument.type,
          otherAsset: filteredInstruments?.[index]?.otherAsset,
          instrumentKey: filteredInstruments?.[index]?.instrumentKey,
        }),
      );
  });
  /* @ts-ignore TODO: TS7006 ->  Parameter 'instrument' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  filteredInstruments?.forEach((instrument, index) => {
    instrument?.transactions
      /* @ts-ignore TODO: TS7031 ->  Binding element 'type' implicitly has an 'any' type. */
      ?.filter(({ type }) => type === 'SELL')
      /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
      .map((item) =>
        sellInstruments.push({
          ...item,
          name: instrument.mName,
          fullquoteUri: instrument.fullquoteUri,
          instrumentType: instrument.type,
          otherAsset: filteredInstruments?.[index]?.otherAsset,
          instrumentKey: filteredInstruments?.[index]?.instrumentKey,
        }),
      );
  });

  const isDefaultPortfolio = data?.portfolio?.defaultPortfolio;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let account = 0;
  /* @ts-ignore TODO: TS7005 ->  Variable 'sellInstruments' implicitly has an 'any[]' type. */
  sellInstruments.forEach((instrument) => {
    if (instrument?.account) {
      account += Number(instrument.account);
    }
  });

  // use portfolio name as breadcrumb label on last item in breadcrumbItems
  if (data?.portfolio?.name) {
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    breadcrumbItems.edges[1].node.label = data?.portfolio?.name;
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    breadcrumbItems.edges[1].node.link =
      (isDefaultPortfolio && '/portfolio') || `/portfolio/${portfolioKey}`;
  }
  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  breadcrumbItems.edges.push({
    node: {
      id: '',
      label: 'Transaktionen',
      link: `/portfolio/${portfolioKey}/transaktionen`,
      __typename: 'ActiveMenuTrailItem',
    },
    __typename: 'ActiveMenuTrailItemEdge',
  });
  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  breadcrumbItems.edges.push({
    node: {
      id: '',
      label: `${filteredInstruments?.[0]?.mName}`,
      link: '',
      __typename: 'ActiveMenuTrailItem',
    },
    __typename: 'ActiveMenuTrailItemEdge',
  });

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
        <h1 className={styles.Heading}>
          Transaktionen {instrumentKey ? filteredInstruments?.[0]?.mName : ''}
        </h1>
        <div className={styles.SubTitle}>{data?.portfolio?.name || ''}</div>
        <div className={classNames(styles.TopButtonRow, 'hide-on-print')}>
          <Dropdown
            align="right"
            iconTypeLeft="IconThreeDots"
            label="Mehr"
            loading={loading}
          >
            <DropdownItem label="Download CSV-Datei">
              {/* @ts-ignore TODO: TS7031 ->  Binding element 'setIsOpen' implicitly has an 'any' type. */}
              {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
              {({ setIsOpen, label }) => {
                return (
                  <Link
                    className={styles.DropdownViewLink}
                    onClick={(event) => {
                      event.preventDefault();
                      /* @ts-ignore TODO: TS7005 ->  Variable 'buyInstruments' implicitly has an 'any[]' type. */
                      /* @ts-ignore TODO: TS7005 ->  Variable 'sellInstruments' implicitly has an 'any[]' type. */
                      downloadTransactionsCSV(buyInstruments, sellInstruments);
                      setIsOpen(false);
                    }}
                  >
                    <div className={styles.DropdownListItem}>
                      <Icon
                        type="IconArrowDownToSquare"
                        addClass={styles.Icons}
                      ></Icon>
                      <p>{label}</p>
                    </div>
                  </Link>
                );
              }}
            </DropdownItem>
            <DropdownItem label="Drucken">
              {/* @ts-ignore TODO: TS7031 ->  Binding element 'setIsOpen' implicitly has an 'any' type. */}
              {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
              {({ setIsOpen, label }) => {
                return (
                  <Link
                    className={styles.DropdownViewLink}
                    onClick={(event) => {
                      event.preventDefault();
                      printTable();
                      setIsOpen(false);
                    }}
                  >
                    <div className={styles.DropdownListItem}>
                      <Icon type="IconPrint" addClass={styles.Icons}></Icon>
                      <p>{label}</p>
                    </div>
                  </Link>
                );
              }}
            </DropdownItem>
          </Dropdown>
        </div>
        <div className={styles.PortfolioSelectionWrapper}>
          {!loading &&
            Array.isArray(data?.portfolio?.calculatedFields?.instruments) &&
            data?.portfolio?.calculatedFields?.instruments.length > 1 && (
              <Dropdown
                iconTypeRight="IconChevronDown"
                iconTypeRightActive="IconChevronUp"
                variant="secondary"
                size="small"
              >
                <DropdownItem
                  label="Alle Positionen"
                  initActive={!instrumentKey}
                >
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'isActive' implicitly has an 'any' type. */}
                  {({ itemId, label, handleOptionClick, isActive }) => (
                    <Link
                      path={`/portfolio/${portfolioKey}/transaktionen`}
                      className={classNames(
                        styles.DropdownViewLink,
                        styles.FirstItem,
                        { [styles.Active]: isActive },
                      )}
                      onClick={() => {
                        handleOptionClick(itemId);
                      }}
                    >
                      {label}
                    </Link>
                  )}
                </DropdownItem>

                {data?.portfolio?.calculatedFields?.instruments.map(
                  /* @ts-ignore TODO: TS7006 ->  Parameter 'instrument' implicitly has an 'any' type. */
                  (instrument) => (
                    <DropdownItem
                      key={`transactions-item-${instrument.transactionKey}-${instrumentKey}`}
                      label={instrument.mName || instrument.name || ''}
                      initActive={instrument?.instrumentKey === instrumentKey}
                    >
                      {/* @ts-ignore TODO: TS7031 ->  Binding element 'itemId' implicitly has an 'any' type. */}
                      {/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */}
                      {/* @ts-ignore TODO: TS7031 ->  Binding element 'handleOptionClick' implicitly has an 'any' type. */}
                      {/* @ts-ignore TODO: TS7031 ->  Binding element 'isActive' implicitly has an 'any' type. */}
                      {({ itemId, label, handleOptionClick, isActive }) => (
                        <Link
                          key={`dropdown-option-${itemId}`}
                          path={`/portfolio/${portfolioKey}/transaktionen/${
                            instrument?.instrumentKey || ''
                          }`}
                          className={classNames(styles.DropdownViewLink, {
                            [styles.Active]: isActive,
                          })}
                          onClick={() => {
                            handleOptionClick(itemId);
                          }}
                        >
                          {label}
                          <span>{isActive && <Icon type="IconCheck" />}</span>
                        </Link>
                      )}
                    </DropdownItem>
                  ),
                )}
              </Dropdown>
            )}
        </div>
        <div className={styles.MainPortfolioCurrency}>
          {filteredInstruments?.[0]?.currency || null} &nbsp;
        </div>
        {buyInstruments.length > 0 && (
          <>
            <h3 className={styles.Heading3}>Käufe</h3>
            <div
              id="instrument-table-buy"
              className={classNames(styles.TableWrapper, styles.BuyPrint)}
            >
              <Table
                key={`buy-${instrumentKey}`}
                /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'MutableRefObject<boolean>'. */
                isDirtySortTableRef={null}
                component={'buy'}
                data={filteredPortfolioData}
                groupType={'no-grouping'}
                type="transactions-buy"
                tableHeaders={TRANSACTIONS_VIEW_HEADERS}
                location={location}
                origin={PARAGRAPHS_RENDERER_ORIGIN}
              />
            </div>
          </>
        )}
        {sellInstruments.length > 0 && (
          <>
            <h3 className={styles.Heading3}>
              Verkäufe{' '}
              <span
                className={classNames(styles.Total, {
                  [styles.Green]: account > 0,
                  [styles.Red]: account < 0,
                })}
              >
                Total {(account > 1 && '+') || ''}
                {formatPrice(account, data?.portfolio?.type)} CHF
              </span>
            </h3>
            <div
              id="instrument-table-sell"
              className={classNames(styles.TableWrapper, styles.SellPrint)}
            >
              <Table
                key={`sell-${instrumentKey}`}
                /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'MutableRefObject<boolean>'. */
                isDirtySortTableRef={null}
                component={'sell'}
                data={filteredPortfolioData}
                groupType={'no-grouping'}
                type="transactions-sell"
                tableHeaders={TRANSACTIONS_VIEW_HEADERS}
                location={location}
                origin={PARAGRAPHS_RENDERER_ORIGIN}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PortfolioTransaction;
