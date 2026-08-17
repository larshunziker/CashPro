import scrollStateReducer, { scrollInitialState } from '../scroll';

describe('[reducer] scroll', () => {
  it('should return default state', () => {
    expect(
      scrollStateReducer(scrollInitialState, {
        // @ts-ignore
        type: '',
        payload: scrollInitialState,
      }),
    ).toEqual(scrollInitialState);
  });
});
