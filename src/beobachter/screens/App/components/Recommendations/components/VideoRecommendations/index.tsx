/* istanbul ignore file */

import classNames from 'classnames';
import Teaser from '../../../Teaser';
import recommendationsFactory from '../../../../../../../common/components/Recommendations/components/Recommendations/factory';
import { GRID_LAYOUT_TEASER_NEW_RECOMMENDATIONS } from '../../../TeaserGrid/gridConfigs/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const VideoRecommendations = recommendationsFactory({
  Teaser,
  skeletonPlaceholderImg: GRID_LAYOUT_TEASER_NEW_RECOMMENDATIONS,
  styles: {
    RecommendationsListContainer: grid.Row,
    Title: styles.Title,
    Wrapper: styles.Wrapper,
    RecommendationItem: classNames(
      styles.RecommendationsItem,
      grid.ColXs24,
      grid.ColMd6,
    ),
  },
});

export default VideoRecommendations;
