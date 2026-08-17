import React, { useEffect } from 'react';
import classNames from 'classnames';
import MiniPortfolio from '../../../../components/MiniPortfolio';
import MiniWatchlist from '../../../../components/MiniWatchlist';
import { STATUS_PAGE_ORIGIN } from './constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'statusCode' implicitly has an 'any' type. */
const StatusSubpage = ({ statusCode }) => {
  useEffect(() => {
    const appElement = document.getElementById('app');
    if (appElement) {
      appElement.classList.add(`status-page-${statusCode}`);
    }

    return () => {
      if (appElement) {
        appElement.classList.remove(`status-page-${statusCode}`);
      }
    };
  }, [statusCode]);

  return (
    <div className={grid.Container}>
      <div className={grid.Row}>
        <div className={classNames(grid.ColXs24, grid.ColSm12)}>
          <div className={styles.Wrapper}>
            <MiniPortfolio origin={STATUS_PAGE_ORIGIN} />
          </div>
        </div>
        <div className={classNames(grid.ColXs24, grid.ColSm12)}>
          <div className={styles.Wrapper}>
            <MiniWatchlist origin={STATUS_PAGE_ORIGIN} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusSubpage;
