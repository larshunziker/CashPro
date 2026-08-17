import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import Icon from '../../../../../../../Icon';
import MinistageTeaser from '../../../../../../../Paragraphs/components/MinistageParagraph/components/MinistageTeaser';
import RestrictedContent from '../../../../../../../RestrictedContent';
import Minitables from '../MiniTables';
import { HideRestrictedContent } from '../../../..';
import styles from './styles.legacy.css';
import { RatingProps } from './typings';

const Row = ({
  date,
  status,
  ratingSource,
  title,
  text,
  table,
}: RatingProps) => {
  const [isRowOpen, setRowOpen] = useState(false);
  const hideContent = useContext(HideRestrictedContent);

  const formatDate = (date: string): string => {
    const day = date.slice(-2);
    const month = date.slice(4, 6);
    const year = date.slice(2, 4);
    return `${day}.${month}.${year}`;
  };

  return (
    <div>
      <button
        className={classNames(styles.Wrapper, { [styles.Border]: !isRowOpen })}
        onClick={() => {
          setRowOpen(!isRowOpen);
        }}
      >
        {/* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */}
        <span className={styles.Date}>{formatDate(date)}</span>
        <span
          className={classNames(
            styles.Status,
            { [styles.Sell]: status === 'sell' },
            { [styles.Buy]: status === 'buy' },
            { [styles.Hold]: status === 'hold' },
          )}
        >
          {status}
        </span>
        <RestrictedContent isActive={hideContent}>
          <span className={styles.Source}>{ratingSource}</span>
        </RestrictedContent>
        <span className={styles.RowToggle}>
          <Icon type={isRowOpen ? 'IconChevronUp' : 'IconChevronDown'} />
        </span>
      </button>
      {(isRowOpen && (
        <div className={classNames({ [styles.Border]: isRowOpen })}>
          {(hideContent && (
            <div className={styles.Ministage}>
              <MinistageTeaser
                ministageTeaser={{
                  headline:
                    'Sichern Sie sich den Wissensvorsprung mit dem AWP Analyser',
                  lead: 'Profitieren Sie mit einem Anleger-Abo oder dem Profi-Abo von detaillieren Analysten-Einschätzungen. ',
                  link: {
                    label: 'Anleger-Abo Details',
                    path: '/services/boersenabo',
                  },
                }}
              />
            </div>
          )) ||
            null}
          <RestrictedContent isActive={hideContent}>
            <>
              <p className={styles.Title}>{title}</p>
              <p className={styles.Text}>{text}</p>
              {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string[][]> | undefined' is not assignable to type 'string[][]'. */}
              <Minitables table={table} />
            </>
          </RestrictedContent>
        </div>
      )) ||
        null}
    </div>
  );
};

export default Row;
