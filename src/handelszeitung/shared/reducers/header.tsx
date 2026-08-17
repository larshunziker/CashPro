/**
 * @TODO
 *
 * refactor the reset function and maybe the structure of the initialState as well.
 * on reset, we don't want to reset all data but just `title` and `content`.
 * so it would be much easier to just reset a prop called `meta` or so which is an object
 * like:
 *
 * meta: {title: 'foo', contentType: 'bar'}
 */

import { HeaderStateAction } from '../../../shared/actions/header';

// Initial header state
export const initialState: HeaderState = {
  title: '',
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
    case 'header/set-props': {
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
