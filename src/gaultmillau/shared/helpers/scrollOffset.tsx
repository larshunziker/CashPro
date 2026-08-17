import { VIEWPORT_XS, VIEWPORT_LG } from '../actions/window';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../screens/App/assets/styles/variables.legacy.css'. '/Users/bhs/code/w */
import variables from '../../screens/App/assets/styles/variables.legacy.css';

export const getScrollOffset = (viewport: string): number => {
  const OFFSET = 20;
  const OFFSET_UTILITY_BAR = 60;

  const ARTICLE_SCROLL_OFFSET_XS = parseInt(variables.headerHeightXs, 10);
  const ARTICLE_SCROLL_OFFSET_LG = parseInt(variables.headerHeightLg, 10);
  const ARTICLE_SCROLL_OFFSET_XL = parseInt(variables.headerHeightXl, 10);

  switch (viewport) {
    case VIEWPORT_XS:
      return ARTICLE_SCROLL_OFFSET_XS + OFFSET;
    case VIEWPORT_LG:
      return ARTICLE_SCROLL_OFFSET_LG + OFFSET_UTILITY_BAR;
    default:
      return ARTICLE_SCROLL_OFFSET_XL + OFFSET_UTILITY_BAR;
  }
};
