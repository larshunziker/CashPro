import { HeaderStateAction } from '../actions/header';

// Initial header state
export const initialState: HeaderState = {
  articleData: {},
  title: '',
  isSinglePage: false,
  contentType: '',
  noHeader: false,
};

const headerReducer = (
  state: HeaderState = initialState,
  action: HeaderStateAction<HeaderState>,
): HeaderState => {
  switch (action.type) {
    case 'header/set-header-data': {
      // ensure that at least one prop has changed before dispatching a new state
      if (
        state.title !== action.payload.title ||
        state.contentType !== action.payload.contentType ||
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        state.articleData.title !== action.payload.articleData.title
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
        return {
          ...initialState,
          noHeader: state.noHeader,
          breadcrumbsData: state.breadcrumbsData,
        };
      }
      return state;
    }
    case 'header/reset-header-breadcrumbs-data': {
      if (
        state.breadcrumbsData &&
        state.breadcrumbsData.timestamp ===
          action?.payload?.breadcrumbsData?.timestamp
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { breadcrumbsData, ...newState } = state;
        return newState;
      }
      return state;
    }
    case 'header/set-props': {
      // do not dispatch a new state if nothing has changed
      if (
        action?.payload?.label === state.label &&
        action?.payload?.id === state.id &&
        action?.payload?.link === state.link
      ) {
        return state;
      }
      return {
        ...state,
        label: (action.payload && action.payload.label) || '',
        /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
        link: (action.payload && action.payload.link) || null,
        id: (action.payload && action.payload.id) || null,
      };
    }
    default: {
      return state;
    }
  }
};

export default headerReducer;
