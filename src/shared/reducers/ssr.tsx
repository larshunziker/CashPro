import { SET_STATUS_CODE, SsrStateAction } from '../actions/ssr';

// Initial ssr state
export const ssrInitialState: SsrState = {
  statusCode: 200,
  redirectUri: '',
};

const SsrStateReducer = (
  state: SsrState = ssrInitialState,
  action: SsrStateAction<SsrState>,
): SsrState => {
  switch (action.type) {
    case SET_STATUS_CODE:
      if (state.statusCode !== action.payload.statusCode) {
        return {
          ...state,
          statusCode: action.payload.statusCode,
          redirectUri: action.payload.redirectUri,
        };
      }
      return state;

    default:
      return state;
  }
};

export default SsrStateReducer;
