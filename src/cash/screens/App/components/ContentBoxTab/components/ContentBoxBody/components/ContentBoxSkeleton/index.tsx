import React from 'react';
import styles from './styles.legacy.css';

const ContentBoxSkeleton = () => {
  return (
    <div>
      <div className={styles.SkeletonWrapper}>
        {[...Array(5).keys()].map((index) => {
          return (
            <div
              className={styles.SkeletonLink}
              key={`newsticker-skeleton-item-${index}`}
            >
              <div className={styles.SkeletonItem}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentBoxSkeleton;
