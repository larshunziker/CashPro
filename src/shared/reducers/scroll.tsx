import { ScrollStateAction } from '../actions/scroll';

// Initial window state
export const scrollInitialState: ScrollState = {
  scrollTop:
    (__CLIENT__ &&
      ((document.body && document.body.scrollTop) ||
        (document.documentElement && document.documentElement.scrollTop))) ||
    0,
};

const scrollStateReducer = (
  state: ScrollState = scrollInitialState,
  action: ScrollStateAction<ScrollState>,
): ScrollState => {
  if (action.type === 'scroll/scroll-top') {
    return {
      ...state,
      scrollTop: action.payload.scrollTop,
    };
  }
  return state;
};

export default scrollStateReducer;
