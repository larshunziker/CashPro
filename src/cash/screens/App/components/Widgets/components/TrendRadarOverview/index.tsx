import React, { MouseEvent, useRef } from 'react';
import { useQuery } from '@apollo/client';
import {
  DATE_FORMAT_TIME,
  formatDate,
} from '../../../../../../../shared/helpers/dateTimeElapsed';
import Link from '../../../../../../../common/components/Link';
import Icon from '../../../Icon';
import useInView from '../../../../../../../shared/hooks/useInView';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import { TENDENCY, UBS_TRENDRADAR_PATH } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { GET_TREND_RADAR_OVERVIEW } from './queries';
import styles from './styles.legacy.css';
import { QueryResult, TrendRadarOverviewProps } from './typings';

/* @ts-ignore TODO: TS7006 ->  Parameter 'list' implicitly has an 'any' type. */
const sortData = (list) => {
  const sortedList =
    list?.length > 0 &&
    /* @ts-ignore TODO: TS7006 ->  Parameter 'a' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'b' implicitly has an 'any' type. */
    list?.sort((a, b) => {
      if (!b?.timeSort || a?.timeSort < b?.timeSort) {
        return 1;
      }

      if (!a?.timeSort || a?.timeSort > b?.timeSort) {
        return -1;
      }
      return 0;
    });
  return sortedList;
};

const TrendRadarOverview = ({ widgetParagraph }: TrendRadarOverviewProps) => {
  const { setRef, isInView } = useInView({
    rootMargin: '200px',
    triggerOnce: true,
  });
  const wasTriggered = useRef(false);
  const path = widgetParagraph?.link?.path;
  const url =
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    (path && path.startsWith('/') && new URL(path, global.locationOrigin)) ||
    (path && new URL(path)) ||
    null;
  const mIsin = url?.searchParams?.get('mIsin')?.split(',') || [];

  const { data, error, loading } = useQuery<QueryResult>(
    GET_TREND_RADAR_OVERVIEW,
    {
      variables: {
        mIsin: mIsin,
        limit: 10,
      },
      skip: mIsin.length === 0,
    },
  );

  const dataCopy = JSON.parse(JSON.stringify(data || null));

  if (error || loading || !dataCopy) {
    return <div className={styles.Skeleton}></div>;
  }

  const sortedData = sortData(
    dataCopy?.integration?.solvians?.trendRadar || [],
  );

  if (isInView && wasTriggered?.current === false) {
    wasTriggered.current = true;
    tealiumTrackEvent({
      type: 'link',
      payload: {
        event_name: 'integration_impression',
        integration_action: 'Impression',
        integration_name: 'UBS TrendRadar Signals',
        integration_sponsor: 'UBS',
        event_trigger: 'custom',
        integration_element: 'Widget',
      },
    });
  }

  return (
    /* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
    <div ref={setRef}>
      <p className={styles.HeaderTitle}>UBS TrendRadar Signals</p>
      <table className={styles.Table}>
        <thead>
          <tr className={styles.Heading}>
            <th>Basiswert</th>
            <th>Signal</th>
            <th>Tendenz</th>
            <th>Datum</th>
            <th className={styles.HideOnMobile}></th>
          </tr>
        </thead>
        <tbody>
          {/* @ts-ignore TODO: TS7006 ->  Parameter 'trendRadar' implicitly has an 'any' type. */}
          {sortedData?.map?.((trendRadar) => {
            const date = formatDate(trendRadar?.timeSort * 1000) || '';
            const time =
              formatDate(trendRadar.timeSort * 1000, DATE_FORMAT_TIME) || '';
            return (
              <tr key={trendRadar.id}>
                <td>
                  <Link className={styles.Link} path={trendRadar?.fullquoteUri}>
                    {trendRadar?.instrument?.name}
                  </Link>
                </td>
                <td>{trendRadar?.patternType?.name}</td>
                {/* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ '-1' */}
                <td>{TENDENCY[trendRadar?.breakout[0]?.direction]}</td>
                <td>
                  {date} {time}
                </td>
                <td className={styles.HideOnMobile}>
                  <Link
                    className={styles.Link}
                    path={UBS_TRENDRADAR_PATH.replace(
                      '[signalId]',
                      `${trendRadar.id}`,
                    )}
                    onClick={(event: MouseEvent<HTMLLinkElement>) => {
                      event.preventDefault();
                      tealiumTrackEvent({
                        type: 'link',
                        payload: {
                          event_name: 'integration_click',
                          integration_action: 'Click',
                          integration_name: 'UBS TrendRadar Signals',
                          integration_sponsor: 'UBS',
                          event_trigger: 'custom',
                          integration_fullquoteUri: trendRadar.fullquoteUri,
                          integration_element: 'chart',
                        },
                      });
                      (window.open(
                        UBS_TRENDRADAR_PATH.replace(
                          '[signalId]',
                          `${trendRadar.id}`,
                        ),
                      ),
                        '_blank');
                    }}
                  >
                    Signal Details
                    <span className={styles.Icon}>
                      <Icon type="IconArrowRightUpFromSquare" />
                    </span>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TrendRadarOverview;
