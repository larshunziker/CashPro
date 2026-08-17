export const SET_STATUS_CODE = 'ssr/set-status-code';

type SsrStateActionTypes = 'ssr/set-status-code';

export type SsrStateAction<T> = {
  type: SsrStateActionTypes;
  payload: T;
};

export const setStatusCode = (
  statusCode: number,
  redirectUri = '',
): SsrStateAction<SsrState> => ({
  type: SET_STATUS_CODE,
  payload: {
    statusCode,
    redirectUri,
  },
});
