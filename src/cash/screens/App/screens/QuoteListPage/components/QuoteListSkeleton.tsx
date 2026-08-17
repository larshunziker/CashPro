import React from 'react';
import styles from './styles.legacy.css';
import { QuoteListSkeletonProps } from './typings';

const QuoteListSkeleton = ({ cols = 7, rows = 20 }: QuoteListSkeletonProps) => {
  return (
    <div className={styles.PageWrapper}>
      <p className={styles.Title}>Kursliste</p>
      <div className={styles.Table}>
        {Array.from({ length: rows }).map((_, rowKey) => (
          <div className={styles.Row} key={rowKey}>
            {Array.from({ length: cols }).map((_, colKey) => (
              <div key={colKey} className={styles.Skeleton} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuoteListSkeleton;
