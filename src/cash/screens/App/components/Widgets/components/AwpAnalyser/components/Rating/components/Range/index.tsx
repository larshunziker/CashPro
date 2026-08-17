import React from 'react';
import styles from './styles.legacy.css';
import { RatingProps } from '../../typings';

type RangeProps = Pick<RatingProps, 'max' | 'rating'>;

const Range = ({ max, rating }: RangeProps) => {
  let pointPosition = '0%';
  if (max && rating) {
    pointPosition = `${(rating / max) * 100}%`;
  }

  return (
    <div>
      <div className={styles.RainbowWrapper}>
        <div style={{ left: pointPosition }} className={styles.Point} />
      </div>
      <div className={styles.LabelWrapper}>
        <p className={styles.Label}>Verkauf</p>
        <p className={styles.Label}>Neutral</p>
        <p className={styles.Label}>Kauf</p>
      </div>
    </div>
  );
};

export default Range;
