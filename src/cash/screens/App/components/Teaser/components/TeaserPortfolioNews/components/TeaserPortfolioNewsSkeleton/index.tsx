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

const TeaserPortfolioNewsSkeleton = ({ count = 1 }) => {
  const repeat = new Array(count).fill(0);
  return (
    <>
      {repeat.map((_, index) => (
        <LoadingSkeleton key={index} />
      ))}
    </>
  );
};

export default TeaserPortfolioNewsSkeleton;
