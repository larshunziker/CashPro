/* istanbul ignore file */

import bookmarkButtonFactory from '../../../../../common/components/BookmarkButton/factory';
import Icon from '../Icon';
import { Auth0 } from '../../../../../common/components/Auth0Provider';
import {
  displayErrorToast,
  displayInfoToast,
  displaySuccessToast,
} from '../Toast';
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
  RESTRICTED_ERROR_ID,
  RESTRICTED_ERROR_LINK_PATH,
  RESTRICTED_ERROR_LINK_TEXT,
  RESTRICTED_ERROR_MESSAGE,
} from '../Toast/constants';
import styles from './styles.legacy.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [styles.BookmarkAnimation];

export default bookmarkButtonFactory({
  styles: {
    BookmarkButtonWrapper: styles.BookmarkButtonWrapper,
    Text: styles.Text,
    Icon: styles.Icon,
    Animating: styles.Animating,
  },
  bookmarkIconTypeActive: 'IconTrash',
  bookmarkIconTypeInactive: 'IconBookmark',
  addToBookmarksText: 'Merken',
  removeFromBookmarksText: 'Entfernen',
  Icon,
  ToastService: {
    displayDefaultSuccessToast: () =>
      displaySuccessToast(
        BOOKMARKS_ADD_SUCCESS_MESSAGE,
        BOOKMARKS_ADD_SUCCESS_ID,
        {
          text: BOOKMARKS_LINK_TEXT,
          path: BOOKMARKS_PATH,
        },
      ),
    displayDefaultErrorToast: () =>
      displayErrorToast(DEFAULT_ERROR_MESSAGE, 'default-error'),
    displayAuthenticationErrorToast: () =>
      displayErrorToast(
        AUTHORIZATION_SESSION_EXPIRED_ERROR_MESSAGE,
        AUTHORIZATION_ERROR_ID,
        {
          text: AUTHORIZATION_LINK_TEXT,
          onClick: Auth0.login,
        },
      ),
    displayLimitExceededToast: () =>
      displayErrorToast(
        BOOKMARKS_LIMIT_EXCEEDED_ERROR_MESSAGE,
        BOOKMARKS_LIMIT_EXCEEDED_ERROR_ID,
        {
          text: BOOKMARKS_LINK_TEXT,
          path: BOOKMARKS_PATH,
        },
      ),
    displayAuthenticationInfoToast: () =>
      displayInfoToast(
        BOOKMARKS_AUTHORIZATION_INFO_MESSAGE,
        AUTHORIZATION_INFO_ID,
        {
          text: AUTHORIZATION_LINK_TEXT,
          onClick: Auth0.login,
        },
      ),
    displayRemoveSuccessToast: () => {},
    displaySubscriptionOnlyInfoToast: () =>
      displayErrorToast(RESTRICTED_ERROR_MESSAGE, RESTRICTED_ERROR_ID, {
        text: RESTRICTED_ERROR_LINK_TEXT,
        path: RESTRICTED_ERROR_LINK_PATH,
      }),
  },
});
