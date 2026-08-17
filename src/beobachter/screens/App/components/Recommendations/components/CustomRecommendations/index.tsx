/* istanbul ignore file */

import articleNativeAdvertisingFactory from '../../../../../../../common/components/Recommendations/components/ArticleNativeAdvertising/factory';
import { ensureTeaserInterface } from '../../../Teaser/shared/helpers';
import TeaserGrid from '../../../TeaserGrid';
import {
  ARTICLE_TYPE_LONG_READ,
  ARTICLE_TYPE_OPINION,
  ARTICLE_TYPE_SPONSORED,
} from '../../../../../../../shared/constants/content';
import {
  GRID_LAYOUT_TEASER_SM_COLUMN,
  GRID_LAYOUT_TEASER_SM_ROW,
  GRID_LAYOUT_TEASER_WIDE_COLUMN,
} from '../../../TeaserGrid/gridConfigs/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'isInRightColumn' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
export const getGridLayoutByProps = ({ isInRightColumn, origin }) => {
  if (isInRightColumn) {
    return GRID_LAYOUT_TEASER_SM_COLUMN;
  }

  if (
    [
      ARTICLE_TYPE_LONG_READ,
      ARTICLE_TYPE_OPINION,
      ARTICLE_TYPE_SPONSORED,
    ].includes(origin)
  ) {
    return GRID_LAYOUT_TEASER_SM_ROW;
  }

  return GRID_LAYOUT_TEASER_WIDE_COLUMN;
};

// use group content id (gcid), not node id (nid)
const getFallbackNativeAdvertisingGcIds = {
  develop: ['40166'],
  stage: ['715107'],
  master: ['731540'],
};

const CustomRecommendations = articleNativeAdvertisingFactory({
  ensureTeaserInterface,
  TeaserGrid,
  teaserGridLayout: getGridLayoutByProps,
  styles: {
    Container: '',
    Row: grid.Row,
    Title: styles.Title,
    TitleWrapper: styles.TitleWrapper,
    Wrapper: styles.Wrapper,
  },
  fallbackNativeAdvertisingGcIds:
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ develop */
    getFallbackNativeAdvertisingGcIds[__DOT_ENV__],
});

export default CustomRecommendations;
