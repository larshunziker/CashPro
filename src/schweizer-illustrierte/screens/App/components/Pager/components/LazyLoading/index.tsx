import React, { ReactElement } from 'react';
import MoreButton from '../../../MoreButton';
import { MORE_BUTTON_COLLAPSED } from '../../../MoreButton/constants';
import styles from './styles.legacy.css';
import { LazyLoadingPagerProps, LazyLoadingProps } from './typings';

type LazyLoadingPropsInner = LazyLoadingProps & {
  pager: LazyLoadingPagerProps;
};

const LazyLoading: React.FC<LazyLoadingPropsInner> = ({
  isLoading,
  loadMore,
  hasMoreResults,
  children,
}: LazyLoadingPropsInner): ReactElement | null => {
  if (!hasMoreResults) {
    return null;
  }

  return (
    <div className={styles.Wrapper} data-testid="LazyLoading-wrapper">
      <MoreButton
        /* @ts-ignore TODO: TS2322 ->  Type '((event */
        onClick={!isLoading ? loadMore : null}
        isLoading={isLoading && !__TESTING__}
        type={MORE_BUTTON_COLLAPSED}
      >
        {(children && isLoading) || isLoading ? (
          <span data-testid="Lazy-Loading-loading-wrapper">
            Wird geladen ...
          </span>
        ) : (
          children || (
            <span data-testid="Lazy-Loading-load-more-wrapper">Mehr laden</span>
          )
        )}
      </MoreButton>
    </div>
  );
};

export default LazyLoading;
