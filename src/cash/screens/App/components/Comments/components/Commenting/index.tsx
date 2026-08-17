import classNames from 'classnames';
import commentingFactory from '../../../../../../../common/components/Comments/components/Commenting/factory';
import CommentForm from '../../../Comments/components/CommentForm';
import Icon from '../../../Icon';
import styles from './styles.legacy.css';
import {
  CommentingFactoryOptionsStyles,
  CommentingProps,
} from '../../../../../../../common/components/Comments/components/Commenting/typings';

type CommentingPropsInner = CommentingProps & {
  isCommentingVisible: boolean;
  setCommentingVisible: (isCommentingVisible: boolean) => void;
  toggleCommentingVisibility: () => void;
};

const getStyleByProps = (
  props: CommentingPropsInner,
): CommentingFactoryOptionsStyles => {
  const { isCommentingVisible }: CommentingPropsInner = props;
  return {
    Icon: styles.Icon,
    IconChevronUpActive: styles.IconChevronUpActive,
    Logout: styles.Logout,
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
});
