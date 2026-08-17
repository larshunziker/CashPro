import React from 'react';
import classNames from 'classnames';
import styles from './styles.legacy.css';
import { RatingProps } from '../../typings';

type PropgressBarProps = Pick<RatingProps, 'max' | 'fill' | 'rating'>;

const ProgressBar = ({ max, rating, fill = 'neutral' }: PropgressBarProps) => {
  let pointPosition = '0%';

  if (max && rating) {
    pointPosition = `${(rating / max) * 100}%`;
  }
  return (
    <div>
      <div className={styles.RainbowWrapper}>
        <div
          style={{ width: pointPosition }}
          className={classNames(styles.Point, {
            [styles.Red]: fill === 'red',
            [styles.Green]: fill === 'green',
            [styles.Neutral]: fill === 'neutral',
          })}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
