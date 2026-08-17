/* istanbul ignore file */

import bookmarkButtonFactory from '../../../../../common/components/BookmarkButton/factory';
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
  BOOKMARKS_REMOVE_SUCCESS_ID,
  BOOKMARKS_REMOVE_SUCCESS_MESSAGE,
  LIMIT_EXCEEDED_ERROR_LINK_PATH,
} from '../Toast/constants';
// @ts-ignore
import styles from './styles.legacy.css';

export default bookmarkButtonFactory({
  styles: {
    BookmarkButtonWrapper: styles.BookmarkButtonWrapper,
    Text: styles.Text,
    Icon: styles.Icon,
    Animating: styles.Animating,
  },
  addToBookmarksText: 'Merken',
  removeFromBookmarksText: 'Entfernen',
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
          path: LIMIT_EXCEEDED_ERROR_LINK_PATH,
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
  },
});
