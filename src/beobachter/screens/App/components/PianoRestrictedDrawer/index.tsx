import React, { useEffect } from 'react';
import classNames from 'classnames';
import {
  clearAllBodyScrollLocks,
  /* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'body-scroll-lock'. */
} from 'body-scroll-lock';
import {
  PIANO_CONTAINER_RESTRICTED_DRAWER,
  PIANO_CONTAINER_RESTRICTED_DRAWER_CONTAINER,
  PIANO_PLACEHOLDER_RESTRICTED_DRAWER,
} from '../../../../../shared/constants/piano';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const PianoRestrictedDrawer = () => {
  useEffect(() => {
    clearAllBodyScrollLocks();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <div
      className={classNames(styles.PianoRestrictedDrawer, 'visible')}
      id={PIANO_CONTAINER_RESTRICTED_DRAWER_CONTAINER}
    >
      <div
        className={classNames(
          styles.PianoRestrictedDrawerContainer,
          'paywall-wrapper-with-print-info',
        )}
      >
        <div
          className={classNames(
            grid.Container,
            styles.PianoRestrictedDrawerGrid,
          )}
        >
          <div className={grid.Row}>
            <div className={grid.Col24}>
              <div
                id={PIANO_CONTAINER_RESTRICTED_DRAWER}
                className={PIANO_PLACEHOLDER_RESTRICTED_DRAWER}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.PianoRestrictedDrawerBackground} />
    </div>
  );
};

export default PianoRestrictedDrawer;
