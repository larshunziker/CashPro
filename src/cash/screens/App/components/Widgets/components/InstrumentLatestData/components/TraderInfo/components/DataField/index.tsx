import React, { memo } from 'react';
import classnames from 'classnames';
import Skeleton from '../../../../../../../../components/Skeleton';
import styles from './styles.legacy.css';
import { DataFieldProps } from './typings';

const DataField = ({ isLoading, fields, onlyOne }: DataFieldProps) => {
  if (fields?.length === 0) return null;

  if (isLoading) {
    return (
      <>
        {!onlyOne && <Skeleton show={isLoading} addClass={styles.Skeleton} />}
        <Skeleton
          show={isLoading}
          addClass={classnames(styles.Skeleton, styles.SkeletonSmall)}
        />
      </>
    );
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'obj' implicitly has an 'any' type. */
  const isEmpty = (obj) => (obj ? Object.keys(obj)?.length === 0 : true);

  return onlyOne ? (
    <div>{fields[0]}</div>
  ) : (
    <>
      <div className={classnames(styles.Value, styles.Highlighted)}>
        {fields[0]}
      </div>
      {!isEmpty(fields[1]) && <div className={styles.Value}>{fields[1]}</div>}
    </>
  );
};

export default memo<DataFieldProps>(DataField);
