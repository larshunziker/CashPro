/* istanbul ignore file */
import React from 'react';
import commentSetUsernameFormFactory from '../../../../../../../common/components/Comments/components/CommentSetUsernameForm/factory';
import ButtonWithLoading from '../../../ButtonWithLoading';
import styles from './styles.legacy.css';
import { ButtonWithLoadingType } from '../../../../../../../common/components/ButtonWithLoading/typings';

const Button: ButtonWithLoadingType = ({ clickHandler, text }) => (
  <ButtonWithLoading onClick={clickHandler} loading={false}>
    {text}
  </ButtonWithLoading>
);

const CommentSetUsernameForm = commentSetUsernameFormFactory({
  styles: {
    ButtonWrapper: styles.ButtonWrapper,
    Message: styles.Message,
  },
  Button,
});

export default CommentSetUsernameForm;
