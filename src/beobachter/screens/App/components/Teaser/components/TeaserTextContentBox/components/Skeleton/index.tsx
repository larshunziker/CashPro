import React from 'react';
import styles from './styles.legacy.css';

const LoadingSkeleton = () => (
  <div className={styles.SkeletonWrapper}>
    <div className={styles.SkeletonLeft} />
    <div className={styles.SkeletonRight}>
      <div className={styles.SkeletonContent} />
      <div className={styles.SkeletonContent} />
      <div className={styles.SkeletonContent} />
    </div>
  </div>
);

const Skeleton = () => (
  <>
    <LoadingSkeleton />
    <LoadingSkeleton />
    <LoadingSkeleton />
    <LoadingSkeleton />
    <LoadingSkeleton />
  </>
);

export default Skeleton;
