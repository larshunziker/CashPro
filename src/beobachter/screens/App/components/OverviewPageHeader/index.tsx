import React from 'react';
import classNames from 'classnames';
import ExpansionPanel from './components/ExpansionPanel';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { OverviewPageHeaderProps } from './typings';

const OverviewPageHeader = ({
  title,
  lead,
  isCentered,
  isLeadCollapsable = false,
}: OverviewPageHeaderProps) => {
  if (!title) {
    return null;
  }

  return (
    <div
      data-testid="overview-page-header-default-wrapper"
      className={classNames(grid.Container, styles.Wrapper, {
        [styles.isCentered]: isCentered,
      })}
    >
      <div className={grid.Row}>
        <h1 className={styles.Title}>{title}</h1>
      </div>

      {lead && (
        <div
          data-testid="overview-page-header-default-lead"
          className={grid.Row}
        >
          {isLeadCollapsable ? (
            <ExpansionPanel key={lead}>
              <div className={styles.Lead}>{lead}</div>
            </ExpansionPanel>
          ) : (
            <div className={styles.Lead}>{lead}</div>
          )}
        </div>
      )}
    </div>
  );
};
export default OverviewPageHeader;
