import { HeaderStateAction } from '../actions/header';

// Initial header state
export const initialState: HeaderState = {
  title: '',
  isSinglePage: false,
  contentType: '',
};

export default (
  state: HeaderState = initialState,
  action: HeaderStateAction<HeaderState>,
): HeaderState => {
  switch (action.type) {
    case 'header/set-header-data': {
      // ensure that at least one prop has changed before dispatching a new state
      if (
        state.title !== action.payload.title ||
        state.contentType !== action.payload.contentType
      ) {
        return {
          ...state,
          ...action.payload,
        };
      }

      // return existing state
      return state;
    }
    case 'header/reset-header-data': {
      if (
        state.title !== initialState.title ||
        state.contentType !== initialState.contentType
      ) {
        return initialState;
      }
      return state;
    }
    case 'header/set-title': {
      return {
        ...state,
        title: action.payload.title,
      };
    }
    case 'singlepage/is-single-page': {
      return {
        ...state,
        isSinglePage: action.payload.isSinglePage,
      };
    }
    default: {
      return state;
    }
  }
};
