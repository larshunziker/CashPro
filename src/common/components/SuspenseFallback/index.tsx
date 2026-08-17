import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './styles.legacy.css';

interface Props {
  size?: 'small' | 'large';
}

const SuspenseFallback: FC<Props> = ({ size }) => {
  return (
    <div
      className={classNames({
        [styles.Large]: size === 'large',
        [styles.Small]: size === 'small',
        [styles.Medium]: !size,
      })}
    />
  );
};

export default SuspenseFallback;
