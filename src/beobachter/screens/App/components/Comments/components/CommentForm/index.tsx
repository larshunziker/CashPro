/* istanbul ignore file */

import React, { ComponentType } from 'react';
import { useMutation } from '@apollo/client';
import commentFormFactory from '../../../../../../../common/components/Comments/components/CommentForm/factory';
import CommentSetUsernameForm from '../../../Comments/components/CommentSetUsernameForm';
import InputField from '../../../InputField';
import LoginForm from '../../../LoginForm';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './mutations'. '/Users/bhs/code/work/rasch-stack/src/beobachter/screens/Ap */
import { SUBMIT_COMMENT } from './mutations';
import ButtonWithLoading from '../../../ButtonWithLoading';
import styles from './styles.legacy.css';
import { ButtonWithLoadingType } from '../../../../../../../common/components/ButtonWithLoading/typings';
import { CommentFormProps } from '../../../../../../../common/components/Comments/components/CommentForm/typings';

const Button: ButtonWithLoadingType = ({ clickHandler, text, isLoading }) => (
  <div>
    <p className={styles.InfoHeading}>Wichtig:</p>

    <p className={styles.Info}>
      Beachten Sie bitte, dass Ihr Kommentar unter Ihrem Vor- und Nachnamen
      erscheint.
    </p>

    <ButtonWithLoading onClick={clickHandler} role="link" loading={isLoading}>
      {text}
    </ButtonWithLoading>
  </div>
);

const CommentFormComponent = commentFormFactory({
  isFullnameRequired: true,
  InputField,
  CommentLoginForm: LoginForm,
  CommentSetUsernameForm,
  Button,
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
