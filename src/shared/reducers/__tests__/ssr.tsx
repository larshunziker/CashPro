import SsrStateReducer, { ssrInitialState } from '../ssr';

describe('[reducer] ssr', () => {
  it('should update state according to payload', () => {
    expect(
      SsrStateReducer(ssrInitialState, {
        type: 'ssr/set-status-code',
        payload: { statusCode: 400, redirectUri: '/test' },
      }),
    ).toEqual({
      redirectUri: '/test',
      statusCode: 400,
    });
  });

  it('should return default state', () => {
    expect(
      SsrStateReducer(ssrInitialState, {
        // @ts-ignore
        type: '',
        payload: { statusCode: 500, redirectUri: '/test' },
      }),
    ).toEqual({
      redirectUri: '',
      statusCode: 200,
    });
  });
});
