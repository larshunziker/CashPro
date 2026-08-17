import { ScrollConfig } from '../../../shared/decorators/withScrollOnLoad';
import { ANCHOR_TAG_SCROLL_TO_TOP } from './constants';

export const defaultOptions = {
  offset: 120,
  behavior: 'smooth',
  scrollToTopAnchorId: ANCHOR_TAG_SCROLL_TO_TOP,
  replace: false,
};

export const scrollToAnchorElement = (
  anchorId: string,
  options: ScrollConfig,
) => {
  const htmlWrapper = (document && document.getElementById(anchorId)) || null;
  const scrollOptions = {
    ...defaultOptions,
    ...options,
  };

  if (global && global.scrollTo && htmlWrapper) {
    const scrollY: number = window.scrollY || window.pageYOffset;

    if (anchorId === scrollOptions.scrollToTopAnchorId) {
      global.history.replaceState(
        {},
        '',
        `${global.location.pathname + global.location.search}`,
      );
    } else if (scrollOptions.replace) {
      global.history.replaceState(
        {},
        '',
        `${global.location.pathname}#${anchorId}`,
      );
    }

    global.scrollTo({
      left: 0,
      top:
        htmlWrapper.getBoundingClientRect().top +
        scrollY -
        scrollOptions.offset,
      behavior: scrollOptions.behavior as ScrollBehavior,
    });
  }
};
