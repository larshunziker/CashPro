import classNames from 'classnames';
import commentRepliesFactory from '../../../../../../../common/components/Comments/components/CommentReplies/factory';
import CommentReply from '../../../Comments/components/CommentReply';
import Icon from '../../../Icon';
import styles from './styles.legacy.css';
import type {
  CommentRepliesFactoryOptionsStyles,
  CommentRepliesProps,
} from '../../../../../../../common/components/Comments/components/CommentReplies/typings';

type CommentRepliesPropsInner = CommentRepliesProps & {
  areRepliesVisible: boolean;
  commentCount: number;
  setRepliesVisible: Function;
  toggleRepliesVisibility: Function;
};

export const getStylesByProps = (
  props: CommentRepliesPropsInner,
): CommentRepliesFactoryOptionsStyles => {
  const { areRepliesVisible }: CommentRepliesPropsInner = props;
  return {
    Icon: styles.Icon,
    RepliesWrapper: classNames({ [styles.Hidden]: !areRepliesVisible }),
    ToggleLink: styles.ToggleLink,
    Toggle: styles.Toggle,
    Wrapper: styles.Wrapper,
  };
};

export default commentRepliesFactory({
  Icon,
  CommentReply,
  styles: getStylesByProps,
});
