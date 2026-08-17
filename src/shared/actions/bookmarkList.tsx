import { log } from '../../shared/helpers/utils';
import { getServiceUrl } from '../helpers/serviceUrl';
import { dispatchHybridAppEvent } from '../../common/components/HybridAppProvider';
import { Auth0 } from '../../common/components/Auth0Provider';
import { BookmarkButtonToastService } from '../../common/components/BookmarkButton/typings';

export const SET_BOOKMARK_LIST_DATA = 'bookmarkList/set-bookmarkList-data';
export const ADD_BOOKMARK_LIST_ITEM = 'bookmarkList/add-bookmarkList-item';
export const REMOVE_BOOKMARK_LIST_ITEM =
  'bookmarkList/remove-bookmarkList-item';

type BookmarkListStateActionTypes =
  | 'bookmarkList/set-bookmarkList-data'
  | 'bookmarkList/add-bookmarkList-item'
  | 'bookmarkList/remove-bookmarkList-item';

export type BookmarkListStateAction<T> = {
  type: BookmarkListStateActionTypes;
  payload: T;
};

export const setBookmarkListData = (
  data: BookmarkListState,
): BookmarkListStateAction<BookmarkListState> => ({
  type: SET_BOOKMARK_LIST_DATA,
  payload: data,
});

export const addBookmarkListData = (
  bookmarkListItem: string,
): BookmarkListStateAction<string> => ({
  type: ADD_BOOKMARK_LIST_ITEM,
  payload: bookmarkListItem,
});

export const removeBookmarkListData = (
  bookmarkListItem: number,
): BookmarkListStateAction<number> => ({
  type: REMOVE_BOOKMARK_LIST_ITEM,
  payload: bookmarkListItem,
});
const headers = {
  'Content-Type': 'application/json',
};

export const fetchBookmarkList =
  () =>
  (dispatch: Function): void => {
    fetch(`${getServiceUrl(__BOOKMARKS_SERVICE_ENDPOINT__)}/bookmarks`, {
      headers: {
        ...headers,
        Authorization: `Bearer ${Auth0.getIdToken()}`,
      },
    })
      .then(async (res): Promise<void> => {
        let bookmarks: BookmarkListState = {};

        if (res.status === 200) {
          bookmarks = await res.json();
        }

        dispatch(setBookmarkListData(bookmarks));
      })
      .catch((error) => {
        log('bookmarkList fetch action', ['error catched:', error], 'red');
      });
  };

export const addToBookmarks =
  (
    id: number,
    ToastService: BookmarkButtonToastService,
    setIsActive: Function,
    setIsAnimating: Function,
  ) =>
  (dispatch: Function): void => {
    fetch(`${getServiceUrl(__BOOKMARKS_SERVICE_ENDPOINT__)}/bookmarks`, {
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `Bearer ${Auth0.getIdToken()}`,
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then(async (res): Promise<void> => {
        switch (res.status) {
          case 201:
            const addedBookmark = await res.json();

            dispatch(addBookmarkListData(addedBookmark));
            setIsActive(true);
            setIsAnimating(true);
            dispatchHybridAppEvent('set-bookmark', {
              id,
              active: true,
            });
            ToastService.displayDefaultSuccessToast();
            break;
          case 401:
          case 403:
            ToastService.displayAuthenticationErrorToast();
            break;
          case 420:
            ToastService.displayLimitExceededToast();
            break;
          default:
            ToastService.displayDefaultErrorToast();
        }
      })
      .catch((error) => {
        ToastService.displayDefaultErrorToast();
        log('bookmarkList add action', ['error catched:', error], 'red');
      });
  };

export const removeFromBookmarks =
  (
    id: number,
    ToastService: BookmarkButtonToastService,
    setIsActive: Function,
  ) =>
  (dispatch: Function): void => {
    fetch(`${getServiceUrl(__BOOKMARKS_SERVICE_ENDPOINT__)}/bookmarks/${id}`, {
      method: 'DELETE',
      headers: {
        ...headers,
        Authorization: `Bearer ${Auth0.getIdToken()}`,
      },
    })
      .then(({ status }): void => {
        switch (status) {
          case 204:
            dispatch(removeBookmarkListData(id));
            setIsActive(false);
            ToastService.displayRemoveSuccessToast();
            dispatchHybridAppEvent('set-bookmark', {
              id,
              active: false,
            });
            break;
          case 401:
          case 403:
            ToastService.displayAuthenticationErrorToast();
            break;
          default:
            ToastService.displayDefaultErrorToast();
        }
      })
      .catch((error) => {
        ToastService.displayDefaultErrorToast();
        log('bookmarkList remove action', ['error catched:', error], 'red');
      });
  };
