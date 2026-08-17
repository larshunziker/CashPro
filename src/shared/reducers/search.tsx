import { SearchStateAction } from '../actions/search';

// Initial search state
export const searchInitialState: SearchState = {
  visible: false,
  searchQuery: '',
};

/**
 * Merge search state into the global application state.
 */

export const searchReducer = (
  state: SearchState = searchInitialState,
  action: SearchStateAction<SearchState>,
): SearchState => {
  switch (action.type) {
    case 'search/visible':
      return {
        ...state,
        visible: action.payload.visible,
      };
    case 'search/searchQuery':
      return {
        ...state,
        searchQuery: action.payload.searchQuery,
      };
    default:
      return state;
  }
};
