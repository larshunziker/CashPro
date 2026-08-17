/* istanbul ignore file */
import React, { ComponentType } from 'react';
import loginFormFactory from '../../../../../common/components/LoginForm/factory';
import ButtonWithLoading from '../ButtonWithLoading';
import styles from './styles.legacy.css';
import { ButtonWithLoadingType } from '../../../../../common/components/ButtonWithLoading/typings';
import { LoginFormProps } from '../../../../../common/components/LoginForm/typings';

const Button: ButtonWithLoadingType = ({
  clickHandler,
  text,
  isLoading = false,
}) => (
  <ButtonWithLoading onClick={clickHandler} loading={isLoading}>
    {text}
  </ButtonWithLoading>
);

const LoginForm: ComponentType<LoginFormProps> = loginFormFactory({
  styles: {
    Message: styles.Message,
  },
  Button,
});

export default LoginForm;
