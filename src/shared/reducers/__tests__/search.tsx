import { searchInitialState, searchReducer } from '../search';

describe('[reducer] search', () => {
  it('should update searchQuery according to payload', () => {
    expect(
      searchReducer(searchInitialState, {
        type: 'search/searchQuery',
        // @ts-ignore
        payload: {
          searchQuery: 'my search query',
        },
      }),
    ).toEqual({
      ...searchInitialState,
      searchQuery: 'my search query',
    });
  });

  it('should update "visible" according to payload', () => {
    expect(
      searchReducer(searchInitialState, {
        type: 'search/visible',
        // @ts-ignore
        payload: {
          visible: true,
        },
      }),
    ).toEqual({
      ...searchInitialState,
      visible: true,
    });
  });

  it('should return default state', () => {
    expect(
      searchReducer(searchInitialState, {
        // @ts-ignore
        type: '',
        payload: searchInitialState,
      }),
    ).toEqual(searchInitialState);
  });
});
