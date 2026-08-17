import {
  VIEWPORT_XS,
  VIEWPORT_SM,
  VIEWPORT_MD,
} from '../../../shared/actions/window';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../screens/App/assets/styles/variables.legacy.css'. '/Users/bhs/code/w */
import variables from '../../screens/App/assets/styles/variables.legacy.css';

/* @ts-ignore TODO: TS7006 ->  Parameter 'isMarketingLandingPage' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'viewport' implicitly has an 'any' type. */
export const getScrollOffset = (isMarketingLandingPage, viewport): number => {
  const MOBILE_ARTICLE_SCROLL_OFFSET = parseInt(variables.headerHeightXs, 10);
  const MEDIUM_ARTICLE_SCROLL_OFFSET = parseInt(variables.headerHeightSm, 10);
  const LARGE_ARTICLE_SCROLL_OFFSET = parseInt(variables.headerHeightXl, 10);

  const MOBILE_MARKETING_LANDING_PAGE_SCROLL_OFFSET = parseInt(
    variables.headerHeightMarketingPageXs,
    10,
  );
  const MEDIUM_MARKETING_LANDING_PAGE_SCROLL_OFFSET = parseInt(
    variables.headerHeightMarketingPageSm,
    10,
  );
  const LARGE_MARKETING_LANDING_PAGE_SCROLL_OFFSET = parseInt(
    variables.headerHeightMarketingPageXl,
    10,
  );

  switch (viewport) {
    case VIEWPORT_XS:
      return isMarketingLandingPage
        ? MOBILE_MARKETING_LANDING_PAGE_SCROLL_OFFSET
        : MOBILE_ARTICLE_SCROLL_OFFSET;
    case VIEWPORT_SM:
    case VIEWPORT_MD:
      return isMarketingLandingPage
        ? MEDIUM_MARKETING_LANDING_PAGE_SCROLL_OFFSET
        : MEDIUM_ARTICLE_SCROLL_OFFSET;
    default:
      return isMarketingLandingPage
        ? LARGE_MARKETING_LANDING_PAGE_SCROLL_OFFSET
        : LARGE_ARTICLE_SCROLL_OFFSET;
  }
};
