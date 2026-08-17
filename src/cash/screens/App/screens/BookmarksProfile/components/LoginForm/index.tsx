import React from 'react';
import loginFormFactory from '../../../../../../../common/components/LoginForm/factory';
import ButtonWithLoading from '../../../../components/ButtonWithLoading';
import styles from './styles.legacy.css';
import { ButtonWithLoadingType } from '../../../../../../../common/components/ButtonWithLoading/typings';

const Button: ButtonWithLoadingType = ({
  clickHandler,
  text,
  isLoading = false,
}) => (
  <ButtonWithLoading onClick={clickHandler} loading={isLoading}>
    {text}
  </ButtonWithLoading>
);

export default loginFormFactory({
  styles: {
    LoginFormWrapper: styles.LoginFormWrapper,
    Message: styles.Message,
  },
  Button,
});
