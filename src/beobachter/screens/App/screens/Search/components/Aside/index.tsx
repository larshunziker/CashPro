import React from 'react';
import classNames from 'classnames';
import {
  PIANO_CONTAINER_LANDING_ASIDE,
  PIANO_CONTAINER_LANDING_ASIDE_2,
  PIANO_CONTAINER_LANDING_ASIDE_3,
  PIANO_PLACEHOLDER_ASIDE,
} from '../../../../../../../shared/constants/piano';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'hideAsideContent' implicitly has an 'any' type. */
const Aside = ({ hideAsideContent }) => {
  return hideAsideContent ? (
    <></>
  ) : (
    <div className={styles.Sidebar}>
      <div
        className={classNames(
          styles.PianoIntegrationWrapper,
          PIANO_CONTAINER_LANDING_ASIDE,
          PIANO_PLACEHOLDER_ASIDE,
        )}
      />
      <div
        className={classNames(
          styles.PianoIntegrationWrapper,
          PIANO_CONTAINER_LANDING_ASIDE_2,
          PIANO_PLACEHOLDER_ASIDE,
        )}
      />
      <div
        className={classNames(
          styles.PianoIntegrationWrapper,
          PIANO_CONTAINER_LANDING_ASIDE_3,
          PIANO_PLACEHOLDER_ASIDE,
        )}
      />
    </div>
  );
};

export default Aside;
