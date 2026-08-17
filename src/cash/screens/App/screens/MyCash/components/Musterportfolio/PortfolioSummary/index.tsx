import React, { useState } from 'react';
import classNames from 'classnames';
import {
  formatPercentage,
  formatPrice,
} from '../../../../../components/Highcharts/helpers';
import styles from './styles.legacy.css';

const PortfolioSummaryBox = ({ title = '', price = '', description = '' }) => {
  const [state] = useState<'positive' | 'negative' | 'neutral'>(() => {
    if (description.startsWith('-')) {
      return 'negative';
    } else if (description.startsWith('+')) {
      return 'positive';
    } else {
      return 'neutral';
    }
  });

  const prefix = state === 'positive' ? '+' : '';

  // '\u00A0' --> non-breaking space (&nbsp;)
  return (
    <div className={styles.BoxItem}>
      <span
        className={classNames(
          {
            [styles.Positive]: state === 'positive',
            [styles.Negative]: state === 'negative',
          },
          styles.BoxPrice,
        )}
      >
        {prefix + price || '\u00A0'}
      </span>
      <span
        className={classNames(
          {
            [styles.Positive]: state === 'positive',
            [styles.Negative]: state === 'negative',
          },
          styles.BoxChange,
        )}
      >
        {description || '\u00A0'}
      </span>
      <span className={styles.BoxDescription}>{title || '\u00A0'}</span>
    </div>
  );
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'title' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'portfolio' implicitly has an 'any' type. */
const PortfolioSummary = ({ title, portfolio }) => {
  const currency = portfolio?.currency || '';

  const performancePriceValue =
    portfolio?.calculatedFields?.totalActualPrice -
    portfolio?.calculatedFields?.totalPaidPrice;

  const performancePricePercentage = !isNaN(
    portfolio?.calculatedFields?.totalActualPrice /
      portfolio?.calculatedFields?.totalPaidPrice,
  )
    ? (
        (portfolio?.calculatedFields?.totalActualPrice /
          portfolio?.calculatedFields?.totalPaidPrice) *
          100 -
        100
      ).toFixed(2)
    : '0.00';

  return (
    <div className={styles.PortfolioSummaryWrapper}>
      {title && <h2 className={styles.Title}>{title}</h2>}
      <div className={styles.BoxWrapper}>
        <PortfolioSummaryBox
          title="Aktuell"
          price={`${formatPrice(
            portfolio?.calculatedFields?.totalActualPrice,
          )} ${currency}`}
        />
        <PortfolioSummaryBox
          title="Einstand"
          price={`${formatPrice(
            portfolio?.calculatedFields?.totalPaidPrice,
          )} ${currency}`}
        />
        <PortfolioSummaryBox
          title="Performance"
          description={`${formatPercentage(performancePricePercentage)}%`}
          price={`${formatPrice(performancePriceValue)} ${currency}`}
        />
      </div>
    </div>
  );
};

export default PortfolioSummary;
