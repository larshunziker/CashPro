import React, { ReactElement } from 'react';
import { IntlShape, defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import withHandlers from 'recompose/withHandlers';
import withPropsOnChange from 'recompose/withPropsOnChange';
import classNames from 'classnames';
import {
  generatePaginationItems,
  hasNextPage,
  hasPreviousPage,
} from '../../shared/helpers';
import locationStateSelector from '../../../../../../../shared/selectors/locationStateSelector';
import Link from '../../../../../../../common/components/Link';
import Icon from '../../../Icon';
import { MAX_TOTALPAGES } from '../../../../../../../shared/constants/pager';
import gaultMillauIcons from '../../../../assets/styles/gaultMillau.legacy.css';
import styles from './styles.legacy.css';
import { PageLoaderProps } from './typings';

type PageLoaderPagerProps = {
  hasNextPage: () => boolean;
  hasPreviousPage: () => boolean;
  totalPages: number;
};

type PageLoaderPropsInner = PageLoaderProps & {
  pager: PageLoaderPagerProps;
  Button: Function;
  ButtonPrevious: Function;
  ButtonNext: Function;
  getHref: (currentIndex: number) => string;
  routeQuery: Object;
  routePathname: string;
  queryStringName: string;
  intl: IntlShape;
};

type ButtonPreviousProps = {
  props: PageLoaderPropsInner;
};

type ButtonNextProps = {
  props: PageLoaderPropsInner;
};

type ButtonProps = {
  props: PageLoaderPropsInner;
  elementKey?: string;
  label: string;
};

const MAX_VISIBLE_PAGES = 7;

const msgs = defineMessages({
  prevLabel: {
    id: 'pageloader.pagination.previous',
    description: 'The default label for previous page',
    defaultMessage: 'zurück',
  },
  nextLabel: {
    id: 'pageloader.pagination.next',
    description: 'The default text for next page',
    defaultMessage: 'weiter',
  },
});

const doGetHref: Function = (
  props: PageLoaderPropsInner,
  currentIndex: number,
) => {
  if (
    !currentIndex ||
    Number.isNaN(currentIndex) ||
    !props ||
    !props.routePathname ||
    !props.routeQuery ||
    currentIndex > MAX_TOTALPAGES
  ) {
    return undefined;
  }

  const searchQuery = {
    ...props.routeQuery,
    [props.queryStringName]: currentIndex,
  };

  if (currentIndex === 1) {
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ constructor */
    delete searchQuery[props.queryStringName];
  }

  const search = Object.keys(searchQuery)
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ constructor */
    .map((value) => `${value}=${searchQuery[value]}`)
    .join('&');

  return `${props.routePathname}${(search && '?' + search) || ''}`;
};

export const ButtonPrevious = ({
  props,
}: ButtonPreviousProps): ReactElement => {
  const hasPreviousPage = props.pager.hasPreviousPage();
  const pageNumber = hasPreviousPage ? props.currentPage - 1 : 0;
  const path = props.getHref(pageNumber);
  const isPlaceholder = !path;
  return (
    <Link
      path={path}
      className={classNames('page-loader-prev-btn', styles.PrevLabel, {
        [styles.Disabled]: !hasPreviousPage,
        [styles.PagerPlaceholder]: isPlaceholder,
      })}
      label={props.intl.formatMessage(msgs.prevLabel)}
    />
  );
};

export const ButtonNext = ({ props }: ButtonNextProps): ReactElement => {
  const hasNextPage = props.pager.hasNextPage();
  const pageNumber = props.pager.hasNextPage() ? props.currentPage + 1 : 0;
  const path = props.getHref(pageNumber);
  const isPlaceholder = !path;

  return (
    <Link
      path={path}
      className={classNames('page-loader-next-btn', styles.NextLabel, {
        [styles.Disabled]: !hasNextPage || props.currentPage === MAX_TOTALPAGES,
        [styles.PagerPlaceholder]: isPlaceholder,
      })}
      label={props.intl.formatMessage(msgs.nextLabel)}
    />
  );
};

export const Button = ({
  props,
  elementKey,
  label,
}: ButtonProps): ReactElement => {
  const index =
    (!Number.isNaN(parseInt(label, 10)) && parseInt(label, 10)) || 0;
  const path = props.getHref(index);
  const isPlaceholder = !path;

  return (
    <Link
      key={`page-loader-button-${elementKey || label}`}
      path={path}
      className={classNames('page-loader-btn', styles.PageLink, {
        [styles.ActiveItem]: props.currentPage === index,
        [styles.PagerPlaceholder]: isPlaceholder,
      })}
      label={label}
    />
  );
};

export const getStartPage = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number,
) => {
  const pageRange = Math.floor(maxVisiblePages / 2);

  if (totalPages < maxVisiblePages) {
    return 1;
  }

  if (currentPage - pageRange < 1) {
    return 1;
  }

  if (currentPage + pageRange > totalPages && totalPages > maxVisiblePages) {
    return totalPages - maxVisiblePages + 1;
  }

  return currentPage - pageRange;
};

