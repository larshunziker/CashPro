import React, { memo } from 'react';
import Skeleton from '../../../../../../components/Skeleton';
import styles from './styles.legacy.css';
import { DataFieldProps } from './typings';

const DataField = ({ isLoading, field, logo }: DataFieldProps) => {
  return (
    <span className={styles.Value}>
      {isLoading ? (
        <Skeleton show={isLoading} addClass={styles.Skeleton} />
      ) : (
        <>
          {logo && <img src={logo} alt={field?.toString()} />}
          {field}
        </>
      )}
    </span>
  );
};

export default memo<DataFieldProps>(DataField);
