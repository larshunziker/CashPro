import React, { ReactElement } from 'react';
import commentSetUsernameFormFactory from '../../../../../../../common/components/Comments/components/CommentSetUsernameForm/factory';
import ButtonWithLoading from '../../../ButtonWithLoading';
import styles from './styles.legacy.css';
import { ButtonWithLoadingType } from '../../../../../../../common/components/ButtonWithLoading/typings';

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

export default commentSetUsernameFormFactory({
  Button,
  commentUsernameMessage:
    'Um kommentieren zu können, hinterlege bitte einen Benutzernamen.',
  styles: {
    Button: styles.Button,
    ButtonWrapper: styles.ButtonWrapper,
    Message: styles.Message,
  },
});
