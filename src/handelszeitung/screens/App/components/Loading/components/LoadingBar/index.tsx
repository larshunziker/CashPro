import React, { ReactElement, memo } from 'react';
import styles from './styles.legacy.css';

const LoadingBar = (): ReactElement => (
  <div className={styles.LoadingIndicator}>
    <div className={styles.LoadingIndicatorItem}>
      <div className={styles.LoadingBar} />
    </div>
    <div className={styles.LoadingIndicatorItem}>
      <div className={styles.LoadingBar} />
    </div>
  </div>
);

export default memo(LoadingBar);
