import React from 'react';
import { formatPrice } from '../../../../../../../Highcharts/helpers';
import styles from './styles.legacy.css';

const ChunkProgressBar = ({
  min,
  max,
  average,
  suffix = '',
}: {
  min: number;
  max: number;
  average: number;
  suffix: string;
}) => {
  const maxWidth = max - min;
  const pointPosition =
    average > 0 && max > 0 ? `${(100 / maxWidth) * (average - min)}%` : '0%';

  return (
    <div>
      <div className={styles.RainbowWrapper}>
        <div style={{ left: pointPosition }} className={styles.Point}></div>
        <div style={{ left: pointPosition }} className={styles.PointLabel}>
          <span>{`⌀ ${formatPrice(average)}`}</span>
        </div>
      </div>
      <div className={styles.LabelWrapper}>
        <p className={styles.Label}>
          Min. {formatPrice(min)} {suffix}
        </p>
        <p className={styles.Label}>
          Max. {formatPrice(max)} {suffix}
        </p>
      </div>
    </div>
  );
};

export default ChunkProgressBar;
