/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../assets/styles/variables.legacy.css'. '/Users/bhs/code/work/ra */
import variables from '../../../../assets/styles/variables.legacy.css';

const MARGIN_TOP = parseInt(variables.chapterNavigationTopMargin, 10);
export const MOBILE_ARTICLE_SCROLL_OFFSET =
  parseInt(variables.headerHeightXs, 10) + MARGIN_TOP;
export const ARTICLE_SCROLL_OFFSET =
  parseInt(variables.headerHeightSm, 10) + MARGIN_TOP;
export const MOBILE_MARKETING_LANDING_PAGE_SCROLL_OFFSET =
  parseInt(variables.headerHeightMarketingPageXs, 10) + MARGIN_TOP;
export const DESKTOP_MARKETING_LANDING_PAGE_SCROLL_OFFSET =
  parseInt(variables.headerHeightMarketingPageSm, 10) + MARGIN_TOP;
