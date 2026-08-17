import React, { useRef } from 'react';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import {
  DATE_FORMAT_TIME,
  formatDate,
} from '../../../../../../../shared/helpers/dateTimeElapsed';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import useInView from '../../../../../../../shared/hooks/useInView';
import Link from '../../../../../../../common/components/Link';
import Icon from '../../../Icon';
import { useSSRContext } from '../../../../../../../common/components/SSRContext';
import { UBS_TRENDRADAR_PATH } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { GET_TREND_RADAR } from './queries';
import styles from './styles.legacy.css';
import {
  QueryResult,
  QueryWrapperProps,
  TrendProps,
  TrendRadarProps,
} from './typings';

const TENDENCY = {
  '-1': 'short',
  '1': 'long',
};

const TIME_HORIZON = {
  '1': 'kurzfristig',
  '2': 'mittelfristig',
  '3': 'langfristig',
};

const NoTrendRadar = () => (
  <div className={styles.InnerTitle}>Keine Signale zum Titel</div>
);

const Trend = ({ object, mValor, mSymb }: TrendProps) => {
  const { setRef, isInView, entry } = useInView({
    rootMargin: '200px',
    triggerOnce: true,
  });
  const wasTriggered = useRef(false);
  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  const date = formatDate(object.timeSort * 1000) || '';
  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  const time = formatDate(object.timeSort * 1000, DATE_FORMAT_TIME) || '';

  const quotePotential = object.breakout?.[0]?.quotePotential;

  const distPercentBreakoutFrom: any =
    (quotePotential &&
      quotePotential?.[quotePotential.length - 1]?.distPercentBreakoutFrom) ||
    null;

  let isPositive = true;

  if (
    distPercentBreakoutFrom &&
    parseFloat((100 * distPercentBreakoutFrom) as any) < 0
  ) {
    isPositive = false;
  }

  if (isInView && wasTriggered?.current === false) {
    wasTriggered.current = true;
    tealiumTrackEvent({
      type: 'link',
      payload: {
        event_name: 'integration_impression',
        integration_action: 'Impression',
        integration_name: 'UBS TrendRadar',
        integration_sponsor: 'UBS',
        event_trigger: 'custom',
        integration_valor: mValor,
        integration_symbol: mSymb,
        integration_element: 'Widget',
      },
    });
  }

  return (
    /* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
    <div ref={setRef}>
      {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
      <div className={styles.InnerTitle}>{object.patternType.name}</div>

      {object?.image && (
        <Link
          target="_blank"
          path={UBS_TRENDRADAR_PATH.replace('[signalId]', `${object.id}`)}
          onClick={(event) => {
            event.preventDefault();
            tealiumTrackEvent({
              type: 'link',
              payload: {
                event_name: 'integration_click',
                integration_action: 'Click',
                integration_name: 'UBS TrendRadar',
                integration_sponsor: 'UBS',
                event_trigger: 'custom',
                integration_valor: mValor,
                integration_symbol: mSymb,
                integration_element: 'chart',
              },
            });
            window.open(
              entry.target.getElementsByTagName('a')[0].href,
              '_blank',
            );
          }}
        >
          <img
            className={styles.Image}
            src={`${object.image}?width=610&height=317`}
            alt="UBS TrendRadar Bild"
          />
        </Link>
      )}

      <div className={styles.List}>
        <span className={styles.Title}>Tendenz</span>
        <span className={styles.Value}>
          {/* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */}
          {/* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */}
          {TENDENCY[object.breakout?.[0]?.direction] || ''}
        </span>
      </div>

      <div className={styles.List}>
        <span className={styles.Title}>Zeithorizont</span>
        <span className={styles.Value}>
          {/* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */}
          {/* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */}
          {TIME_HORIZON[object.timeHorizon] || ''}
        </span>
      </div>

      <div className={styles.List}>
        <span className={styles.Title}>Renditeerwartung</span>
        {(distPercentBreakoutFrom && (
          <span
            className={classNames(styles.Value, {
              [styles.Positive]: isPositive,
              [styles.Negative]: !isPositive,
            })}
          >
            {parseFloat((100 * distPercentBreakoutFrom) as any).toFixed(2)}%
          </span>
        )) ||
          null}
      </div>

      <div className={styles.List}>
        <span className={styles.Title}>Zeit</span>
        <span className={styles.Value}>
          {date} {time}
        </span>
      </div>

      <Link
        target="_blank"
        path={UBS_TRENDRADAR_PATH.replace('[signalId]', `${object.id}`)}
        onClick={(event) => {
          event.preventDefault();
          tealiumTrackEvent({
            type: 'link',
            payload: {
              event_name: 'integration_click',
              integration_action: 'Click',
              integration_name: 'UBS TrendRadar',
              integration_sponsor: 'UBS',
              event_trigger: 'custom',
              integration_valor: mValor,
              integration_symbol: mSymb,
              integration_element: 'link',
            },
          });
          window.open(entry.target.getElementsByTagName('a')[0].href, '_blank');
        }}
      >
        <p className={styles.DetailLink}>
          <span>Signal Details</span>
          <Icon type="IconArrowRightUpFromSquare" />
        </p>
      </Link>
    </div>
  );
};

const QueryWrapper = ({ mIsin }: QueryWrapperProps) => {
  const { data, loading } = useQuery<QueryResult>(GET_TREND_RADAR, {
    variables: {
      mIsin: [mIsin],
      limit: 1,
    },
  });

  if (loading) {
    return null;
  }

  const object = data?.integration?.solvians?.trendRadar?.[0];

  if (!object) {
    return <NoTrendRadar />;
  }

  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
  return <Trend object={object} mValor={object.mValor} mSymb={object.mSymb} />;
};

const TrendRadar = ({ widgetParagraph }: TrendRadarProps) => {
  const { isSSR } = useSSRContext();
  const path = widgetParagraph?.link?.path;
  const url =
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    (path && path.startsWith('/') && new URL(path, global.locationOrigin)) ||
    (path && new URL(path)) ||
    null;
  const mIsin = url?.searchParams?.get('mIsin');

  return (
    <div>
      <p className={styles.HeaderTitle}>UBS TrendRadar</p>

      {(!isSSR && mIsin && !__TESTING__ && <QueryWrapper mIsin={mIsin} />) || (
        <NoTrendRadar />
      )}
    </div>
  );
};

export default TrendRadar;
