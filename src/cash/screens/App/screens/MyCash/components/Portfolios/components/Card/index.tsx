import React from 'react';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import { getTrendClass } from '../../../Table/components/helpers';
import Link from '../../../../../../../../../common/components/Link';
import Icon from '../../../../../../components/Icon';
import Skeleton from '../../../../../../components/Skeleton';
import { headerMapping } from '../../../Table/components/headerMapping';
import { portfolioByKeyApolloConfig } from './apolloConfig';
import { ROUTE_PORTFOLIO } from '../../../../../../constants';
import styles from './styles.legacy.css';
import { CardProps } from './typings';

const Card = ({ portfolio }: CardProps) => {
  const { query: portfolioQuery, ...portfolioOptions } =
    portfolioByKeyApolloConfig.options({
      location,
      params: {
        isAuthenticated: 'true',
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        portfolioKey: portfolio?.portfolioKey,
      },
    });

  const { loading, data, error } = useQuery(portfolioQuery, portfolioOptions);

  const totalActualPrice =
    portfolio &&
    headerMapping['currentValue']?.formatter({
      instrument: portfolio,
      value: data?.portfolio?.calculatedFields?.totalActualPrice,
    });
  const totalPaidPrice =
    portfolio &&
    headerMapping['currentValue']?.formatter({
      instrument: portfolio,
      value: data?.portfolio?.calculatedFields?.totalPaidPrice,
    });
  // @ts-ignore
  const totalAccountPlusMinus = headerMapping['accountPlusMinus']?.formatter({
    value: data?.portfolio?.calculatedFields?.totalAccountPlusMinus,
  });
  const totalAccountPercent = headerMapping['accountPercent']?.formatter({
    value: data?.portfolio?.calculatedFields?.totalAccountPercent,
  });

  return (
    <Link
      path={
        (data?.portfolio?.defaultPortfolio && '/portfolio') ||
        `/${ROUTE_PORTFOLIO}/${portfolio?.portfolioKey}`
      }
      className={classNames(
        styles.Wrapper,
        getTrendClass(
          data?.portfolio?.calculatedFields?.totalAccountPercent,
          styles.Positive,
          styles.Negative,
        ),
      )}
    >
      <Skeleton show={loading || !!error} />

      <div
        data-testid="name"
        className={classNames(styles.Name, { [styles.Loading]: loading })}
      >
        {portfolio?.name}
        {loading && ' ...'}
      </div>
      {data && (
        <>
          {data?.portfolio.defaultPortfolio && (
            <div data-testid="stared" className={styles.IconWrapper}>
              <Icon addClass={styles.StarIcon} type="IconStarSolid"></Icon>
            </div>
          )}
          <div className={styles.InnerWrapper}>
            <div className={styles.PriceWrapper}>
              <div className={styles.PriceLable}>Einstand</div>
              <div data-testid="total-paid-price" className={styles.Price}>
                {totalPaidPrice} {data?.portfolio.currency}
              </div>
            </div>
            <div className={styles.PriceWrapper}>
              <div className={styles.PriceLable}>Aktuell</div>
              <div data-testid="actual-price" className={styles.Price}>
                {totalActualPrice} {data?.portfolio.currency}
              </div>
            </div>
            <div
              className={classNames(
                styles.PillWrapper,
                getTrendClass(
                  data?.portfolio.calculatedFields.totalAccountPercent,
                  styles.Positive,
                  styles.Negative,
                ),
              )}
            >
              <span data-testid="account-percent">{totalAccountPercent}</span>|
              <span data-testid="account-plus-minus">
                {totalAccountPlusMinus}
              </span>
            </div>
          </div>
        </>
      )}
    </Link>
  );
};

export default Card;
