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
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/beobachter/screens/App/ */
import { GET_COMMENTS } from './queries';
import styles from './styles.legacy.css';
import grid from '../../../../../common/assets/styles/grid.legacy.css';

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
    Container: '',
    Column: classNames(grid.ColXs22, grid.ColOffsetXs1),
    Counter: styles.Counter,
    Icon: styles.Icon,
    Inner: styles.Inner,
    Pager: styles.Pager,
    Title: styles.Title,
    Info: styles.Info,
    TitleWrapper: styles.TitleWrapper,
    ViafouraContainer: styles.ViafouraContainer,
  },
});
