/* istanbul ignore file */

//  this component is currently used for comments and webforms with auth restriction

import React, { ReactElement } from 'react';
import loginFormFactory from '../../../../../common/components/LoginForm/factory';
import ButtonWithLoading from '../ButtonWithLoading';
import styles from './styles.legacy.css';
import { ButtonWithLoadingType as ButtonWithLoadingType } from '../../../../../common/components/ButtonWithLoading/typings';

const Button: ButtonWithLoadingType = ({
  clickHandler,
  text,
}): ReactElement => (
  <div className={styles.Button}>
    <ButtonWithLoading
      type="submit"
      ariaLabel="Senden"
      onClick={clickHandler}
      data-testid="loginform-button"
      role="link"
    >
      {text}
    </ButtonWithLoading>
  </div>
);

export default loginFormFactory({
  Button,
  styles: {
    Message: styles.Message,
  },
});
