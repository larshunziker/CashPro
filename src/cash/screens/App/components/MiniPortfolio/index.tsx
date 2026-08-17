import React, { useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import raf from 'raf';
import { useStableNavigate } from '../../../../../shared/hooks/useStableNavigateContext';
import { tealiumTrackEvent } from '../../../../../shared/helpers/tealium';
import {
  formatPercentage,
  formatPrice,
} from '../../components/Highcharts/helpers';
import authStateSelector from '../../../../../shared/selectors/authStateSelector';
import useRaschRouterLocation from '../../../../../shared/hooks/useRaschRouterLocation';
import Link from '../../../../../common/components/Link';
import ButtonWithLoading from '../ButtonWithLoading';
import Icon from '../Icon';
import { useSSRContext } from '../../../../../common/components/SSRContext';
import { portfolioCreate } from '../PortfolioManagementForm';
import { portfolioScreenApolloConfig } from '../../screens/MyCash/components/Portfolio/apolloConfig';
import { miniPortfolioApolloConfig } from './apolloConfig';
import Tooltip from '../Tooltip';
import { useLocalStorage } from '../../../../shared/hooks/useLocalStorage';
import {
  calculateDepotPrice,
  getTooltipTextByDepotPrice,
} from '../Widgets/components/TradingTeaser/helpers';
import { MINI_WATSCHLIST_ID } from '../MiniWatchlist/constants';
import { STATUS_PAGE_ORIGIN } from '../../screens/StatusPage/components/StatusSubpage/constants';
import { ROUTE_PORTFOLIO } from '../../constants';
import styles from './styles.legacy.css';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../assets/styles/variables.legacy.css'. '/Users/bhs/code/work/rasch-st */
import variables from '../../assets/styles/variables.legacy.css';

const MiniPortfolio = ({ origin = '' }) => {
  const isStatusPage = origin === STATUS_PAGE_ORIGIN;
  const miniPortfolioRef = useRef(null);
  const [showAllProps, setShowAllProps] = useState(isStatusPage || false);
  const navigate = useStableNavigate();
  const [lastTimeTooltipClosed, setLastTimeTooltipClosed] = useLocalStorage(
    'mini-portfolio__tooltip-last-time-closed',
    0,
  );

  const isWithinLastThreeDays = useMemo(() => {
    const threeDays = 60 * 60 * 24 * 3; // 3 days in seconds
    const now = new Date().getTime() / 1000; // now in seconds

    return now - lastTimeTooltipClosed <= threeDays;
  }, [lastTimeTooltipClosed]);

  const location = useRaschRouterLocation();
  const { isSSR } = useSSRContext();
  const isAuthenticated = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => authStateSelector(state).isAuthenticated,
  );
  const { query: portfolioQuery, ...portfolioOptions } =
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
    refetch: refetchAll,
  } = useQuery(portfolioQuery, portfolioOptions);
  const allPortfolios = data?.portfolios?.items || [];
  const defaultPortfolio = allPortfolios?.find(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'portfolio' implicitly has an 'any' type. */
    (portfolio) => portfolio.defaultPortfolio === true,
  );

  const { query, ...options } = miniPortfolioApolloConfig.options({
    location,
    params: {
      portfolioKey: defaultPortfolio?.portfolioKey,
    },
  });

  const {
    data: defaultPortfolioData,
    error,
    loading: defaultPortfolioLoading,
    refetch,
  } = useQuery(query, options);

  const miniPortfolioLoading = loading || defaultPortfolioLoading;
  const defaultPortfolioDataCopy =
    (defaultPortfolioData &&
      JSON.parse(JSON.stringify(defaultPortfolioData))) ||
    null;

  if (isSSR || !isAuthenticated || miniPortfolioLoading) {
    return null;
  }

  /* @ts-ignore TODO: TS2774 ->  This condition will always return true since this function is always defined. Did you mean to call it instead? */
  if (refetch && refetchAll) {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.MiniPortfolioRefetch = () => {
      refetchAll().then(() => {
        raf(() => {
          refetch();
        });
      });
    };
  }

  const itemCount = defaultPortfolioDataCopy?.portfolio?.instrumentCount || 0;

  const {
    totalPaidPrice,
    totalActualPrice,
    totalAccountPlusMinus,
    totalAccountPercent,
    cash,
    cashAccountTotal,
  } = defaultPortfolioDataCopy?.portfolio?.calculatedFields || {};

  const accountPlusMinus = formatPrice(totalAccountPlusMinus);
  const accountPercent = formatPercentage(totalAccountPercent);

  const portfolioCurrency =
    defaultPortfolioDataCopy?.portfolio?.currency || '...';
  const isPerformancePositive =
    Math.sign(parseFloat(totalAccountPlusMinus)) > 0;

  const promoUrlTrading =
    'https://www.cash.ch/online-trading?promo_name=cta_button&promo_position=portfolio';

  return (
    <div
      ref={miniPortfolioRef}
      className={classNames([
        styles.Wrapper,
        { [styles.DetailsOpen]: showAllProps },
      ])}
    >
      {!isWithinLastThreeDays && (
        <div className={styles.TitleWrapper}>
          <Tooltip
            origin="mini-portfolio"
            content={`${getTooltipTextByDepotPrice(
              calculateDepotPrice(cashAccountTotal),
            )}<br />
              <a href="${promoUrlTrading}" target="_blank">
                <b>Mehr erfahren ...</b>
              </a>`}
            openOnInit={true}
            closeWithClickOutside={true}
            onClose={() =>
              setLastTimeTooltipClosed(new Date().getTime() / 1000)
            }
            TooltipIcon={
              <Link
                path={`/${ROUTE_PORTFOLIO}`}
                onClick={() => {
                  tealiumTrackEvent({
                    type: 'link',
                    payload: {
                      event_name: 'portfolio_open',
                      event_category: 'portfolio',
                      event_action: 'portfolio_create',
                      portfolio_key: defaultPortfolio?.portfolioKey,
                      from: 'mini_portfolio',
                    },
                  });
                }}
                className={styles.TooltipLink}
              >
                <Icon type="IconPieChart" addClass={styles.Icon} />
              </Link>
            }
          />
          <Link
            path={`/${ROUTE_PORTFOLIO}`}
            onClick={() => {
              tealiumTrackEvent({
                type: 'link',
                payload: {
                  event_name: 'portfolio_open',
                  event_category: 'portfolio',
                  event_action: 'portfolio_create',
                  portfolio_key: defaultPortfolio?.portfolioKey,
                  from: 'mini_portfolio',
                },
              });
            }}
          >
            <span className={styles.Title}>
              {defaultPortfolio?.name || 'Mein Portfolio'}
            </span>
          </Link>
        </div>
      )}
      {isWithinLastThreeDays && (
        <Link
          path={`/${ROUTE_PORTFOLIO}`}
          onClick={() => {
            tealiumTrackEvent({
              type: 'link',
              payload: {
                event_name: 'portfolio_open',
                event_category: 'portfolio',
                event_action: 'portfolio_create',
                portfolio_key: defaultPortfolio?.portfolioKey,
                from: 'mini_portfolio',
              },
            });
          }}
          className={styles.TitleWrapper}
        >
          <Icon type="IconPieChart" addClass={styles.Icon} />
          <span className={styles.Title}>
            {defaultPortfolio?.name || 'Mein Portfolio'}
          </span>
        </Link>
      )}
      {!!error && !defaultPortfolioDataCopy && (
        <div>
          <p className={styles.WelcomeText}>
            Aufgrund einer technischen Störung zeigen wir im Moment
            unvollständige Daten an. Wir bedauern diese Umstände und bedanken
            uns für Ihr Verständnis.
          </p>
        </div>
      )}
      {!defaultPortfolioDataCopy && !error && (
        <>
          <p className={styles.WelcomeText}>
            Das Erstellen eines Portfolios ist der einfachste Weg, über die von
            Ihnen verfolgten Aktien auf dem Laufenden zu bleiben. Das Beste ist,
            es ist kostenlos.
          </p>
          <ButtonWithLoading
            variant="primary"
            size="big"
            onClick={(event) => {
              event.preventDefault();
              portfolioCreate({
                /* @ts-ignore TODO: TS2322 ->  Type 'NavigateFunction' is not assignable to type 'null | undefined'. */
                navigate,
                origin: 'mini_portfolio',
              });
            }}
          >
            <span>Portfolio anlegen</span>
          </ButtonWithLoading>
        </>
      )}
      {defaultPortfolioDataCopy && itemCount === 0 && (
        <>
          <p className={styles.WelcomeText}>
            Beginnen Sie, Instrumente{' '}
            <Link
              path={`/${ROUTE_PORTFOLIO}`}
              onClick={() => {
                tealiumTrackEvent({
                  type: 'link',
                  payload: {
                    event_name: 'portfolio_open',
                    event_category: 'portfolio',
                    event_action: 'portfolio_open',
                    portfolio_key: defaultPortfolio?.portfolioKey,
                    from: 'mini_portfolio',
                  },
                });
              }}
              className={styles.Link}
            >
              <span>zu Ihrem Portfolio</span>
            </Link>{' '}
            hinzuzufügen. Sie können diese direkt z.B. aus der SMI Kursliste
            oder über die Detail-Ansichten hinzufügen. Oder verwenden Sie das
            folgende Suchfeld um direkt zu suchen.
          </p>
        </>
      )}
      {defaultPortfolioDataCopy && itemCount > 0 && !error && (
        <>
          <p className={styles.Currency}>{portfolioCurrency}</p>
          <div className={styles.RowWrapper} key={totalPaidPrice}>
            <div className={styles.RowTitle}>Einstand</div>
            <div className={styles.RowValueBold}>
              {formatPrice(totalPaidPrice)}
            </div>
          </div>

          <div className={styles.RowWrapper} key={totalActualPrice}>
            <div className={styles.RowTitle}>Aktuell</div>
            <div className={styles.RowValueBold}>
              {formatPrice(totalActualPrice)}
            </div>
          </div>

          <div className={styles.RowWrapper} key={totalAccountPlusMinus}>
            <div className={classNames([styles.SpaceBetween, styles.RowTitle])}>
              <span>+/-</span>
              <span>+/-%</span>
            </div>
            <div
              className={classNames([
                styles.RowValue,
                styles.SpaceBetween,
                {
                  [styles.Positive]: isPerformancePositive,
                  [styles.Negative]: !isPerformancePositive,
                },
              ])}
            >
              <span>{accountPlusMinus}</span>
              <span>{accountPercent}%</span>
            </div>
          </div>
          {!isStatusPage && (
            <div className={styles.ButtonWrapper}>
              <ButtonWithLoading
                onClick={() => {
                  setShowAllProps(!showAllProps);
                  raf(() => {
                    // set max height on mini-watchlist id
                    const miniWatchlist =
                      document.getElementById(MINI_WATSCHLIST_ID);
                    if (miniWatchlist) {
                      const portfolioHeight =
                        /* @ts-ignore TODO: TS2339 ->  Property 'offsetHeight' does not exist on type 'never'. */
                        miniPortfolioRef.current?.offsetHeight;
                      // 150px are some paddings and margins
                      miniWatchlist.style.maxHeight = `calc(100vh - (${portfolioHeight}px + 150px + ${variables.headerHeightXl} ))`;
                    }
                  });
                  tealiumTrackEvent({
                    type: 'link',
                    payload: {
                      event_name: `mini_portfolio_${
                        (!showAllProps && 'expanded') || 'closed'
                      }`,
                      event_category: 'mini_portfolio',
                      event_action: `mini_portfolio_${
                        (!showAllProps && 'expanded') || 'closed'
                      }`,
                      portfolio_key: defaultPortfolio?.portfolioKey,
                      from: 'mini_portfolio',
                    },
                  });
                }}
                variant="tertiary"
                ariaLabel={showAllProps ? 'Weniger Details' : 'Mehr Details'}
                type="button"
                size="small"
                tabIndex={-1}
                iconTypeRight={
                  (showAllProps && 'IconChevronUp') || 'IconChevronDown'
                }
              >
                <span>{showAllProps ? 'Weniger Details' : 'Mehr Details'}</span>
              </ButtonWithLoading>
            </div>
          )}

          {showAllProps && (
            <>
              <div className={styles.RowWrapper} key={cash}>
                <div className={styles.RowTitle}>Flüssige Mittel</div>
                <div className={styles.RowValue}>{formatPrice(cash)}</div>
              </div>

              <div className={styles.RowWrapper} key={cashAccountTotal}>
                <div className={styles.RowTitle}>Gesamtwert</div>
                <div className={styles.RowValue}>
                  {formatPrice(cashAccountTotal)}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MiniPortfolio;
