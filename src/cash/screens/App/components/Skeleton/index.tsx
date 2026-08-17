import React from 'react';
import classnames from 'classnames';
import styles from './styles.legacy.css';
import { SkeletonProps } from './typings';

const Skeleton = ({ show, addClass }: SkeletonProps) => {
  return (
    (show && (
      <div
        /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
        className={classnames(styles.Skeleton, { [addClass]: !!addClass })}
      ></div>
    )) ||
    null
  );
};

export default Skeleton;
