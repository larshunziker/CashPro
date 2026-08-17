import React, { ReactElement } from 'react';
import ButtonWithLoading from '../../../ButtonWithLoading';
import { LazyLoadingProps } from './typings';

type LazyLoadingPropsInner = LazyLoadingProps;

const LazyLoading = (props: LazyLoadingPropsInner): ReactElement | null => {
  // hide "load more" button if no further items are fetchable
  if (!props.hasMoreResults) {
    return null;
  }

  return (
    <div data-testid="LazyLoading-wrapper">
      <ButtonWithLoading
        ariaLabel="mehr laden"
        /* @ts-ignore TODO: TS2322 ->  Type '(() => void) | null | undefined' is not assignable to type 'MouseEventHandler<HTMLButtonElement> | undefined'. */
        onClick={!props.isLoading ? props.loadMore : null}
        iconTypeLeft="IconArrowRotateRight"
        loading={props.isLoading}
      >
        {props.children || (
          <span data-testid="Lazy-Loading-load-more-wrapper"> Mehr laden</span>
        )}
      </ButtonWithLoading>
    </div>
  );
};

export default LazyLoading;
