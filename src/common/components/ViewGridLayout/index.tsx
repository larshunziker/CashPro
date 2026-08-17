import React, { ReactElement, useState, useEffect } from 'react';
import classNames from 'classnames';
import { getCookieByName } from '../../../shared/helpers/utils';
import grid from '../../assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const ViewGridLayout = (): ReactElement | null => {
  const [isGridVisible, setIsGridVisible] = useState('');

  useEffect(() => {
    if (!document.cookie || document.cookie.indexOf('RASCHDEBUG') <= -1) {
      return;
    }
    const isRaschGridVisible = getCookieByName('RASCHGRIDLAYOUT');
    setIsGridVisible(isRaschGridVisible);
  }, []);

  const cols = [];
  for (let index = 0; index < 24; index++) {
    cols.push(index);
  }

  /* @ts-ignore TODO: TS2322 ->  Type 'Element | null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
  return isGridVisible === '1' ? (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        <div className={grid.Row}>
          {cols.map((item) => (
            <div
              key={`column-${item}`}
              className={classNames(styles.Column, `${grid.ColXs1}`)}
            >
              <div className={styles.Item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

export default ViewGridLayout;
