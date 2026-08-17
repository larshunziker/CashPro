/* istanbul ignore file */

import classNames from 'classnames';
import commentsFactory from '../../../../../common/components/Comments/factory';
import { setCount as setCommentsCountAction } from '../../../../../shared/actions/comment';
import Comment from '../Comments/components/Comment';
import CommentSort from '../Comments/components/CommentSort';
import Commenting from '../Comments/components/Commenting';
import Icon from '../Icon';
import {
  PAGER_TYPE_LAZY_LOADER as pagerType,
  default as Pager,
} from '../Pager';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../Comments/queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/ */
import { GET_COMMENTS } from '../Comments/queries';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

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
  styles: {
    Container: styles.Container,
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
