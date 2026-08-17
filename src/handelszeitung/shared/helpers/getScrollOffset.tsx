import { VIEWPORT_XS } from '../../../shared/actions/window';
import { ARTICLE_SCROLL_OFFSET } from '../../screens/App/constants';

export const getScrollOffset = (viewport: string): number => {
  const OFFSET = 20;
  const UTILITY_BAR_HEIGHT = 54;

  if (viewport !== VIEWPORT_XS) {
    return ARTICLE_SCROLL_OFFSET + UTILITY_BAR_HEIGHT + OFFSET;
  }

  return ARTICLE_SCROLL_OFFSET + OFFSET;
};
