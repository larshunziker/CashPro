import { VIEWPORT_XS } from '../../../shared/actions/window';
import {
  ARTICLE_SCROLL_OFFSET,
  DESKTOP_MARKETING_LANDING_PAGE_SCROLL_OFFSET,
  MOBILE_ARTICLE_SCROLL_OFFSET,
  MOBILE_MARKETING_LANDING_PAGE_SCROLL_OFFSET,
} from '../../screens/App/screens/ArticlePage/components/TableOfContents/constants';

export const getScrollOffset = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'isMarketingLandingPage' implicitly has an 'any' type. */
  isMarketingLandingPage,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'viewportLabel' implicitly has an 'any' type. */
  viewportLabel,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'noHeader' implicitly has an 'any' type. */
  noHeader,
): number => {
  const OFFSET = 20;
  let height = 0;

  const isMobileViewport = viewportLabel === VIEWPORT_XS;

  if (noHeader) {
    return height;
  }

  if (isMarketingLandingPage) {
    height = isMobileViewport
      ? MOBILE_MARKETING_LANDING_PAGE_SCROLL_OFFSET
      : DESKTOP_MARKETING_LANDING_PAGE_SCROLL_OFFSET;
  } else {
    height = isMobileViewport
      ? MOBILE_ARTICLE_SCROLL_OFFSET
      : ARTICLE_SCROLL_OFFSET;
  }

  return height + OFFSET;
};
