/* istanbul ignore file */

import subscribeButtonFactory from '../../../../../common/components/SubscribeButton/factory';
import Icon from '../Icon';
import { Auth0 } from '../../../../../common/components/Auth0Provider';
import { displayErrorToast, displayInfoToast } from '../Toast';
import {
  AUTHORIZATION_ERROR_ID,
  AUTHORIZATION_INFO_ID,
  AUTHORIZATION_INFO_MESSAGE,
  AUTHORIZATION_LINK_TEXT,
  AUTHORIZATION_SESSION_EXPIRED_ERROR_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
  LIMIT_EXCEEDED_ERROR_ID,
  LIMIT_EXCEEDED_ERROR_LINK_PATH,
  LIMIT_EXCEEDED_ERROR_LINK_TEXT,
  LIMIT_EXCEEDED_ERROR_MESSAGE,
} from '../Toast/constants';
import styles from './styles.legacy.css';
import {
  SubscribeButtonProps,
  SubscribeButtonToastService,
} from '../../../../../common/components/SubscribeButton/typings';

const getToastInstanceByProps = ({
  source = '',
}: SubscribeButtonProps): SubscribeButtonToastService => ({
  displayDefaultErrorToast: () =>
    displayErrorToast(DEFAULT_ERROR_MESSAGE, 'default-error'),
  displayAuthenticationErrorToast: () =>
    displayErrorToast(
      AUTHORIZATION_SESSION_EXPIRED_ERROR_MESSAGE,
      AUTHORIZATION_ERROR_ID,
      {
        text: AUTHORIZATION_LINK_TEXT,
        onClick: () => Auth0.login(undefined, source),
      },
    ),
  displayLimitExceededToast: () =>
    displayErrorToast(LIMIT_EXCEEDED_ERROR_MESSAGE, LIMIT_EXCEEDED_ERROR_ID, {
      text: LIMIT_EXCEEDED_ERROR_LINK_TEXT,
      path: LIMIT_EXCEEDED_ERROR_LINK_PATH,
    }),
  displayAuthenticationInfoToast: () =>
    displayInfoToast(AUTHORIZATION_INFO_MESSAGE, AUTHORIZATION_INFO_ID, {
      text: AUTHORIZATION_LINK_TEXT,
      onClick: () => Auth0.login(undefined, source),
    }),
});

export default subscribeButtonFactory({
  styles: {
    SubscribeButtonWrapper: styles.SubscribeButtonWrapper,
    LightTheme: styles.LightTheme,
    Text: styles.Text,
    Icon: styles.Icon,
    Active: styles.Active,
    Animating: '',
  },
  Icon,
  ToastService: getToastInstanceByProps,
});
