import NavigationReducer, { navigationInitialState } from '../navigation';

describe('[reducer] ssr', () => {
  it('should update visibleNavigation according to payload', () => {
    expect(
      NavigationReducer(navigationInitialState, {
        type: 'navigation/visible',
        payload: {
          visibleNavigation: 'visible',
        },
      }),
    ).toEqual({
      ...navigationInitialState,
      visibleNavigation: 'visible',
    });
  });

  it('should update activePublication according to payload', () => {
    expect(
      NavigationReducer(navigationInitialState, {
        type: 'navigation/set-active-publication',
        payload: {
          // @ts-ignore
          publication: 'BEO',
        },
      }),
    ).toEqual({
      ...navigationInitialState,
      activePublication: 'BEO',
    });
  });

  it('should update activePublication according to payload', () => {
    expect(
      NavigationReducer(navigationInitialState, {
        type: 'navigation/navigation-tree',
        payload: {
          // @ts-ignore
          tree: { menu: [] },
        },
      }),
    ).toEqual({
      ...navigationInitialState,
      tree: { menu: [] },
    });
  });

  it('should return default state', () => {
    expect(
      NavigationReducer(navigationInitialState, {
        // @ts-ignore
        type: '',
        payload: {},
      }),
    ).toEqual(navigationInitialState);
  });
});
