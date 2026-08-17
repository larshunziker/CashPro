import WindowStateReducer, { windowInitialState } from '../window';

describe('[reducer] window', () => {
  it('should update state according to payload', () => {
    expect(
      WindowStateReducer(windowInitialState, {
        type: 'window/resize',
        payload: {
          height: 3,
          viewport: {
            label: 'viewport/lg',
            from: 1680,
            to: 99999,
          },
          width: 4324,
          imageBreakpoint: {
            label: '1680',
            from: 1680,
            to: 4324234,
          },
        },
      }),
    ).toEqual({
      height: 3,
      viewport: {
        label: 'viewport/lg',
        from: 1680,
        to: 99999,
      },
      width: 4324,
      imageBreakpoint: {
        label: '1680',
        from: 1680,
        to: 4324234,
      },
    });
  });

  it('should return default state', () => {
    expect(
      WindowStateReducer(windowInitialState, {
        // @ts-ignore
        type: '',
        payload: windowInitialState,
      }),
    ).toEqual(windowInitialState);
  });
});
