import React, { memo } from 'react';
import classNames from 'classnames';
import Icon from '../../../../../Icon';
import Logo from '../../../../../Logo';
import Skeleton from '../../../../../Skeleton';
import { headerMapping } from '../../../../../../screens/MyCash/components/Table/components/headerMapping';
import { ROUTE_BOERSE } from '../../../../../../constants';
import styles from './styles.legacy.css';
import { MarketTableProps } from './typings';

const MarketTable = (props: MarketTableProps) => {
  const { instruments, title, loading, error, rows, message, fields } = props;
  const queryParams = new URLSearchParams(window.location.search);
  const theme = queryParams.get('theme');
  document.documentElement.style.colorScheme =
    theme || (window.location.hash.includes('dark') ? 'dark' : 'light');

  return (
    <>
      <div className={styles.Wrapper}>
        <div className={styles.InnerWrapper}>
          <h2 className={styles.Title}>
            <a target="_blank" href={title?.url}>
              {title?.label}
              <Icon
                addClass={styles.Icon}
                type="IconArrowRightUpFromSquare"
              />{' '}
            </a>
          </h2>
          {message && (
            <p
              className={styles.Message}
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
          {!message && (
            <table>
              <tr>
                <th>+/-</th>
                <th>Titel</th>
                <th className={styles.RightAligned}>Aktuell</th>
                <th className={styles.RightAligned}>+/-%</th>
              </tr>
              {(!instruments || error || loading) &&
                new Array(rows).fill(0).map((_, index) => (
                  <tr key={index}>
                    <td colSpan={999}>
                      <Skeleton addClass={styles.Skeleton} show />
                    </td>
                  </tr>
                ))}
              {instruments?.map((instrument) => {
                const perfPercentage = parseFloat(
                  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Instrument'. */
                  instrument?.[fields.performance],
                );

                return (
                  <tr key={instrument.id}>
                    <td
                      className={classNames(styles.RightAligned, {
                        [styles.ArrowDown]: !Number.isNaN(perfPercentage),
                        [styles.ArrowUp]: perfPercentage > 0,
                      })}
                    >
                      {headerMapping['trendArrowPerfPercentage'].formatter({
                        value: instrument?.perfPercentage,
                        instrument,
                      })}
                    </td>
                    <td className={styles.TitleCol}>
                      <a
                        target="_blank"
                        href={`https://www.cash.ch/${instrument.fullquoteUri}`}
                      >
                        {instrument.mName}
                      </a>
                    </td>
                    <td className={styles.RightAligned}>
                      {/* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly name */}
                      {headerMapping[fields.price].formatter({
                        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Instrument'. */
                        value: instrument?.[fields.price],
                        instrument,
                      })}
                    </td>
                    <td
                      className={classNames(styles.RightAligned, {
                        [styles.Trend]: !Number.isNaN(perfPercentage),
                        [styles.TrendUp]: perfPercentage > 0,
                      })}
                    >
                      {/* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly name */}
                      {headerMapping[fields.performance].formatter({
                        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Instrument'. */
                        value: instrument?.[fields.performance],
                        instrument,
                      })}
                    </td>
                  </tr>
                );
              })}
            </table>
          )}
        </div>
        <div className={styles.Footer}>
          <p>Kurse sind teilweise bis 20&nbsp;Minuten verzögert.</p>
          <div>
            Präsentiert von
            <a target="_blank" href={`https://cash.ch/${ROUTE_BOERSE}`}>
              <Logo width={50} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo<MarketTableProps>(MarketTable);
