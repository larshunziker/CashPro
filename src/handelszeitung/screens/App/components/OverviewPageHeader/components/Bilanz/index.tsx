import React from 'react';
import classNames from 'classnames';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { OverviewPageHeaderProps } from '../../typings';

const Bilanz = ({ title, lead }: OverviewPageHeaderProps) => {
  if (!title) {
    return null;
  }

  return (
    <div
      data-testid="wrapper"
      className={classNames(grid.Container, styles.Wrapper, {
        [styles.NoLead]: !lead,
      })}
    >
      <div className={grid.Row}>
        <h1 data-testid="title" className={styles.Title}>
          {title}
        </h1>
      </div>

      {lead && (
        <div data-testid="lead" className={grid.Row}>
          <div className={styles.Lead}>{lead}</div>
        </div>
      )}
    </div>
  );
};
export default Bilanz;
