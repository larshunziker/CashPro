/* istanbul ignore file */

import articleRecommendationsFactory from '../../../../../../../common/components/Recommendations/components/ArticleRecommendations/factory';
import TeaserGrid from '../../../TeaserGrid';
import { ensureTeaserInterface } from '../../../Teaser/shared/helpers';
import {
  GRID_LAYOUT_RECOMMENDATIONS,
  GRID_LAYOUT_TEASER_SM_COLUMN,
} from '../../../TeaserGrid/gridConfigs/constants';
import { RIGHT_COLUMN_PAGE_LAYOUT_TYPE } from '../../../../../../../common/screens/PageTemplate/constants';
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
    return GRID_LAYOUT_TEASER_SM_COLUMN; // TODO check that afterwards
  } else {
    return GRID_LAYOUT_RECOMMENDATIONS;
  }
};

const ArticleRecommendations = articleRecommendationsFactory({
  ensureTeaserInterface,
  TeaserGrid,
  teaserGridLayout: getTeaserGridLayoutByProps,
  styles: {
    Container: '',
    Row: grid.Row,
    Title: styles.Title,
    TitleWrapper: styles.TitleWrapper,
    Wrapper: styles.Wrapper,
  },
});

export default ArticleRecommendations;
