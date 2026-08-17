import React, { useState } from 'react';
import classNames from 'classnames';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import {
  DATE_FORMAT_DEFAULT,
  formatDate,
} from '../../../../../shared/helpers/dateTimeElapsed';
import MinistageTeaser from '../Paragraphs/components/MinistageParagraph/components/MinistageTeaser';
import Column from './components/Column';
import Icon from '../Icon';
import {
  SUBSCRIPTION_TYPE_ANLEGER,
  SUBSCRIPTION_TYPE_BANKING,
  SUBSCRIPTION_TYPE_PROFI,
} from '../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { INTEGRATION_THE_SCREENER } from './queries';
import styles from './styles.legacy.css';
import { QueryResult, TheScreenerProps } from './typings';

const TheScreener = ({ stockId, currency }: TheScreenerProps) => {
  const [showInfoText, setShowInfoText] = useState(false);
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

  const validSubscriptions = (): boolean => {
    if (!hasSubscriptions) {
      return false;
    }

    return [
      SUBSCRIPTION_TYPE_ANLEGER,
      SUBSCRIPTION_TYPE_PROFI,
      SUBSCRIPTION_TYPE_BANKING,
    ].some((abo) => subscriptions.includes(abo));
  };

  const { error, data, loading } = useQuery<QueryResult>(
    INTEGRATION_THE_SCREENER,
    {
      variables: { id: stockId, mCur: currency, type: 'TheScreener' },
    },
  );

  const keyPoints = data?.integration?.object?.keyPoints;

  if (!loading && !data) {
    // On pages without screener data clean up widget
    return null;
  }

  if (loading || error) {
    return <div className={styles.Skeleton}></div>;
  }

  return (
    <>
      <div className={styles.Wrapper}>
        <p className={styles.Title}>
          theScreener keyPoints
          <Icon
            type={'IconCircleInfo'}
            addClass={styles.InfoIcon}
            onClick={() => setShowInfoText(!showInfoText)}
          />
        </p>
        <p
          className={classNames(styles.Info, { [styles.Hide]: !showInfoText })}
        >
          {`theScreener keyPoints ist eine kompakte Zusammenfassung der wichtigsten
        positiven und negativen Anlagefakten für mehr als 6'000 Aktien weltweit.
        Basierend auf einem umfangreichen und stetig wachsenden Satz
        qualitätsgeprüfter Daten bieten die keyPoints einen "signifikanten
        Mehrwert" für alle Anleger, die intelligente Daten für ihre
        Anlageentscheidungen suchen.`}
        </p>
        <div className={styles.Columns}>
          <Column
            hasValidSubscription={validSubscriptions()}
            isCrawler={isCrawler}
            type="pro"
            points={[
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              keyPoints?.keyPointPos1,
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              keyPoints?.keyPointPos2,
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              keyPoints?.keyPointPos3,
            ]}
          />
          <Column
            hasValidSubscription={validSubscriptions()}
            isCrawler={isCrawler}
            type="contra"
            points={[
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              keyPoints?.keyPointNeg1,
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              keyPoints?.keyPointNeg2,
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              keyPoints?.keyPointNeg3,
            ]}
          />
        </div>
        <div className={styles.Footer}>
          <span>
            Diese Informationen beruhen auf Auswertungen von theScreener.com
          </span>
          <span>
            Datum der Analyse:{' '}
            {formatDate(
              /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
              parseInt(keyPoints?.analysisDate) * 1000,
              DATE_FORMAT_DEFAULT,
            )}
          </span>
        </div>
      </div>
      {(!validSubscriptions() && (
        <div className={styles.Ministage}>
          <MinistageTeaser
            ministageTeaser={{
              headline: 'Sie wollen bessere Anlageentscheidungen treffen?',
              lead: 'Erfahren Sie mehr mit den KeyPoints',
              link: {
                label: 'Anleger-Abo Details',
                path: '/services/boersenabo',
              },
            }}
          />
        </div>
      )) ||
        null}
    </>
  );
};

export default TheScreener;
