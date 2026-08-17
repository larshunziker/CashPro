import React, { memo, ReactElement } from 'react';
import styles from './styles.legacy.css';

const LoadingBar = (): ReactElement => (
  <div
    className={styles.LoadingIndicator}
    data-testid="loading-indicator-wrapper"
  >
    <div className={styles.LoadingIndicatorItem}>
      <div className={styles.LoadingBar} />
    </div>
    <div className={styles.LoadingIndicatorItem}>
      <div className={styles.LoadingBar} />
    </div>
  </div>
);

export default memo(LoadingBar);
