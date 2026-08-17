import React from 'react';
import classNames from 'classnames';
import styles from './styles.legacy.css';
import { ScrollButtonProps } from './typings';

const ScrollButton = ({ icon, position, show, onClick }: ScrollButtonProps) => {
  if (!show) {
    return null;
  }
  return (
    <div className={styles.Wrapper}>
      <div className={classNames(styles.ScrollButton)}>
        <button
          className={classNames({
            [styles.GradiantLeftToRight]: position === 'left',
            [styles.GradiantRightToLeft]: position === 'right',
          })}
          onClick={onClick}
        >
          {icon}
        </button>
      </div>
    </div>
  );
};

export default ScrollButton;
