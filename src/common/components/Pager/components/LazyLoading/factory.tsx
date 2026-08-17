import React from 'react';
import classNames from 'classnames';
import { PagerFactoryOptions, PagerFactoryProps } from './typings';

type PagerFactoryPropsInner = PagerFactoryProps & PagerFactoryOptions;

const LazyLoading = ({
  Icon,
  styles,
  hasMoreResults,
  isLoading,
  loadMore,
  className,
  children,
  label = 'Mehr laden',
}: PagerFactoryPropsInner) => {
  // hide "load more" button if no further items are fetchable
  if (!hasMoreResults) {
    return null;
  }

  return (
    <button
      /* @ts-ignore TODO: TS2322 ->  Type '((event */
      onClick={!isLoading ? loadMore : null}
      className={className || `lazy-Loading-btn ${styles.LoadMore}`}
      aria-label={label}
    >
      {children || (
        <>
          <Icon
            type="IconArrowRotateRight"
            addClass={classNames(styles.IconArrowRotateRight, {
              [styles.IsLoading]: isLoading,
            })}
          />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};

export default LazyLoading;
