import React from 'react';
import classNames from 'classnames';
import styles from './styles.legacy.css';

const EsiSkeleton = () => {
  return (
    <div
      className={classNames(styles.EsiSkeletonWrapper, 'esi-skeleton')}
    ></div>
  );
};

export default EsiSkeleton;
