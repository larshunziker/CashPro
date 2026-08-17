import React, { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';
import compose from 'recompose/compose';
import withPropsOnChange from 'recompose/withPropsOnChange';
import classNames from 'classnames';
import { hasNextPage } from '../../shared/helpers';
import styles from './styles.legacy.css';
import { LazyLoaderProps } from './typings';

type LazyLoaderPagerProps = {
  hasNextPage: () => boolean;
  handleNextPage: () => void;
};

type LazyLoaderPropsInner = LazyLoaderProps & {
  pager: LazyLoaderPagerProps;
};

const LazyLoader = (props: LazyLoaderPropsInner): ReactElement =>
  /* @ts-ignore TODO: TS2322 ->  Type 'false | Element' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
  props.pager.hasNextPage() && (
    <button
      onClick={props.pager.handleNextPage}
      className={classNames('lazy-loader-btn', styles.LoadMore)}
    >
      <FormattedMessage
        id="app.lazyLoader.loadMore"
        description="The text on the lazyLoader"
        defaultMessage="Weitere Ergebnisse"
      />
    </button>
  );

const extendWithPagerFunctionality: Function = withPropsOnChange(
  (props: LazyLoaderPropsInner, nextProps: LazyLoaderPropsInner): boolean =>
    props.currentPage !== nextProps.currentPage,
  (props: LazyLoaderPropsInner) => ({
    pager: {
      hasNextPage: () =>
        hasNextPage(props.currentPage, props.itemsCount, props.itemsPerPage),
      handleNextPage: (): void => props.updatePage(props.currentPage + 1),
    },
  }),
);

export default compose<any, any>(extendWithPagerFunctionality)(LazyLoader);
