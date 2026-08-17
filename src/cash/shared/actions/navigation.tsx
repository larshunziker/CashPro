import { NavigationMenuType } from '../constants/enums';

export enum NavigationStateActionTypes {
  NAVIGATION_VISIBLE = 'navigation/visible',
}

export type NavigationStateAction<T> = {
  type: NavigationStateActionTypes;
  payload: T;
};

// Navigation open-state action creator.
export const setNavigationVisible = (
  visibleNavigation: NavigationMenuType,
): NavigationStateAction<{ visibleNavigation: NavigationMenuType }> => {
  return {
    type: NavigationStateActionTypes.NAVIGATION_VISIBLE,
    payload: {
      visibleNavigation,
    },
  };
};
