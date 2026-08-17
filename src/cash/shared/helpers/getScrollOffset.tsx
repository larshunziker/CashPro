import {
  VIEWPORT_XS,
  VIEWPORT_SM,
  VIEWPORT_MD,
} from '../../../shared/actions/window';
import {
  LARGE_ARTICLE_SCROLL_OFFSET,
  LARGE_MARKETING_LANDING_PAGE_SCROLL_OFFSET,
  MEDIUM_ARTICLE_SCROLL_OFFSET,
  MEDIUM_MARKETING_LANDING_PAGE_SCROLL_OFFSET,
  MOBILE_ARTICLE_SCROLL_OFFSET,
  MOBILE_MARKETING_LANDING_PAGE_SCROLL_OFFSET,
} from '../../screens/App/constants';

/* @ts-ignore TODO: TS7006 ->  Parameter 'isMarketingLandingPage' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'viewport' implicitly has an 'any' type. */
export const getScrollOffset = (isMarketingLandingPage, viewport): number => {
  const OFFSET = 20;
  let height;

  switch (viewport) {
    case VIEWPORT_XS:
      height = isMarketingLandingPage
        ? MOBILE_MARKETING_LANDING_PAGE_SCROLL_OFFSET
        : MOBILE_ARTICLE_SCROLL_OFFSET;
      break;
    case VIEWPORT_SM:
    case VIEWPORT_MD:
      height = isMarketingLandingPage
        ? MEDIUM_MARKETING_LANDING_PAGE_SCROLL_OFFSET
        : MEDIUM_ARTICLE_SCROLL_OFFSET;
      break;
    default:
      height = isMarketingLandingPage
        ? LARGE_MARKETING_LANDING_PAGE_SCROLL_OFFSET
        : LARGE_ARTICLE_SCROLL_OFFSET;
      break;
  }

  return height + OFFSET;
};
