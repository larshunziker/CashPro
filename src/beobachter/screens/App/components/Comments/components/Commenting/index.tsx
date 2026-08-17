import classNames from 'classnames';
import commentingFactory from '../../../../../../../common/components/Comments/components/Commenting/factory';
import CommentForm from '../../../Comments/components/CommentForm';
import Icon from '../../../Icon';
import styles from './styles.legacy.css';
import type {
  CommentingFactoryOptionsStyles,
  CommentingProps,
} from '../../../../../../../common/components/Comments/components/Commenting/typings';

type CommentingPropsInner = CommentingProps & {
  isCommentingVisible: boolean;
  setCommentingVisible: Function;
  toggleCommentingVisibility: Function;
};

export const getStyleByProps = (
  props: CommentingPropsInner,
): CommentingFactoryOptionsStyles => {
  const { isCommentingVisible }: CommentingPropsInner = props;
  return {
    Icon: styles.Icon,
    IconChevronUpActive: styles.IconChevronUpActive,
    Logout: styles.Logout,
    Status: styles.Status,
    StatusWrapper: classNames(
      { [styles.StatusWrapperVisible]: isCommentingVisible },
      { [styles.StatusWrapper]: !isCommentingVisible },
    ),
    Title: styles.Title,
    Wrapper: classNames(styles.Wrapper, {
      [styles.isOpen]: isCommentingVisible,
    }),
  };
};

export default commentingFactory({
  Icon,
  CommentForm,
  styles: getStyleByProps,
  loginMessage: 'Melden Sie sich an und diskutieren Sie mit.',
});
