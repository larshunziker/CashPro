import { ScrollStateAction } from '../../../shared/actions/scroll';

// Initial window state

export const scrollInitialState: ScrollState = {
  direction: '',
  scrollTop:
    (__CLIENT__ &&
      ((document.body && document.body.scrollTop) ||
        (document.documentElement && document.documentElement.scrollTop))) ||
    0,
};
const DIRECTION_CHANGE_PX_DIFF = 50;

const scrollStateReducer = (
  state: ScrollState = scrollInitialState,
  action: ScrollStateAction<ScrollState>,
): ScrollState => {
  if (action.type === 'scroll/scroll-top') {
    const directionChangePosition = state.directionChangePosition || 0;

    const direction =
      state.scrollTop > action.payload.scrollTop ? 'up' : 'down';
    if (
      !state.direction ||
      (state.direction !== direction &&
        Math.abs(state.scrollTop - directionChangePosition) >
          DIRECTION_CHANGE_PX_DIFF)
    ) {
      return {
        ...state,
        scrollTop: action.payload.scrollTop,
        direction,
        directionChangePosition: action.payload.scrollTop,
      };
    } else {
      return {
        ...state,
        scrollTop: action.payload.scrollTop,
        directionChangePosition:
          direction === state.direction
            ? action.payload.scrollTop
            : directionChangePosition,
      };
    }
  }
  return state;
};

export default scrollStateReducer;
