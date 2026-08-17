type NavigationStateActionTypes =
  | 'navigation/visible'
  | 'navigation/navigation-tree'
  | 'navigation/set-active-publication'
  | 'navigation/set-active-vertical-flyout-menu';

export type NavigationStateAction<T> = {
  type: NavigationStateActionTypes;
  payload: T;
};

// Navigation open-state action creator.
export const setNavigationVisible = (
  visibleNavigation: string,
): NavigationStateAction<{ visibleNavigation: string }> => {
  return {
    type: 'navigation/visible',
    payload: {
      visibleNavigation,
    },
  };
};

// Navigation tree action creator.
export const setTree = (
  tree: MenuResolvers,
): NavigationStateAction<{ tree: MenuResolvers }> => ({
  type: 'navigation/navigation-tree',
  payload: {
    tree,
  },
});

export const setActivePublication = (
  publication: string,
): NavigationStateAction<{ publication: string }> => ({
  type: 'navigation/set-active-publication',
  payload: {
    publication,
  },
});

export const setActiveMenuCategory = (
  vertical: string,
): NavigationStateAction<{ vertical: string }> => ({
  type: 'navigation/set-active-vertical-flyout-menu',
  payload: {
    vertical,
  },
});