const PageLoader = ({
  pager,
  currentPage = 0,
  ButtonPrevious,
  ButtonNext,
  Button,
}: PageLoaderPropsInner): ReactElement | null => {
  if (pager.totalPages < 2) {
    return null;
  }

  const totalPages =
    pager.totalPages > MAX_TOTALPAGES ? MAX_TOTALPAGES : pager.totalPages;

  const startPage = getStartPage(currentPage, totalPages, MAX_VISIBLE_PAGES);

  return (
    <div className={styles.Wrapper}>
      {/* PREV Arrow */}
      {ButtonPrevious()}

      <Icon
        addClass={styles.PrevSlash}
        type="IconSlash"
        iconsOverride={gaultMillauIcons}
      />

      {/* RENDER VISIBLE PAGES */}
      {generatePaginationItems(
        currentPage,
        totalPages,
        startPage,
        MAX_VISIBLE_PAGES,
      ).map((item, index) => Button(item, index + 1))}

      <Icon
        addClass={styles.NextSlash}
        type="IconSlash"
        iconsOverride={gaultMillauIcons}
      />

      {/* NEXT Arrow */}
      {ButtonNext()}
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  routePathname:
    locationStateSelector(state).locationBeforeTransitions.pathname,
  routeQuery: locationStateSelector(state).locationBeforeTransitions.query,
});

const withTotalPages = withPropsOnChange(
  (props: PageLoaderPropsInner, nextProps: PageLoaderPropsInner): boolean =>
    props.currentPage !== nextProps.currentPage,
  (props: PageLoaderPropsInner) => ({
    pager: {
      /* @ts-ignore TODO: TS2783 ->  'totalPages' is specified more than once, so this usage will be overwritten. */
      totalPages: Math.ceil(props.itemsCount / props.itemsPerPage),
      ...props.pager,
    },
  }),
);

const withPagerFunctionality = withPropsOnChange(
  (props: PageLoaderPropsInner, nextProps: PageLoaderPropsInner): boolean =>
    props.itemsCount !== nextProps.itemsCount ||
    props.currentPage !== nextProps.currentPage,
  (props: PageLoaderPropsInner) => ({
    pager: {
      ...props.pager,
      totalPages: Math.ceil(props.itemsCount / props.itemsPerPage),
      hasNextPage: () =>
        hasNextPage(props.currentPage, props.itemsCount, props.itemsPerPage),
      hasPreviousPage: () => hasPreviousPage(props.currentPage),
    },
  }),
);

const withGetHrefHandler = withHandlers({
  getHref: (props: PageLoaderPropsInner) => (currentIndex: number) =>
    doGetHref(props, currentIndex),
});

const withRenderButton = withHandlers({
  Button:
    (props: PageLoaderPropsInner) =>
    (index: number, elementKey?: string): ReactElement => (
      <Button props={props} elementKey={elementKey} label={index.toString()} />
    ),
  ButtonPrevious: (props: PageLoaderPropsInner) => (): ReactElement => (
    <ButtonPrevious props={props} />
  ),
  ButtonNext: (props: PageLoaderPropsInner) => (): ReactElement => (
    <ButtonNext props={props} />
  ),
});

const withDefaultProps = defaultProps({
  queryStringName: 'page',
});

export default compose<any, any>(
  injectIntl,
  connect(mapStateToProps),
  withDefaultProps,
  withTotalPages,
  withPagerFunctionality,
  withGetHrefHandler,
  withRenderButton,
)(PageLoader);
