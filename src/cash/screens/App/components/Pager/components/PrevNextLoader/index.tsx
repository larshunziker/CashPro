import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import withHandlers from 'recompose/withHandlers';
import withPropsOnChange from 'recompose/withPropsOnChange';
import { hasNextPage, hasPreviousPage } from '../../shared/helpers';
import locationStateSelector from '../../../../../../../shared/selectors/locationStateSelector';
import withNavigate, {
  WithNavigateProps,
} from '../../../../../../../shared/decorators/withNavigate';
import Button from '../../../ButtonWithLoading';
import styles from './styles.legacy.css';
import { PrevNextLoaderProps } from './typings';

type PrevNextLoaderPagerProps = {
  hasNextPage: () => boolean;
  hasPreviousPage: () => boolean;
  totalPages: number;
};

type PrevNextLoaderPropsInner = WithNavigateProps &
  PrevNextLoaderProps & {
    pager: PrevNextLoaderPagerProps;
    renderButton: Function;
    renderButtonPrevious: Function;
    renderButtonNext: Function;
    getHref: (currentIndex: number) => string;
    queryStringName: string;
    routePathname: string;
    routeQuery: Object;
  };

const doGetHref = (props: PrevNextLoaderPropsInner, currentIndex: number) => {
  if (
    !currentIndex ||
    Number.isNaN(currentIndex) ||
    !props ||
    !props.routePathname ||
    !props.routeQuery
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

  const anchorScrollId = props.anchorScrollId ? `#${props.anchorScrollId}` : '';

  return `${props.routePathname}${
    (search && '?' + search) || ''
  }${anchorScrollId}`;
};

const doRenderButtonPrevious = (
  props: PrevNextLoaderPropsInner,
): ReactElement => (
  <Button
    onClick={() =>
      props.navigate(
        props.getHref(
          (props.pager.hasPreviousPage() && props.currentIndex - 1) || 0,
        ),
      )
    }
    variant="secondary"
  >
    Zum vorherigen Kapitel
  </Button>
);

const doRenderButtonNext = (props: PrevNextLoaderPropsInner): ReactElement => (
  <Button
    onClick={() =>
      props.navigate(
        props.getHref(
          (props.pager.hasNextPage() && props.currentIndex + 1) || 0,
        ),
      )
    }
  >
    Zum nächsten Kapitel
  </Button>
);

const PrevNextLoader = ({
  pager,
  renderButtonPrevious,
  renderButtonNext,
}: PrevNextLoaderPropsInner): ReactElement | null => {
  if (pager.totalPages < 2) {
    return null;
  }

  return (
    <div className={styles.Wrapper}>
      {pager.hasPreviousPage() && renderButtonPrevious()}
      {pager.hasNextPage() && renderButtonNext()}
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  routeQuery: locationStateSelector(state).locationBeforeTransitions.query,
  routePathname:
    locationStateSelector(state).locationBeforeTransitions.pathname,
});

const withPagerFunctionality = withPropsOnChange(
  (
    props: PrevNextLoaderPropsInner,
    nextProps: PrevNextLoaderPropsInner,
  ): boolean =>
    props.currentIndex !== nextProps.currentIndex ||
    props.itemsCount !== nextProps.itemsCount,
  (props: PrevNextLoaderPropsInner) => ({
    pager: {
      /* @ts-ignore TODO: TS2783 ->  'totalPages' is specified more than once, so this usage will be overwritten. */
      totalPages: props.itemsCount,
      /* @ts-ignore TODO: TS2783 ->  'hasNextPage' is specified more than once, so this usage will be overwritten. */
      hasNextPage: () => hasNextPage(props.currentIndex, props.itemsCount, 1),
      /* @ts-ignore TODO: TS2783 ->  'hasPreviousPage' is specified more than once, so this usage will be overwritten. */
      hasPreviousPage: () => hasPreviousPage(props.currentIndex),
      ...props.pager,
    },
  }),
);

const withGetHrefHandler = withHandlers({
  getHref: (props: PrevNextLoaderPropsInner) => (currentIndex: number) =>
    doGetHref(props, currentIndex),
});

const withRenderButton = withHandlers({
  renderButtonPrevious: (props: PrevNextLoaderPropsInner) => (): ReactElement =>
    doRenderButtonPrevious(props),
  renderButtonNext: (props: PrevNextLoaderPropsInner) => (): ReactElement =>
    doRenderButtonNext(props),
});

const withDefaultProps = defaultProps({
  queryStringName: 'page',
});

export default compose<any, any>(
  withNavigate,
  connect(mapStateToProps),
  withDefaultProps,
  withPagerFunctionality,
  withGetHrefHandler,
  withRenderButton,
)(PrevNextLoader);
