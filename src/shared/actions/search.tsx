type SearchStateActionTypes = 'search/visible' | 'search/searchQuery';

export type SearchStateAction<T> = {
  type: SearchStateActionTypes;
  payload: T;
};

// Search open-state action creator.
export const searchToggle = (
  visible: boolean,
): SearchStateAction<{ visible: boolean }> => ({
  type: 'search/visible',
  payload: {
    visible,
  },
});

export const setSearchQuery = (
  searchQuery: string,
): SearchStateAction<{ searchQuery: string }> => {
  return {
    type: 'search/searchQuery',
    payload: {
      searchQuery,
    },
  };
};
