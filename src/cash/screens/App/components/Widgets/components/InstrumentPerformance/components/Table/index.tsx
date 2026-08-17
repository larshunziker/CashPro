import React, { memo } from 'react';
import Skeleton from '../../../../../Skeleton';
import { labels } from './constants';
import styles from './styles.legacy.css';
import { TableProps } from './typings';

const Table = ({ isLoading, data }: TableProps) => {
  const values = Object.values(data);

  if (values?.length === 0) return null;

  return (
    <table>
      <tr>
        <th></th>
        <th>
          <span className={styles.Title}>Kurs</span>
        </th>
        <th>
          <span className={styles.Title}>+/-</span>
        </th>
      </tr>
      {isLoading &&
        labels.map((label, idx) => {
          return (
            <tr key={idx}>
              <td>{label}</td>
              <td className={styles.Right}>
                <span className={styles.Value}>
                  <Skeleton show={isLoading} addClass={styles.Skeleton} />
                </span>
                <span className={styles.AdditionalInfo}>
                  <Skeleton
                    show={isLoading}
                    addClass={styles.SkeletonAdditional}
                  />
                </span>
              </td>
              <td className={styles.Right}>
                <span className={styles.Value}>
                  <Skeleton show={isLoading} addClass={styles.Skeleton} />
                </span>
                <span className={styles.AdditionalInfo}>
                  <Skeleton
                    show={isLoading}
                    addClass={styles.SkeletonAdditional}
                  />
                </span>
              </td>
            </tr>
          );
        })}
      {!isLoading &&
        values?.map(({ value, date, perfValue, perfPercentage }, idx) => {
          return (
            <tr key={idx}>
              <td>{labels[idx]}</td>
              <td className={styles.Right}>
                <span className={styles.Value}>{value}</span>
                <span className={styles.AdditionalInfo}>{date}</span>
              </td>
              <td className={styles.Right}>
                <span className={styles.Value}>{perfValue}</span>
                <span className={styles.AdditionalInfo}>{perfPercentage}</span>
              </td>
            </tr>
          );
        })}
    </table>
  );
};

export default memo<TableProps>(Table);
