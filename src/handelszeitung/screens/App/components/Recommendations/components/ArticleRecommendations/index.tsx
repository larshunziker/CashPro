/* istanbul ignore file */

import articleRecommendationsFactory from '../../../../../../../common/components/Recommendations/components/ArticleRecommendations/factory';
import { ensureTeaserInterface } from '../../../Teaser/shared/helpers';
import TeaserGrid from '../../../TeaserGrid';
import { RIGHT_COLUMN_PAGE_LAYOUT_TYPE } from '../../../../../../../common/screens/PageTemplate/constants';
import {
  GRID_LAYOUT_RECOMMENDATIONS,
  GRID_LAYOUT_SM,
} from '../../../TeaserGrid/gridConfigs/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ArticleRecommendationsProps } from '../../../../../../../common/components/Recommendations/components/ArticleRecommendations/typings';

const getTeaserGridLayoutByProps = ({
  pageLayoutType,
}: ArticleRecommendationsProps) => {
  const isSplittedPageLayoutVisible = global.innerWidth < 1024;

  if (
    pageLayoutType === RIGHT_COLUMN_PAGE_LAYOUT_TYPE &&
    !isSplittedPageLayoutVisible
  ) {
    return GRID_LAYOUT_SM;
  } else {
    return GRID_LAYOUT_RECOMMENDATIONS;
  }
};

// use group content id (gcid), not node id (nid)
const getFallbackNativeAdvertisingGcIds = {
  develop: ['53577', '39859', '39026'],
  stage: ['617201', '555877', '607547'],
  master: ['706497', '706496', '706498'],
};

const ArticleRecommendations = articleRecommendationsFactory({
  ensureTeaserInterface,
  TeaserGrid,
  teaserGridLayout: getTeaserGridLayoutByProps,
  fallbackNativeAdvertisingGcIds:
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ develop */
    getFallbackNativeAdvertisingGcIds[__DOT_ENV__],
  styles: {
    Container: grid.Container,
    Row: grid.Row,
    Title: styles.Title,
    TitleWrapper: styles.TitleWrapper,
    Wrapper: styles.Wrapper,
  },
});

export default ArticleRecommendations;
