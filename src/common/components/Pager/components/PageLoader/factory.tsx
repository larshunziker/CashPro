import React, { Component } from 'react';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withPropsOnChange from 'recompose/withPropsOnChange';
import classNames from 'classnames';
import { hasNextPage, hasPreviousPage } from '../shared/helpers';
import useRaschRouterLocation from '../../../../../shared/hooks/useRaschRouterLocation';
import Link from '../../../Link';
import { MAX_TOTALPAGES } from '../../../../../shared/constants/pager';
import { PagerFactoryOptions, PagerProps } from './typings';

type PageLoaderPropsInner = PagerProps &
  PagerFactoryOptions & {
    pager: PagerProps;
    getHref: (
      currentIndex: number,
      routePathname: string,
      query: Record<string, any>,
    ) => string;
    pathname: string;
    addClass?: string;
  };

type ButtonProps = PageLoaderPropsInner & {
  label: string;
};

const VISIBLE_BEFORE_CURRENT = 3;

// calculate the range of pages to show by "currentpage minus VISIBLE_BEFORE_CURRENT pages"
// (VISIBLE_BEFORE_CURRENT being the visible range + 1 page over)
const getCurrentPage = (currentPage: number, count: number) =>
  currentPage > VISIBLE_BEFORE_CURRENT
    ? currentPage + (count + 1 - VISIBLE_BEFORE_CURRENT)
    : count + 1;

const doGetHref = (
  props: PageLoaderPropsInner,
  currentIndex: number,
  routePathname: string,
  query: Record<string, any>,
) => {
  if (
    !currentIndex ||
    Number.isNaN(currentIndex) ||
    !props ||
    !routePathname ||
    currentIndex > MAX_TOTALPAGES
  ) {
    return undefined;
  }
  const queryCopy = JSON.parse(JSON.stringify(query));
  delete queryCopy.page;
  const params = new URLSearchParams(queryCopy);
  const searchQuery = currentIndex !== 1 ? `page=${currentIndex}` : '';
  const anchorScrollId = props.anchorScrollId ? `#${props.anchorScrollId}` : '';

  return `${routePathname}?${searchQuery}${(params?.size > 0 && '&') || ''}${
    (params?.size > 0 && params.toString()) || ''
  }${anchorScrollId}`;
};

const ButtonPrevious = ({
  pager,
  currentPage,
  getHref,
  styles,
  Icon,
}: PageLoaderPropsInner) => {
  const { pathname, query } = useRaschRouterLocation();
  const hasPreviousPage = pager.hasPreviousPage();
  const pageNumber = hasPreviousPage ? currentPage - 1 : 0;
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const path = getHref(pageNumber, pathname, query);
  const isPlaceholder = !path;

  return (
    <Link
      path={path}
      className={classNames(
        'page-loader-prev-btn',
        styles.PageLink,
        styles.PrevButton,
        {
          [styles.Disabled]: !hasPreviousPage,
          [styles.PagerPlaceholder]: isPlaceholder,
        },
      )}
      aria-label="vorherige Seite"
    >
      <Icon addClass={styles.Icon} type="IconChevronLeft" />
    </Link>
  );
};

const ButtonNext = ({
  pager,
  currentPage,
  getHref,
  styles,
  Icon,
}: PageLoaderPropsInner) => {
  const { pathname, query } = useRaschRouterLocation();
  const hasNextPage = pager.hasNextPage();
  const pageNumber = hasNextPage ? currentPage + 1 : 0;
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const path = getHref(pageNumber, pathname, query);
  const isPlaceholder = !path;

  return (
    <Link
      path={path}
      className={classNames(
        'page-loader-next-btn',
        styles.PageLink,
        styles.NextButton,
        {
          [styles.Disabled]: !hasNextPage || currentPage === MAX_TOTALPAGES,
          [styles.PagerPlaceholder]: isPlaceholder,
        },
      )}
      aria-label="nächste Seite"
    >
      <Icon addClass={styles.Icon} type="IconChevronRight" />
    </Link>
  );
};

const Button = ({ label, getHref, currentPage, styles }: ButtonProps) => {
  const { pathname, query } = useRaschRouterLocation();

  const index =
    (!Number.isNaN(parseInt(label, 10)) && parseInt(label, 10)) || 0;
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const path = getHref(index, pathname, query);
  return (
    <Link
      path={path}
      className={classNames('page-loader-btn', styles.PageLink, {
        [styles.ActiveItem]: currentPage === index,
        [styles.PagerPlaceholder]: !path,
      })}
      label={label}
    />
  );
};

