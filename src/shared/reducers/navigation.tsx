import { NavigationStateAction } from '../actions/navigation';

/*
 * Navigation state reducer.
 *
 * The reducer merges the navigation state into our state.
 */

// Initial navigation state
export const navigationInitialState: NavigationState = {
  tree: null,
  visibleNavigation: null,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | undefined'. */
  activePublication: null,
  activeVerticalMenu: null,
};

/**
 * Merge navigation state into the global application state.
 */

const NavigationReducer = (
  state: NavigationState = navigationInitialState,
  action: NavigationStateAction<NavigationState>,
): NavigationState => {
  switch (action.type) {
    case 'navigation/visible':
      return {
        ...state,
        visibleNavigation: (action.payload as NavigationState)
          .visibleNavigation,
      };
    case 'navigation/set-active-publication':
      if (
        state.activePublication ===
        (action.payload as { publication: string }).publication
      ) {
        return state;
      }
      return {
        ...state,
        activePublication: (action.payload as { publication: string })
          .publication,
      };
    case 'navigation/navigation-tree':
      return {
        ...state,
        tree: action.payload.tree,
      };
    case 'navigation/set-active-vertical-flyout-menu':
      return {
        ...state,
        activeVerticalMenu: (action.payload as { vertical: string }).vertical,
      };

    default:
      return state;
  }
};

export default NavigationReducer;
