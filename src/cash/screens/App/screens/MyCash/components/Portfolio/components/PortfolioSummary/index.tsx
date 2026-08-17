import React from 'react';
import classNames from 'classnames';
import {
  formatPercentage,
  formatPrice,
} from '../../../../../../components/Highcharts/helpers';
import TradingTeaser from '../../../../../../components/Widgets/components/TradingTeaser';
import styles from './styles.legacy.css';
import { PortfolioSummaryProps } from './typings';

const PortfolioSummary = ({ portfolio, depotPrice }: PortfolioSummaryProps) => {
  if (!portfolio) {
    return null;
  }
  const calculatedFields = portfolio.calculatedFields;
  const isPerformancePositive =
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
    Math.sign(parseFloat(calculatedFields?.totalAccountPercent)) > 0;

  return (
    <div className={styles.SummaryGridWrapper}>
      <div className={styles.TradingTeaserWrapper}>
        <TradingTeaser depotPrice={depotPrice} />
      </div>
      <div className={styles.SummaryWrapper}>
        <p className={styles.Title}>Zusammenfassung</p>
        <div className={styles.ContentRow}>
          <p>
            Einstand{' '}
            {portfolio.currency && <span>{`(${portfolio.currency})`}</span>}
          </p>
          {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
          <p>{formatPrice(calculatedFields.totalPaidPrice)}</p>
        </div>
        <div className={styles.ContentRow}>
          <p>Aktuell</p>
          {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
          {/* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */}
          <p>{formatPrice(calculatedFields.totalActualPrice, 'Value')}</p>
        </div>
        <div className={styles.ContentRow}>
          <p>+/-</p>
          <p
            className={classNames({
              [styles.Positive]: isPerformancePositive,
              [styles.Negative]: !isPerformancePositive,
            })}
          >
            {/* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */}
            {formatPrice(calculatedFields.totalAccountPlusMinus, 'Value')}
          </p>
        </div>
        <div className={classNames(styles.ContentRow)}>
          <p>+/-%</p>
          <p
            className={classNames({
              [styles.Positive]: isPerformancePositive,
              [styles.Negative]: !isPerformancePositive,
            })}
          >
            {formatPercentage(calculatedFields?.totalAccountPercent)}%
          </p>
        </div>
        <div className={styles.ContentRow}>
          <p>Flüssige Mittel</p>
          {/* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */}
          <p>{formatPrice(portfolio?.calculatedFields?.cash, 'Value')}</p>
        </div>
        <div className={styles.ContentRow}>
          <p>Gesamtwert</p>
          <p>
            {formatPrice(
              portfolio?.calculatedFields?.cashAccountTotal,
              /* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */
              'Value',
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