const PageLoaderFactory = ({ Icon, styles }: PagerFactoryOptions) => {
  class PageLoader extends Component<PageLoaderPropsInner> {
    constructor(props: PageLoaderPropsInner) {
      super(props);
    }

    render() {
      const pagesNumber = Math.min(
        this.props.pager.totalPages,
        VISIBLE_BEFORE_CURRENT,
      );

      if (this.props.pager.totalPages < 2) {
        return null;
      }

      const totalPages =
        this.props.pager.totalPages > MAX_TOTALPAGES
          ? MAX_TOTALPAGES
          : this.props.pager.totalPages;

      const pageAfterCurrent =
        this.props.currentPage >= VISIBLE_BEFORE_CURRENT + 1
          ? this.props.currentPage + 1
          : VISIBLE_BEFORE_CURRENT + 1;

      return (
        <div
          className={classNames(styles.Wrapper, {
            /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
            [this.props.addClass]: !!this.props.addClass,
          })}
        >
          {/* PREV Arrow */}
          {/* @ts-ignore TODO: TS2783 ->  'styles' is specified more than once, so this usage will be overwritten. */}
          {/* @ts-ignore TODO: TS2783 ->  'Icon' is specified more than once, so this usage will be overwritten. */}
          {<ButtonPrevious styles={styles} Icon={Icon} {...this.props} />}

          {/* FIRST PAGE button */}
          {this.props.currentPage > totalPages - 2 &&
            totalPages > VISIBLE_BEFORE_CURRENT + 1 && (
              <Button {...this.props} styles={styles} label="1" />
            )}

          {/* FILLER (...) only visible at the end*/}
          {this.props.currentPage > totalPages - 2 &&
            totalPages > VISIBLE_BEFORE_CURRENT + 1 && (
              /* @ts-ignore TODO: TS2783 ->  'styles' is specified more than once, so this usage will be overwritten. */
              <Button styles={styles} {...this.props} label="..." />
            )}

          {/* RENDER VISIBLE PAGES */}
          {[...Array(pagesNumber)].map((_item, index) => (
            <Button
              /* @ts-ignore TODO: TS2783 ->  'styles' is specified more than once, so this usage will be overwritten. */
              styles={styles}
              {...this.props}
              label={getCurrentPage(this.props.currentPage, index).toString()}
              key={`pager-button-${index}`}
            />
          ))}

          {/* 1 PAGE AFTER CURRENT to have the next page always visible */}
          {this.props.currentPage + 1 <= totalPages &&
            totalPages > VISIBLE_BEFORE_CURRENT && (
              <Button
                /* @ts-ignore TODO: TS2783 ->  'styles' is specified more than once, so this usage will be overwritten. */
                styles={styles}
                {...this.props}
                label={pageAfterCurrent.toString()}
              />
            )}
          {/* FILLER (...) visible until end-item - 2 */}
          {this.props.currentPage < totalPages - 2 &&
            totalPages > VISIBLE_BEFORE_CURRENT + 1 && (
              /* @ts-ignore TODO: TS2783 ->  'styles' is specified more than once, so this usage will be overwritten. */
              <Button styles={styles} {...this.props} label="..." />
            )}
          {/* LAST PAGE button */}
          {this.props.currentPage < totalPages - 1 &&
            totalPages > VISIBLE_BEFORE_CURRENT + 1 && (
              <Button
                /* @ts-ignore TODO: TS2783 ->  'styles' is specified more than once, so this usage will be overwritten. */
                styles={styles}
                {...this.props}
                label={totalPages.toString()}
              />
            )}

          {/* NEXT Arrow */}
          {/* @ts-ignore TODO: TS2783 ->  'styles' is specified more than once, so this usage will be overwritten. */}
          {/* @ts-ignore TODO: TS2783 ->  'Icon' is specified more than once, so this usage will be overwritten. */}
          {<ButtonNext styles={styles} Icon={Icon} {...this.props} />}
        </div>
      );
    }
  }

  const withPagerFunctionality = withPropsOnChange(
    (props: PageLoaderPropsInner, nextProps: PageLoaderPropsInner) => {
      return (
        props.currentPage !== nextProps.currentPage ||
        props.itemsCount !== nextProps.itemsCount
      );
    },
    (props: PageLoaderPropsInner) => ({
      pager: {
        /* @ts-ignore TODO: TS2783 ->  'totalPages' is specified more than once, so this usage will be overwritten. */
        totalPages:
          props.itemsPerPage === 0
            ? 0
            : Math.ceil(props.itemsCount / props.itemsPerPage),
        /* @ts-ignore TODO: TS2783 ->  'hasNextPage' is specified more than once, so this usage will be overwritten. */
        hasNextPage: () =>
          hasNextPage(props.currentPage, props.itemsCount, props.itemsPerPage),
        /* @ts-ignore TODO: TS2783 ->  'hasPreviousPage' is specified more than once, so this usage will be overwritten. */
        hasPreviousPage: () => hasPreviousPage(props.currentPage),
        ...props.pager,
      },
    }),
  );
  const withGetHrefHandler = withHandlers({
    getHref:
      (props: PageLoaderPropsInner) =>
      (
        currentIndex: number,
        routePathname: string,
        query: Record<string, any>,
      ) =>
        doGetHref(props, currentIndex, routePathname, query),
  });

  return compose<any, any>(
    withPagerFunctionality,
    withGetHrefHandler,
  )(PageLoader);
};

export default PageLoaderFactory;
