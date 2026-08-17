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
  AUTHORIZATION_ERROR_MESSAGE,
  AUTHORIZATION_INFO_ID,
  AUTHORIZATION_LINK_TEXT,
  BOOKMARKS_ADD_SUCCESS_ID,
  BOOKMARKS_ADD_SUCCESS_MESSAGE,
  BOOKMARKS_AUTHORIZATION_INFO_MESSAGE,
  BOOKMARKS_LIMIT_EXCEEDED_ERROR_ID,
  BOOKMARKS_LIMIT_EXCEEDED_ERROR_LINK_TEXT,
  BOOKMARKS_LIMIT_EXCEEDED_ERROR_MESSAGE,
  BOOKMARKS_PATH,
  BOOKMARKS_REMOVE_SUCCESS_ID,
  BOOKMARKS_REMOVE_SUCCESS_MESSAGE,
  RESTRICTED_ERROR_ID,
  RESTRICTED_ERROR_LINK_PATH,
  RESTRICTED_ERROR_LINK_TEXT,
  RESTRICTED_ERROR_MESSAGE,
} from '../Toast/constants';
// @ts-ignore
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
        null,
        /* @ts-ignore TODO: TS2345 ->  Argument of type '"toast/bookmarks-add-success"' is not assignable to parameter of type 'null | undefined'. */
        BOOKMARKS_ADD_SUCCESS_ID,
      ),
    displayRemoveSuccessToast: () =>
      displaySuccessToast(
        BOOKMARKS_REMOVE_SUCCESS_MESSAGE,
        null,
        /* @ts-ignore TODO: TS2345 ->  Argument of type '"toast/bookmarks-remove-success"' is not assignable to parameter of type 'null | undefined'. */
        BOOKMARKS_REMOVE_SUCCESS_ID,
      ),
    displayDefaultErrorToast: () => displayErrorToast(),
    displayAuthenticationErrorToast: () =>
      displayErrorToast(
        AUTHORIZATION_ERROR_MESSAGE,
        /* @ts-ignore TODO: TS2345 ->  Argument of type '{ text */
        {
          text: AUTHORIZATION_LINK_TEXT,
          onClick: Auth0.login,
        },
        AUTHORIZATION_ERROR_ID,
      ),
    displayLimitExceededToast: () =>
      displayErrorToast(
        BOOKMARKS_LIMIT_EXCEEDED_ERROR_MESSAGE,
        /* @ts-ignore TODO: TS2345 ->  Argument of type '{ text */
        {
          text: BOOKMARKS_LIMIT_EXCEEDED_ERROR_LINK_TEXT,
          path: BOOKMARKS_PATH,
        },
        BOOKMARKS_LIMIT_EXCEEDED_ERROR_ID,
      ),
    displayAuthenticationInfoToast: () =>
      displayInfoToast(
        BOOKMARKS_AUTHORIZATION_INFO_MESSAGE,
        /* @ts-ignore TODO: TS2345 ->  Argument of type '{ text */
        {
          text: AUTHORIZATION_LINK_TEXT,
          onClick: Auth0.login,
        },
        AUTHORIZATION_INFO_ID,
      ),
    displaySubscriptionOnlyInfoToast: () =>
      displayErrorToast(
        RESTRICTED_ERROR_MESSAGE,
        /* @ts-ignore TODO: TS2345 ->  Argument of type '{ text */
        {
          text: RESTRICTED_ERROR_LINK_TEXT,
          path: RESTRICTED_ERROR_LINK_PATH,
        },
        RESTRICTED_ERROR_ID,
      ),
  },
});
