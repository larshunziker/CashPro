/* istanbul ignore file */

import React, { SyntheticEvent } from 'react';
import commentSetUsernameFormFactory from '../../../../../../../common/components/Comments/components/CommentSetUsernameForm/factory';
import { Auth0 } from '../../../../../../../common/components/Auth0Provider';
import ButtonWithLoading from '../../../ButtonWithLoading';
import { AUTH0_LOGIN_CASE_GENERAL } from '../../../../../../../common/components/Auth0Provider/constants';
import styles from './styles.legacy.css';
import { ButtonWithLoadingType } from '../../../../../../../common/components/ButtonWithLoading/typings';

const Button: ButtonWithLoadingType = () => {
  const redirectToProfilePage = (event: SyntheticEvent) => {
    event.preventDefault();

    Auth0.login(AUTH0_LOGIN_CASE_GENERAL);
  };
  return (
    <ButtonWithLoading
      addClass={styles.Button}
      onClick={redirectToProfilePage}
      role="link"
    >
      Vor- und Nachname hinterlegen
    </ButtonWithLoading>
  );
};

export default commentSetUsernameFormFactory({
  Button,
  commentUsernameMessage: (
    <>
      Um kommentieren zu können, hinterlegen Sie bitte ihren Vor-&nbsp;und
      Nachnamen.
    </>
  ),
  styles: {
    Button: styles.Button,
    ButtonWrapper: styles.ButtonWrapper,
    Message: styles.Message,
  },
});
