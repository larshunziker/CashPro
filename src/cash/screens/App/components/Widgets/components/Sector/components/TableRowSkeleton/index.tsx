import React from 'react';
import styles from './styles.legacy.css';

const TableRowSkeleton = ({ count = 1 }) => (
  <table className={styles.SkeletonWrapper}>
    {new Array(count).fill(0).map((_, index) => (
      <tr key={index} className={styles.Skeleton}>
        <td>
          <span />
        </td>
        <td>
          <span />
        </td>
        <td>
          <span />
        </td>
      </tr>
    ))}
  </table>
);

export default TableRowSkeleton;
