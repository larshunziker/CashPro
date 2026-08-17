import React, { Component } from 'react';
import compose from 'recompose/compose';
import withPropsOnChange from 'recompose/withPropsOnChange';
import { hasNextPage } from '../shared/helpers';
import { PagerFactoryOptions, PagerFactoryProps } from './typings';

type LazyLoaderPagerProps = {
  hasNextPage: () => boolean;
  handleNextPage: () => void;
};

type LazyLoaderPropsInner = PagerFactoryOptions &
  PagerFactoryProps & {
    pager?: LazyLoaderPagerProps;
  };

const LazyLoaderFactory = ({ styles, Icon }: LazyLoaderPropsInner) => {
  class LazyLoader extends Component<LazyLoaderPropsInner> {
    constructor(props: LazyLoaderPropsInner) {
      super(props);
    }

    render() {
      const { className, children, label = 'Mehr laden' } = this.props;

      // hide "load more" button if no further items are fetchable
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      if (!this.props.pager.hasNextPage()) {
        return null;
      }

      return (
        <button
          /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
          onClick={() => this.props.pager.handleNextPage()}
          className={className || `lazy-loader-btn ${styles.LoadMore}`}
        >
          {children || (
            <>
              <Icon
                type="IconArrowRotateRight"
                addClass={styles.IconArrowRotateRight}
              />
              <span>{label}</span>
            </>
          )}
        </button>
      );
    }
  }

  const withPagerFunctionality = withPropsOnChange(
    (props: LazyLoaderPropsInner, nextProps: LazyLoaderPropsInner) =>
      props.currentPage !== nextProps.currentPage,
    (props: LazyLoaderPropsInner) => ({
      pager: {
        hasNextPage: () =>
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'number | undefined' is not assignable to parameter of type 'number'. */
          hasNextPage(props.currentPage, props.itemsCount, props.itemsPerPage),
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        handleNextPage: (): void => props.updatePage(props.currentPage + 1),

        ...props.pager,
      },
    }),
  );

  return compose<any, any>(withPagerFunctionality)(LazyLoader);
};

export default LazyLoaderFactory;
