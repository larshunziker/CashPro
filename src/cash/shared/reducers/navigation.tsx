import {
  NavigationStateAction,
  NavigationStateActionTypes,
} from '../actions/navigation';
import { NavigationMenuType } from '../constants/enums';

export type NavigationState = {
  visibleNavigation: NavigationMenuType | null;
};

export const navigationInitialState: NavigationState = {
  visibleNavigation: null,
};

const navigationReducer = (
  state: NavigationState = navigationInitialState,
  action: NavigationStateAction<NavigationState>,
): NavigationState => {
  switch (action.type) {
    case NavigationStateActionTypes.NAVIGATION_VISIBLE:
      return {
        ...state,
        visibleNavigation: (action.payload as NavigationState)
          .visibleNavigation,
      };
    default:
      return state;
  }
};

export default navigationReducer;
