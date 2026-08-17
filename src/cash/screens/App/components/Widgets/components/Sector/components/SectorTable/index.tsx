import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { scrollToAnchorElement } from '../../../../../../../../../common/components/SmoothScroll/helpers';
import { formatPrice } from '../../../../../Highcharts/helpers';
import Icon from '../../../../../Icon';
import styles from './styles.legacy.css';
import { SectorTableTableProps } from './typings';

/* @ts-ignore TODO: TS7031 ->  Binding element 'instrument' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'isActiveQuote' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'ranking' implicitly has an 'any' type. */
const TableRow = ({ instrument, isActiveQuote, ranking }) => {
  return (
    <tr className={classNames({ [styles.ActiveQuote]: isActiveQuote })}>
      <td className={classNames(styles.TextLeft)}>
        <div className={styles.NameField}>
          <div className={styles.RankingNumber}>{ranking}</div>
          <Link
            to={'/' + instrument.fullquoteUri}
            className={classNames(styles.Link, {
              [styles.ActiveQuote]: isActiveQuote,
            })}
          >
            {instrument.mName}
          </Link>
        </div>
      </td>
      <td className={classNames(styles.TextRight, styles.MarketField)}>
        <Link
          to={'/' + instrument.fullquoteUri}
          className={classNames(styles.Link)}
        >
          {instrument.market}
        </Link>
        <div
          className={styles.SubField}
        >{`${instrument.country}/${instrument.mCur}`}</div>
      </td>
      <td className={styles.TextRight}>
        {/* @ts-ignore TODO: TS2345 ->  Argument of type '"Value"' is not assignable to parameter of type 'null | undefined'. */}
        {formatPrice(instrument.marketCapitalisation, 'Value')}
      </td>
    </tr>
  );
};

const SectorTable = ({
  instruments,
  activeQuoteKey,
}: SectorTableTableProps) => {
  const [showMore, setShowMore] = useState(false);
  const [isActiveQuoteInTopTen, setIsActiveQuoteInTopTen] = useState(false);

  useEffect(() => {
    if (instruments && activeQuoteKey) {
      const instrumentCopy = [...instruments.slice(0, 9)];
      const isInTop10 = instrumentCopy.some(
        (intrument) => intrument?.instrumentKey === activeQuoteKey,
      );

      setIsActiveQuoteInTopTen(isInTop10);
    }
  }, [instruments, activeQuoteKey]);

  const handleShowMoreClick = () => {
    if (showMore) {
      scrollToAnchorElement('sector-widget-top', {
        behavior: 'smooth',
      });
    }
    setShowMore(!showMore);
  };

  const itemsToDisplay = (!showMore && !isActiveQuoteInTopTen && 8) || 9;

  return (
    <div className={styles.Wrapper}>
      <table>
        <thead>
          <tr className={styles.Heading}>
            <th className={styles.TextLeft}>Rang</th>
            <th className={classNames(styles.TextRight)}>
              <div>Börse</div> <div className={styles.SubField}>Land/Whg.</div>
            </th>
            <th className={classNames(styles.TextRight)}>
              <div>Marktkap.</div>{' '}
              <div className={styles.SubField}>in Mrd. CHF</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* @ts-ignore TODO: TS2339 ->  Property 'length' does not exist on type 'never'. */}
          {!instruments && instruments?.length === 0 && (
            <div>Im Moment haben wir keine Daten für Sie</div>
          )}
          {instruments?.map((instrument, index) => {
            const isActiveQuote = activeQuoteKey === instrument?.instrumentKey;
            const ranking = index + 1;

            if (isActiveQuote && !isActiveQuoteInTopTen && !showMore) {
              return (
                <TableRow
                  key={`sectors-table-${instrument.mName}-${index}-${isActiveQuoteInTopTen}-${showMore}`}
                  instrument={instrument}
                  isActiveQuote={isActiveQuote}
                  ranking={ranking}
                />
              );
            }

            if (!showMore && index > itemsToDisplay) {
              return null;
            }

            return (
              <TableRow
                key={`sectors-table-${instrument.mName}-${index}-${isActiveQuoteInTopTen}-${showMore}`}
                instrument={instrument}
                isActiveQuote={isActiveQuote}
                ranking={ranking}
              />
            );
          })}
        </tbody>
      </table>
      {instruments?.length > itemsToDisplay && (
        <div className={styles.ButtonWrapper}>
          <button
            className={styles.ShowMore}
            onClick={() => handleShowMoreClick()}
          >
            {(showMore && 'Weniger anzeigen') || 'Mehr anzeigen'}
            <span className={styles.Icon}>
              <Icon type={showMore ? 'IconChevronUp' : 'IconChevronDown'} />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SectorTable;
