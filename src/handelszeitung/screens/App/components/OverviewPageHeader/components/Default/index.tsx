import React from 'react';
import classNames from 'classnames';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { OverviewPageHeaderProps } from '../../typings';

const Default = ({ title, lead }: OverviewPageHeaderProps) => {
  if (!title) {
    return null;
  }

  return (
    <div
      data-testid="wrapper"
      className={classNames(grid.Container, {
        [styles.NoLead]: !lead,
      })}
    >
      <h1 className={grid.Row}>
        <span data-testid="title" className={styles.Title}>
          {title}
        </span>
      </h1>

      {lead && (
        <div data-testid="lead" className={grid.Row}>
          <div className={styles.Lead}>{lead}</div>
        </div>
      )}
    </div>
  );
};
export default Default;
