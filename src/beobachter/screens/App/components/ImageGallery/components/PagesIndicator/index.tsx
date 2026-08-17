import React, { ReactElement, memo } from 'react';
import styles from './styles.legacy.css';
import { PagesIndicatorProps } from './typings';

const PagesIndicator = (props: PagesIndicatorProps): ReactElement => (
  <div className={styles.Indicator}>
    <span className={styles.HighlightActive}>{props.activeIndex + 1}</span>
    <span className={styles.Separator}>/</span>
    <span className={styles.Highlight}>{props.slideCount}</span>
  </div>
);

export default memo<PagesIndicatorProps>(PagesIndicator);
