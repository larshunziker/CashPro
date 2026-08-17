import React, { ReactElement, SyntheticEvent, memo, useCallback } from 'react';
import classNames from 'classnames';
import { noop } from '../../../../../shared/helpers/utils';
import { Auth0 } from '../../../../../common/components/Auth0Provider';
import { AUTH0_LOGIN_CASE_COMMENTING } from '../../../../../common/components/Auth0Provider/constants';
import grid from '../../../../assets/styles/grid.legacy.css';
import type {
  CommentSetUsernameFormComponent,
  CommentSetUsernameFormFactoryOptions,
  CommentSetUsernameFormProps,
} from './typings';

type CommentSetUsernameFormPropsInner = CommentSetUsernameFormProps;

const CommentSetUsernameFormFactory = ({
  styles,
  /* @ts-ignore TODO: TS2322 ->  Type '() => null' is not assignable to type '({ clickHandler, text, } */
  Button: ButtonWithLoading = noop,
  commentUsernameMessage = 'Um kommentieren zu können, hinterlegen Sie bitte einen Benutzernamen.',
}: CommentSetUsernameFormFactoryOptions): CommentSetUsernameFormComponent => {
  const CommentSetUsernameForm = ({
    message = commentUsernameMessage,
  }: CommentSetUsernameFormPropsInner): ReactElement => {
    const redirectToProfilePage = useCallback((event: SyntheticEvent) => {
      event.preventDefault();

      Auth0.login(AUTH0_LOGIN_CASE_COMMENTING);
    }, []);

    const button = (
      <ButtonWithLoading
        clickHandler={redirectToProfilePage}
        text={'Benutzernamen hinterlegen'}
      />
    );

    const buttonJsx: ReactElement = button || (
      <button
        className={classNames(styles.Button, grid.HideForPrint)}
        onClick={redirectToProfilePage}
        data-testid="commentsetusernameform-button"
        role="link"
      >
        Benutzernamen hinterlegen
      </button>
    );
    return (
      <form>
        {message && <p className={styles.Message}>{message}</p>}
        <div className={styles.ButtonWrapper}>{buttonJsx}</div>
      </form>
    );
  };

  return memo<CommentSetUsernameFormPropsInner>(CommentSetUsernameForm);
};

export default CommentSetUsernameFormFactory;
