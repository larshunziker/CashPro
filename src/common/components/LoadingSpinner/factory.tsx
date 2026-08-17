import React from 'react';
import { LoadingSpinnerFactoryOptions, LoadingSpinnerProps } from './typings';

const loadingSpinnerFactory = ({ styles }: LoadingSpinnerFactoryOptions) => {
  const LoadingSpinner = ({ width = 50, height = 50 }: LoadingSpinnerProps) => {
    return (
      <div className={styles.SpinnerWrapper}>
        <svg
          className={styles.Spinner}
          width={width}
          height={height}
          viewBox="0 0 44 44"
        >
          <circle
            className={styles.Path}
            cx="22"
            cy="22"
            r="20"
            fill="none"
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  };

  return LoadingSpinner;
};

export default loadingSpinnerFactory;
