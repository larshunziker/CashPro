import React from 'react';
import classNames from 'classnames';
import styles from './styles.legacy.css';
import { OverviewPageHeaderProps } from './typings';

const OverviewPageHeader = ({ title, lead }: OverviewPageHeaderProps) => {
  if (!title) {
    return null;
  }

  return (
    <div
      data-testid="wrapper"
      className={classNames({
        [styles.NoLead]: !lead,
      })}
    >
      <h1>
        <span data-testid="title" className={styles.Title}>
          {title}
        </span>
      </h1>

      {lead && (
        <div data-testid="lead">
          <div className={styles.Lead}>{lead}</div>
        </div>
      )}
    </div>
  );
};
export default OverviewPageHeader;
