import {
  ADD_BOOKMARK_LIST_ITEM,
  BookmarkListStateAction,
  REMOVE_BOOKMARK_LIST_ITEM,
  SET_BOOKMARK_LIST_DATA,
} from '../actions/bookmarkList';

export const bookmarkListInitialState: BookmarkListState = {};

const bookmarkListReducer = (
  state: BookmarkListState = bookmarkListInitialState,
  action: BookmarkListStateAction<BookmarkListState | string>,
): BookmarkListState => {
  switch (action.type) {
    case SET_BOOKMARK_LIST_DATA:
      return (action.payload as BookmarkListState) || bookmarkListInitialState;
    case REMOVE_BOOKMARK_LIST_ITEM:
      const newState = { ...state };
      delete newState[action.payload as string];

      return newState;
    case ADD_BOOKMARK_LIST_ITEM:
      const updatedState = {
        ...state,
        ...(action.payload as BookmarkListState),
      };
      return updatedState;

    default:
      return state;
  }
};

export default bookmarkListReducer;
