/* istanbul ignore file */

import React, { ComponentType } from 'react';
import { useMutation } from '@apollo/client';
import commentFormFactory from '../../../../../../../common/components/Comments/components/CommentForm/factory';
import ButtonWithLoading from '../../../ButtonWithLoading';
import CommentSetUsernameForm from '../../../Comments/components/CommentSetUsernameForm';
import InputField from '../../../InputField';
import LoginForm from '../../../LoginForm';
import CommentSuccessMessage from '../CommentSuccessMessage';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './mutations'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screen */
import { SUBMIT_COMMENT } from './mutations';
import styles from './styles.legacy.css';
import { ButtonWithLoadingType } from '../../../../../../../common/components/ButtonWithLoading/typings';
import { CommentFormProps } from '../../../../../../../common/components/Comments/components/CommentForm/typings';

const getLoginFormByProps = () => (
  <LoginForm
    message="Melden Sie sich an und diskutieren Sie mit."
    isCommentForm={true}
  />
);

const Button: ButtonWithLoadingType = ({ clickHandler, text, isLoading }) => (
  <ButtonWithLoading onClick={clickHandler} loading={isLoading}>
    {text}
  </ButtonWithLoading>
);

const CommentFormComponent = commentFormFactory({
  InputField,
  CommentLoginForm: getLoginFormByProps,
  appSuccessMessageBox: CommentSuccessMessage,
  appSuccessMessage:
    'Wir werden den Eintrag prüfen und so schnell wie möglich freischalten, sofern er unseren Richtlinien entspricht.',
  CommentSetUsernameForm,
  styles: {
    InputField: styles.InputField,
    Label: styles.Label,
    LabelAbove: styles.LabelAbove,
    SuccessMessage: styles.SuccessMessage,
  },
  Button,
});

const CommentForm: ComponentType<Omit<CommentFormProps, 'mutate'>> = (
  props,
) => {
  const [submitComment] = useMutation(SUBMIT_COMMENT);
  return <CommentFormComponent {...props} mutate={submitComment} />;
};

export default CommentForm;
