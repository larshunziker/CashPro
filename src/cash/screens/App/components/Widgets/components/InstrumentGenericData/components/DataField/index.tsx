import React, { memo } from 'react';
import Skeleton from '../../../../../../components/Skeleton';
import styles from './styles.legacy.css';
import { DataFieldProps } from './typings';

const DataField = ({ isLoading, field }: DataFieldProps) => {
  return (
    <span className={styles.ValueWrapper}>
      {isLoading ? (
        <Skeleton show={isLoading} addClass={styles.Skeleton} />
      ) : (
        <span className={styles.Value}>{field}</span>
      )}
    </span>
  );
};

export default memo<DataFieldProps>(DataField);
