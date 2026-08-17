/* istanbul ignore file */

//  this component is currently used for comments and webforms with auth restriction

import React, { ReactElement } from 'react';
import loginFormFactory from '../../../../../common/components/LoginForm/factory';
import styles from './styles.legacy.css';
import { ButtonWithLoadingType } from '../../../../../common/components/ButtonWithLoading/typings';

const Button: ButtonWithLoadingType = ({ clickHandler }): ReactElement => (
  <button
    className={styles.Button}
    onClick={clickHandler}
    data-testid="loginform-button"
    role="link"
  >
    text
  </button>
);

export default loginFormFactory({
  Button,
  styles: {
    Button: styles.Button,
    Message: styles.Message,
  },
});
