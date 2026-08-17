import React, { memo, useCallback } from 'react';
import { connect } from 'react-redux';

import { compose } from 'recompose';
import { getRCTrackingSource } from '../../../shared/helpers/getRCTrackingSource';
import authStateSelector from '../../../shared/selectors/authStateSelector';
import pianoStateSelector from '../../../shared/selectors/pianoStateSelector';
import { Auth0 } from '../Auth0Provider';
import { LoginCase } from '../Auth0Provider/typings';
import { LoginFormFactoryOptions, LoginFormProps } from './typings';

type LoginFormPropsInner = LoginFormProps & {
  isAuthenticated: boolean;
  pageMetadata: PianoPageMetadata & { webFormId?: string };
};

const loginFormFactory = ({
  styles,
  Button: ButtonWithLoading,
  Icon,
  iconType = 'IconServices',
  loginText = 'Anmelden',
  provideUsernameText = 'Profil bearbeiten',
}: LoginFormFactoryOptions) => {
  const LoginForm = ({
    message = 'Bitte melden Sie sich an.',
    isDefaultLoginCase = false,
    isAuthenticated,
    pageMetadata,
    isCommentForm = false,
    webFormId = '',
    oneLogLoginCase,
    redirectPath,
  }: LoginFormPropsInner) => {
    if (!isCommentForm) {
      pageMetadata.webFormId = webFormId;
    }

    const source = isCommentForm
      ? getRCTrackingSource('comments', pageMetadata)
      : getRCTrackingSource('webform', pageMetadata);

    const redirectToLoginScreen = useCallback(
      /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
      (event) => {
        const loginCase: LoginCase =
          (!isDefaultLoginCase && oneLogLoginCase) ||
          (isDefaultLoginCase && 'email_only') ||
          'general';
        event.preventDefault();
        Auth0.login(loginCase, source, redirectPath);
      },
      [isDefaultLoginCase, source, oneLogLoginCase, redirectPath],
    );

    const button = ButtonWithLoading && (
      <ButtonWithLoading
        clickHandler={redirectToLoginScreen}
        text={!isAuthenticated ? loginText : provideUsernameText}
      />
    );
    const buttonJsx = button || (
      <button
        className={styles.Button}
        onClick={redirectToLoginScreen}
        data-testid="loginform-button"
        role="link"
      >
        {!isAuthenticated ? loginText : provideUsernameText}
      </button>
    );

    return (
      <form className={styles.LoginFormWrapper || ''}>
        {(Icon && <Icon type={iconType} addClass={styles.Icon} />) || ''}
        {message && (
          <p
            className={styles.Message}
            data-testid="loginform-message"
            dangerouslySetInnerHTML={{ __html: message }}
          ></p>
        )}
        {buttonJsx}
      </form>
    );
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
  const mapStateToProps = (state) => ({
    isAuthenticated: authStateSelector(state).isAuthenticated,
    pageMetadata: pianoStateSelector(state).pageMetadata,
  });

  return compose<any, any>(connect(mapStateToProps))(
    memo<LoginFormPropsInner>(LoginForm),
  );
};

export default loginFormFactory;
