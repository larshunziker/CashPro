/* istanbul ignore file */

import React, { ComponentType, ReactElement } from 'react';
import { useMutation } from '@apollo/client';
import commentFormFactory from '../../../../../../../common/components/Comments/components/CommentForm/factory';
import ArrowButton from '../../../ArrowButton';
import Icon from '../../../Icon';
import LoginForm from '../../../LoginForm';
import CommentSetUsernameForm from '../CommentSetUsernameForm';
import InputField from '../InputField';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './mutations'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illustriert */
import { SUBMIT_COMMENT } from './mutations';
import styles from './styles.legacy.css';
import { ButtonWithLoadingType } from '../../../../../../../common/components/ButtonWithLoading/typings';
import { CommentFormProps } from '../../../../../../../common/components/Comments/components/CommentForm/typings';

/* @ts-ignore TODO: TS7031 ->  Binding element 'successMessage' implicitly has an 'any' type. */
const appSuccessMessageBox = ({ successMessage }): ReactElement => (
  <div className={styles.SuccessWrapper}>
    <div className={styles.SuccessContent}>
      <span className={styles.SuccessTitle}>Vielen Dank für deinen Input!</span>
      <Icon type={'IconCircleCheckSolid'} addClass={styles.SuccessIcon} />
      <span className={styles.SuccessMessage}>{successMessage}</span>
    </div>
  </div>
);

const Button: ButtonWithLoadingType = ({
  clickHandler,
  text,
  isLoading,
}): ReactElement => (
  <div className={styles.ButtonWrapper}>
    <button
      disabled={isLoading}
      className={styles.Button}
      onClick={clickHandler}
      data-testid="loginform-button"
      role="link"
    >
      <ArrowButton large>{text}</ArrowButton>
    </button>
  </div>
);

const CommentFormComponent = commentFormFactory({
  InputField,
  CommentLoginForm: LoginForm,
  CommentSetUsernameForm,
  Button,
  appSuccessMessageBox,
  appSuccessMessage:
    'Wir werden den Eintrag prüfen und so schnell wie möglich freischalten, sofern er unseren Richtlinien entspricht.',
  styles: {
    Button: styles.Button,
    InputField: styles.InputField,
    Label: styles.Label,
    LabelAbove: styles.LabelAbove,
    SuccessMessage: styles.SuccessMessage,
  },
});

const CommentForm: ComponentType<Omit<CommentFormProps, 'mutate'>> = (
  props,
) => {
  const [submitComment] = useMutation(SUBMIT_COMMENT);
  return <CommentFormComponent {...props} mutate={submitComment} />;
};

export default CommentForm;
