import React, { createContext } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import { formatPrice } from '../../../Highcharts/helpers';
import DetailAnalysis from './components/DetailAnalysis';
import Rating from './components/Rating';
import {
  SUBSCRIPTION_TYPE_ANLEGER,
  SUBSCRIPTION_TYPE_BANKING,
  SUBSCRIPTION_TYPE_PROFI,
} from '../../../../constants';
import {
  RATING_CHUNK_PROGRESS_BAR,
  RATING_PROGRESS_BAR,
  RATING_RANGE,
} from './components/Rating/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { GET_AWP_ANALYSER } from './queries';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { AWPAnalyserProps, QueryResult } from './typings';

export const HideRestrictedContent = createContext(true);

const AwpAnalyser = ({ widgetParagraph }: AWPAnalyserProps) => {
  const subscriptions = useSelector<ReduxState, string[]>(
    /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
    ({ auth }) => auth.subscriptions,
  );
  const hasSubscriptions = useSelector<ReduxState, boolean>(
    ({ auth }) => auth.hasSubscriptions || false,
  );
  const isCrawler = useSelector<ReduxState, boolean>(
    ({ route }) => route.isCrawler || false,
  );
  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string | URL'. */
  const url = new URL(widgetParagraph.link.path);
  const mIsin = url.searchParams.get('mIsin');
  const { error, data, loading } = useQuery<QueryResult>(GET_AWP_ANALYSER, {
    variables: { isin: mIsin },
    skip: !mIsin,
  });

  if (loading || error) {
    return <div className={styles.Skeleton}></div>;
  }

  const ratings = data?.integration?.awp?.ratings;

  if (!ratings?.items || ratings?.items.length === 0) {
    return null;
  }

  const numberOfRatings = ratings?.count || 0;
  const sell =
    ratings?.items?.filter((rating) => rating.status === 'sell') || [];
  const buy = ratings?.items?.filter((rating) => rating.status === 'buy') || [];
  const hold =
    ratings?.items?.filter((rating) => rating.status === 'hold') || [];
  const statusPosition = hold.length + buy.length * 2;
  const priceTargets = ratings?.items
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
    ?.map((rating) => parseFloat(rating.priceTarget))
    .filter((price) => !Number.isNaN(price));
  const maxPriceTarget = Math.max(...priceTargets);
  const minPriceTarget = Math.min(...priceTargets);
  const averagePriceTarget =
    priceTargets.reduce((a, b) => a + b, 0) / priceTargets.length;

  const hasValidSubscriptions = (): boolean => {
    if (isCrawler) {
      return true;
    }

    if (!hasSubscriptions) {
      return false;
    }

    return [
      SUBSCRIPTION_TYPE_ANLEGER,
      SUBSCRIPTION_TYPE_PROFI,
      SUBSCRIPTION_TYPE_BANKING,
    ].some((abo) => subscriptions.includes(abo));
  };

  return (
    <HideRestrictedContent.Provider value={!hasValidSubscriptions()}>
      <p className={styles.Title}>AWP Analyser</p>
      <div className={grid.Row}>
        <div
          className={classNames(
            grid.ColXs24,
            grid.ColMd12,
            styles.RatingWrapper,
          )}
        >
          <p className={styles.SubTitle}>
            Rating ({numberOfRatings} Analysten)
          </p>
          <div className={styles.RangeRatingWrapper}>
            <Rating
              component={RATING_RANGE}
              rating={statusPosition}
              max={numberOfRatings * 2}
            />
          </div>

          <div className={styles.ProgressBarWrapper}>
            <div className={styles.ProgressBarItem}>
              <div className={styles.Label}>Verkauf</div>
              <div className={styles.RateLabel}>{sell.length}</div>
              <div className={styles.RateWrapper}>
                <Rating
                  component={RATING_PROGRESS_BAR}
                  max={numberOfRatings}
                  rating={sell.length}
                  fill="red"
                />
              </div>
            </div>
            <div className={styles.ProgressBarItem}>
              <div className={styles.Label}>Neutral</div>
              <div className={styles.RateLabel}>{hold.length}</div>
              <div className={styles.RateWrapper}>
                <Rating
                  component={RATING_PROGRESS_BAR}
                  max={numberOfRatings}
                  rating={hold.length}
                />
              </div>
            </div>
            <div className={styles.ProgressBarItem}>
              <div className={styles.Label}>Kauf</div>
              <div className={styles.RateLabel}>{buy.length}</div>
              <div className={styles.RateWrapper}>
                <Rating
                  component={RATING_PROGRESS_BAR}
                  max={numberOfRatings}
                  rating={buy.length}
                  fill="green"
                />
              </div>
            </div>
          </div>

          <div className={styles.ProgressBarWrapper}>
            <p className={styles.SubTitle}>
              Kursziel ({numberOfRatings} Analysten)
            </p>
            {(averagePriceTarget > 0 && (
              <>
                <p className={styles.TextAnalysis}>
                  {'Das durchschnittliche Kursziel liegt bei %1 mit der höchsten Schätzung von %2 und der niedrigsten von %3.'
                    .replace('%1', `${formatPrice(averagePriceTarget)} CHF`)
                    .replace('%2', `${formatPrice(maxPriceTarget)} CHF`)
                    .replace('%3', `${formatPrice(minPriceTarget)} CHF`)}
                </p>
                <Rating
                  component={RATING_CHUNK_PROGRESS_BAR}
                  min={minPriceTarget}
                  max={maxPriceTarget}
                  average={averagePriceTarget}
                />
              </>
            )) || (
              <p>
                Für dieses Instrument wurden noch keine Kursziele angegeben.
              </p>
            )}
          </div>
        </div>
        <div className={classNames(grid.ColXs24, grid.ColMd12)}>
          <p className={classNames(styles.SubTitle, styles.SubTitleDetail)}>
            Detailanalysen
          </p>
          <DetailAnalysis sell={sell} buy={buy} hold={hold} />
          {(!hasValidSubscriptions() && (
            <div className="piano-template-awp-analyser"></div>
          )) ||
            null}
        </div>
      </div>
    </HideRestrictedContent.Provider>
  );
};

export default AwpAnalyser;
