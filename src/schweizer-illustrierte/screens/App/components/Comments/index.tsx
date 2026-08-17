/* istanbul ignore file */

import React, { ReactElement } from 'react';
import classNames from 'classnames';
import commentsFactory from '../../../../../common/components/Comments/factory';
import { hasNextPage } from '../Pager/shared/helpers';
import { setCount as setCommentsCountAction } from '../../../../../shared/actions/comment';
import Comment from '../Comments/components/Comment';
import CommentSort from '../Comments/components/CommentSort';
import Commenting from '../Comments/components/Commenting';
import Icon from '../Icon';
import {
  PAGER_TYPE_LAZY_LOADING as pagerType,
  default as Pager,
} from '../Pager';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../Comments/queries'. '/Users/bhs/code/work/rasch-stack/src/schweizer-ill */
import { GET_COMMENTS } from '../Comments/queries';
import styles from './styles.legacy.css';
import grid from '../../../../../common/assets/styles/grid.legacy.css';

/**
 *  We implemented the lazyLoader in different way on SI
 *  thats why we pass the pager as jsx to the factory.
 */
const getPagerJsx = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'currentPage' implicitly has an 'any' type. */
  currentPage,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'updatePage' implicitly has an 'any' type. */
  updatePage,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'itemsCount' implicitly has an 'any' type. */
  itemsCount,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'itemsPerPage' implicitly has an 'any' type. */
  itemsPerPage,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'text' implicitly has an 'any' type. */
  text,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'isLoading' implicitly has an 'any' type. */
  isLoading,
}): ReactElement => (
  <Pager
    component={pagerType}
    isLoading={isLoading}
    loadMore={() => {
      updatePage(currentPage + 1);
    }}
    hasMoreResults={hasNextPage(currentPage, itemsCount, itemsPerPage)}
  >
    {text}
  </Pager>
);
export default commentsFactory({
  grid,
  Icon,
  Comment,
  Commenting,
  CommentSort,
  Pager,
  pagerType,
  setCommentsCountAction,
  GET_COMMENTS,
  pager: getPagerJsx,
  styles: {
    Container: '',
    Column: classNames(grid.ColXs24),
    Icon: styles.Icon,
    Inner: styles.Inner,
    Pager: styles.Pager,
    Title: styles.Title,
    Counter: styles.Counter,
    Info: styles.Info,
    TitleWrapper: styles.TitleWrapper,
    ViafouraContainer: styles.ViafouraContainer,
  },
});
