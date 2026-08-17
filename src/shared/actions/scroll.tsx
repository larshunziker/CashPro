type ScrollStateActionTypes = 'scroll/scroll-top';

export type ScrollStateAction<T> = {
  type: ScrollStateActionTypes;
  payload: T;
};

// Scroll action creator.
export const setScrollTop = (): ScrollStateAction<{ scrollTop: number }> => ({
  type: 'scroll/scroll-top',
  payload: {
    scrollTop:
      (__CLIENT__ &&
        ((document.body && document.body.scrollTop) ||
          (document.documentElement && document.documentElement.scrollTop))) ||
      0,
  },
});
