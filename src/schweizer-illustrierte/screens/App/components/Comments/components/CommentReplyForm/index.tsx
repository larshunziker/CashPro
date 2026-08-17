import classNames from 'classnames';
import commentReplyFormFactory from '../../../../../../../common/components/Comments/components/CommentReplyForm/factory';
import CommentForm from '../../../Comments/components/CommentForm';
import CommentReplyLink from '../../../Comments/components/CommentReplyLink';
import styles from './styles.legacy.css';
import type {
  CommentReplyFormFactoryOptionsStyles,
  CommentReplyFormProps,
} from '../../../../../../../common/components/Comments/components/CommentReplyForm/typings';
type CommentReplyFormPropsInner = CommentReplyFormProps & {
  isFormVisible: boolean;
  setFormVisibility: (isFormVisible: boolean) => void;
  toggleFormVisibility: () => void;
};

export const getStylesByProps = ({
  isFormVisible,
}: CommentReplyFormPropsInner): CommentReplyFormFactoryOptionsStyles => {
  return {
    Form: styles.Form,
    FormWrapper: classNames(
      { [styles.FormWrapperVisible]: isFormVisible },
      { [styles.FormWrapper]: !isFormVisible },
    ),
  };
};

export default commentReplyFormFactory({
  CommentForm,
  CommentReplyLink,
  styles: getStylesByProps,
  placeholder: 'Schreibe hier deine Antwort...',
  loginMessage: 'Bitte melde dich an, um %s zu antworten.',
});
