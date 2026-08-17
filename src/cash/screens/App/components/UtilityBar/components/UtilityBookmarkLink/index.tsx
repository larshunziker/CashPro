/* istanbul ignore file */

import classNames from 'classnames';
import utilityBookmarkLinkFactory from '../../../../../../../common/components/UtilityBar/components/UtilityBookmarkLink/factory';
import Link from '../../../../../../../common/components/LinkLegacy';
import SVGIcon from '../../../SVGIcon';
import { Auth0 } from '../../../../../../../common/components/Auth0Provider';
import {
  displayErrorToast,
  displayInfoToast,
  displaySuccessToast,
} from '../../../Toast';
import { UTILITY_BAR_ORIGIN_HEADER } from '../../../../../../../common/components/UtilityBar/components/UtilityOverlay/constants';
import { UTILITY_BAR_ORIGIN_OVERLAY } from '../../../../../../../shared/constants/utilitybar';
import {
  AUTHORIZATION_ERROR_ID,
  AUTHORIZATION_INFO_ID,
  AUTHORIZATION_LINK_TEXT,
  AUTHORIZATION_SESSION_EXPIRED_ERROR_MESSAGE,
  BOOKMARKS_ADD_SUCCESS_ID,
  BOOKMARKS_ADD_SUCCESS_MESSAGE,
  BOOKMARKS_AUTHORIZATION_INFO_MESSAGE,
  BOOKMARKS_LIMIT_EXCEEDED_ERROR_ID,
  BOOKMARKS_LIMIT_EXCEEDED_ERROR_MESSAGE,
  BOOKMARKS_LINK_TEXT,
  BOOKMARKS_PATH,
  DEFAULT_ERROR_MESSAGE,
} from '../../../Toast/constants';
import styles from './styles.legacy.css';
import {
  UtilityBookmarkLinkFactoryOptionsStyles,
  UtilityBookmarkLinkProps,
} from '../../../../../../../common/components/UtilityBar/components/UtilityBookmarkLink/typings';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [styles.BookmarkAnimation];

const getStyleByProps = ({
  origin,
}: UtilityBookmarkLinkProps): UtilityBookmarkLinkFactoryOptionsStyles => {
  return {
    Link: classNames(styles.Link, {
      [styles.LinkOverlay]: origin === UTILITY_BAR_ORIGIN_OVERLAY,
      [styles.LinkHeader]: origin === UTILITY_BAR_ORIGIN_HEADER,
    }),
    Label: styles.Label,
    Icon: styles.Icon,
    Animating: styles.Animating,
    Restricted: styles.Restricted,
  };
};

const getToastInstanceByProps = ({ trackingSource = '' }) => ({
  displayDefaultSuccessToast: () =>
    displaySuccessToast(
      BOOKMARKS_ADD_SUCCESS_MESSAGE,
      BOOKMARKS_ADD_SUCCESS_ID,
      {
        text: BOOKMARKS_LINK_TEXT,
        path: BOOKMARKS_PATH,
      },
    ),
  displayRemoveSuccessToast: () => {},
  displayDefaultErrorToast: () =>
    displayErrorToast(DEFAULT_ERROR_MESSAGE, 'default-error'),
  displayAuthenticationErrorToast: () =>
    displayErrorToast(
      AUTHORIZATION_SESSION_EXPIRED_ERROR_MESSAGE,
      AUTHORIZATION_ERROR_ID,
      {
        text: AUTHORIZATION_LINK_TEXT,
        onClick: () => Auth0.login(undefined, trackingSource),
      },
    ),
  displayLimitExceededToast: () =>
    displayErrorToast(
      BOOKMARKS_LIMIT_EXCEEDED_ERROR_MESSAGE,
      BOOKMARKS_LIMIT_EXCEEDED_ERROR_ID,
      {
        text: BOOKMARKS_LIMIT_EXCEEDED_ERROR_MESSAGE,
        path: BOOKMARKS_PATH,
      },
    ),
  displayAuthenticationInfoToast: () =>
    displayInfoToast(
      BOOKMARKS_AUTHORIZATION_INFO_MESSAGE,
      AUTHORIZATION_INFO_ID,
      {
        text: AUTHORIZATION_LINK_TEXT,
        onClick: () => Auth0.login(undefined, trackingSource),
      },
    ),
});

const UtilityBookmarkLink = utilityBookmarkLinkFactory({
  Link,
  SVGIcon,
  ToastService: getToastInstanceByProps,
  styles: getStyleByProps,
});

export default UtilityBookmarkLink;
