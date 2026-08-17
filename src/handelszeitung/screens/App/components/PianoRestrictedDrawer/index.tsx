import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  PIANO_CONTAINER_RESTRICTED_DRAWER,
  PIANO_CONTAINER_RESTRICTED_DRAWER_CONTAINER,
  PIANO_PLACEHOLDER_RESTRICTED_DRAWER,
} from '../../../../../shared/constants/piano';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const PianoRestrictedDrawer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <div
      className={classNames(styles.PianoRestrictedDrawer, {
        ['visible']: isVisible,
      })}
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
