/* istanbul ignore file */

//  this component is currently used for the alertsprofile and webforms with auth restriction

import React from 'react';
import loginFormFactory from '../../../../../../../common/components/LoginForm/factory';
import { noop } from '../../../../../../../shared/helpers/utils';
import ArrowButton from '../../../../components/ArrowButton';
import styles from './styles.legacy.css';
import { ButtonWithLoadingType } from '../../../../../../../common/components/ButtonWithLoading/typings';

const Button: ButtonWithLoadingType = ({ clickHandler = noop, text }) => {
  return (
    <div
      className={styles.ButtonWrapper}
      onClick={clickHandler}
      role="button"
      tabIndex={-1}
      onKeyDown={clickHandler}
    >
      <ArrowButton large>{text}</ArrowButton>
    </div>
  );
};

export default loginFormFactory({
  styles: {
    LoginFormWrapper: styles.LoginFormWrapper,
    Button: '',
    Message: styles.Message,
  },
  Button,
});
