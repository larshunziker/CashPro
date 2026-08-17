import React from 'react';
import styles from './styles.legacy.css';

const LoadingSkeleton = () => {
  return (
    <div className={styles.SkeletonWrapper}>
      <div className={styles.SkeletonLeft}></div>
      <div className={styles.SkeletonRight}>
        <div className={styles.SkeletonContent}></div>
        <div className={styles.SkeletonContent}></div>
        <div className={styles.SkeletonContent}></div>
      </div>
    </div>
  );
};

const Skeleton = () => {
  return (
    <>
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
    </>
  );
};

export default Skeleton;
