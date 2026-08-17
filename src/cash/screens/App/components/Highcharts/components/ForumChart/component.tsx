import React from 'react';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import {
  DATE_FORMAT_FULL_TIME,
  formatDate,
} from '../../../../../../../shared/helpers/dateTimeElapsed';
import { formatPrice } from '../../helpers';
import { roundToTwo, trendClass } from './helpers';
import Icon from '../../../Icon';
import { apolloConfig } from './apolloConfig';
import styles from './styles.legacy.css';
import { ForumChartProps, QueryResult } from './typings';

const TRENDSTYLES = {
  red: styles.Red,
  green: styles.Green,
  up: styles.Up,
  down: styles.Down,
};

const ForumChart = ({ location }: ForumChartProps) => {
  const currentTimestamp = Date.now();

  const queryConfig = apolloConfig.options({
    location: location,
    params: { path: location?.query?.path },
  });

  const { data, error } = useQuery<QueryResult>(queryConfig.query, {
    variables: queryConfig.variables,
  });

  if (!data || error) {
    return null;
  }

  const result = data.getFullquotePage;

  return (
    <div className={styles.Wrapper}>
      <div>
        <p className={styles.Title}>
          {result.title}
          <Icon
            addClass={trendClass(result.iNetVperprV, TRENDSTYLES, true)}
            type={'IconArrowRight'}
          />
        </p>
        <p className={styles.Info}>
          Valor: {result.mValor} / Symbol {result.mSymb}
        </p>
        <p className={styles.Info}>{`${formatDate(
          currentTimestamp,
        )} - ${formatDate(currentTimestamp, DATE_FORMAT_FULL_TIME)}`}</p>
        <p className={styles.Info}>Sie erhalten verzögerte Kurse</p>
      </div>
      <div>
        <p className={styles.Value}>
          {formatPrice(result.lval)} {result.mCur}
        </p>
        <p
          className={classNames(
            styles.Value,
            trendClass(result.iNetVperprV, TRENDSTYLES),
          )}
        >
          {parseFloat(result.iNetVperprV) > 0 ? '+' : ''}
          {roundToTwo(result.iNetVperprVPr)}%
        </p>
        <p
          className={classNames(
            styles.Value,
            trendClass(result.iNetVperprV, TRENDSTYLES),
          )}
        >
          {parseFloat(result.iNetVperprV) > 0 ? '+' : ''}
          {roundToTwo(result.iNetVperprV)}
        </p>
      </div>
    </div>
  );
};

export default ForumChart;
