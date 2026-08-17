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
  setCommentingVisible: (isCommentingVisible: boolean) => void;
  toggleCommentingVisibility: () => void;
  username: string;
};

export const getStyleByProps = ({
  isCommentingVisible,
  username,
}: CommentingPropsInner): CommentingFactoryOptionsStyles => {
  return {
    Icon: styles.Icon,
    IconChevronUpActive: styles.IconChevronUpActive,
    Logout: styles.Logout,
    Status: styles.Status,
    StatusWrapper: classNames(
      { [styles.InnerWrapper]: !username },
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
  commentTitle: 'Dein Kommentar',
  loginMessage: 'Bitte melde dich an, um diesen Artikel zu kommentieren.',
  commentFormLabel: 'Schreibe hier deinen Kommentar...',
  Icon,
  CommentForm,
  styles: getStyleByProps,
});
