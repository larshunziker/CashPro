/* istanbul ignore file */

import subscribeButtonFactory from '../../../../../common/components/SubscribeButton/factory';
import Icon from '../Icon';
import { Auth0 } from '../../../../../common/components/Auth0Provider';
import { displayErrorToast, displayInfoToast } from '../Toast';
import {
  AUTHORIZATION_ERROR_ID,
  AUTHORIZATION_ERROR_MESSAGE,
  AUTHORIZATION_INFO_ID,
  AUTHORIZATION_INFO_MESSAGE,
  AUTHORIZATION_LINK_TEXT,
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

const getToastInstancesByProps = ({
  source,
}: SubscribeButtonProps): SubscribeButtonToastService => ({
  displayAuthenticationErrorToast: () =>
    displayErrorToast(
      AUTHORIZATION_ERROR_MESSAGE,
      /* @ts-ignore TODO: TS2345 ->  Argument of type '{ text */
      {
        text: AUTHORIZATION_LINK_TEXT,
        onClick: () => Auth0.login(undefined, source),
      },
      AUTHORIZATION_ERROR_ID,
    ),
  displayDefaultErrorToast: () => displayErrorToast(),
  displayLimitExceededToast: () =>
    displayErrorToast(
      LIMIT_EXCEEDED_ERROR_MESSAGE,
      /* @ts-ignore TODO: TS2345 ->  Argument of type '{ text */
      {
        text: LIMIT_EXCEEDED_ERROR_LINK_TEXT,
        path: LIMIT_EXCEEDED_ERROR_LINK_PATH,
      },
      LIMIT_EXCEEDED_ERROR_ID,
    ),
  displayAuthenticationInfoToast: () =>
    displayInfoToast(
      AUTHORIZATION_INFO_MESSAGE,
      /* @ts-ignore TODO: TS2345 ->  Argument of type '{ text */
      {
        text: AUTHORIZATION_LINK_TEXT,
        onClick: () => Auth0.login(undefined, source),
      },
      AUTHORIZATION_INFO_ID,
    ),
});

export default subscribeButtonFactory({
  styles: {
    SubscribeButtonWrapper: styles.SubscribeButtonWrapper,
    LightTheme: styles.LightTheme,
    Text: styles.Text,
    Icon: styles.Icon,
    Active: styles.Active,
    Animating: styles.Animating,
  },
  Icon,
  ToastService: getToastInstancesByProps,
});
