import classNames from 'classnames';

import { compose, lifecycle } from 'recompose';

import recommendationsFactory from '../../../../../common/components/Recommendations/components/Recommendations/factory';
import Teaser from '../Teaser';
// TODO: comment in when we implement the tracking epic for cash
// import withImpressionTrack from '../../../../shared/decorators/withImpressionTrack';
import { STYLE_16X9_PLACEHOLDER_DATA } from '../../../../../shared/constants/images';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { RecommendationsProps } from '../../../../../common/components/Recommendations/components/Recommendations/typings';

const getStylesByProps = ({ moreRecommendations }: RecommendationsProps) => {
  return {
    RecommendationItem: classNames(grid.ColXs24, grid.ColSm12, {
      [grid.ColMd8]: moreRecommendations,
      [styles.RecommendationItem]: moreRecommendations,
    }),
    Wrapper: styles.Wrapper,
    Title: styles.Title,
    RecommendationsListContainer: grid.Row,
  };
};

const Recommendations = recommendationsFactory({
  Teaser,
  skeletonPlaceholderImg: STYLE_16X9_PLACEHOLDER_DATA,
  styles: getStylesByProps,
});

const withLifecycle = lifecycle<any, any>({
  shouldComponentUpdate(nextProps: RecommendationsProps) {
    return (
      JSON.stringify(this.props.items) !== JSON.stringify(nextProps.items) ||
      this.props.title !== nextProps.title ||
      this.props.titleLinkPath !== nextProps.titleLinkPath
    );
  },
});

export default compose<any, any>(
  withLifecycle,
  // TODO: replace with current export when we implement the tracking epic for cash
  // withImpressionTrack({ propName: 'items' }),
)(Recommendations);
