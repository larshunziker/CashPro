import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  DATE_FORMAT_FULL_TIME,
  DATE_FORMAT_WITH_TIME_FULL,
  formatDate,
} from '../../../../../../../shared/helpers/dateTimeElapsed';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import { formatPrice } from '../../../Highcharts/helpers';
import authStateSelector from '../../../../../../../shared/selectors/authStateSelector';
import { useTimeSeriesData } from '../../../../../../shared/hooks/useTimeSeriesData';
import Icon from '../../../Icon';
import styles from './styles.legacy.css';
import { TimeseriesProps } from './typings';

const Timeseries = ({ widgetParagraph }: TimeseriesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const path = widgetParagraph?.link?.path;
  const url = path ? new URL(path) : null;
  const listingKey = url?.searchParams?.get('listingKey');
  const scGrouped = url?.searchParams?.get('scGrouped');

  const isRealTimeUser = useSelector(
    (state: ReduxState) => authStateSelector(state).realtime,
  );

  const {
    data: timeseries,
    loading,
    error,
  } = useTimeSeriesData({
    listingKey,
    pollInterval: isRealTimeUser ? 10_000 : 30_000,
  });

  const formatDateToday = (dateString: string): string => {
    const today = new Date();
    const date = new Date(dateString);
    if (
      today.getDate() === date.getDay() &&
      today.getMonth() === date.getMonth()
    ) {
      return formatDate(dateString, DATE_FORMAT_FULL_TIME);
    }
    return formatDate(dateString, DATE_FORMAT_WITH_TIME_FULL);
  };

  if (loading || error) {
    return <div className={styles.Skeleton}></div>;
  }

  const numberFormatter = Intl.NumberFormat('de-CH', {
    maximumFractionDigits: 0,
  });

  const toggleOpen = () => {
    if (isOpen) {
      const length = timeseries.length > 10 ? timeseries.length - 10 : 0;
      window.scrollBy(0, -31 * Math.min(length, 90)); //scroll to offset the long element when closing
    }

    tealiumTrackEvent({
      type: 'link',
      payload: {
        event_name: 'fullquote_timeseries',
        event_category: 'fullquote_page',
        event_action: `orderbook_show_${isOpen ? 'less' : 'more'}`,
      },
    });

    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.Wrapper}>
      <p className={styles.Title}>Timeseries</p>
      {timeseries?.length ? (
        <div className={styles.TableWrapper}>
          <table>
            <thead>
              <tr className={styles.Heading}>
                <th className={styles.TextLeft}>Zeit</th>
                <th className={styles.TextRight}>Preis</th>
                <th className={styles.TextRight}>Vol.</th>
              </tr>
            </thead>
            <tbody>
              {timeseries?.slice(0, isOpen ? 100 : 10).map((value) => {
                return (
                  <tr key={value.price.id}>
                    <td>
                      <span
                        className={classNames({
                          [styles.AnimateNeutral]: value.isNew,
                        })}
                      >
                        {/* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */}
                        {formatDateToday(value.price.date)}
                      </span>
                    </td>
                    <td className={styles.TextRight}>
                      <span
                        className={classNames({
                          [styles.AnimateNeutral]: value.isNew,
                        })}
                      >
                        {/* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null | undefined' is not assignable to parameter of type 'null | undefined'. */}
                        {formatPrice(value.price.close, scGrouped)}
                      </span>
                    </td>
                    <td className={styles.TextRight}>
                      <span
                        className={classNames({
                          [styles.AnimateNeutral]: value.isNew,
                        })}
                      >
                        {formatPrice(value.price.volume, null, numberFormatter)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Derzeit keine Daten vorhanden.</p>
      )}

      {timeseries?.length > 10 ? (
        <button
          className={classNames(styles.CollapseButton)}
          onClick={toggleOpen}
        >
          <span>{!isOpen ? 'Mehr anzeigen' : 'Weniger anzeigen'}</span>
          <Icon type={!isOpen ? 'IconChevronDown' : 'IconChevronUp'} />
        </button>
      ) : null}
    </div>
  );
};

export default Timeseries;
