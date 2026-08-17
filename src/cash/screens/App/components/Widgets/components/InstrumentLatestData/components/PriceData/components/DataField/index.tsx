import React, { memo } from 'react';
import classnames from 'classnames';
import Skeleton from '../../../../../../../../components/Skeleton';
import styles from './styles.legacy.css';
import { DataFieldProps } from './typings';

const DataField = ({ isLoading, fields, greyValue }: DataFieldProps) => {
  if (fields?.length === 0) return null;

  if (isLoading) {
    return (
      <>
        <Skeleton show={isLoading} addClass={styles.Skeleton} />
        <Skeleton show={isLoading} addClass={styles.SkeletonAdditional} />
      </>
    );
  }

  return (
    <>
      <div
        className={classnames(styles.Value, { [styles.GreyValue]: greyValue })}
      >
        {fields[0]}
      </div>
      <div className={styles.ValueAdditional}>{fields[1]}</div>
    </>
  );
};

export default memo<DataFieldProps>(DataField);
