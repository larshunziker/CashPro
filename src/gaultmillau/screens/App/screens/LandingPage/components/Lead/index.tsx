import React from 'react';
import classNames from 'classnames';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { LeadProps } from './typings';

const Lead = ({ landingPage }: LeadProps) => (
  <div className={styles.Wrapper}>
    <div className={classNames(grid.ColXs24, styles.Header)}>
      <h1 className={styles.Title}>{landingPage.title || ''}</h1>
    </div>
    <div
      className={classNames(
        grid.ColSm20,
        grid.ColMd16,
        grid.ColOffsetSm2,
        grid.ColOffsetMd4,
      )}
    >
      <span className={styles.Lead}>{landingPage.lead}</span>
    </div>
    <div className={grid.ColXs24}>
      <div className={styles.DividerThick} />
    </div>
  </div>
);

export default Lead;
