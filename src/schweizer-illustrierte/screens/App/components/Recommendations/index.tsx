import classNames from 'classnames';

import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import recommendationsFactory from '../../../../../common/components/Recommendations/components/Recommendations/factory';
import Teaser from '../Teaser';
import withImpressionTrack from '../../../../shared/decorators/withImpressionTrack';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import cssClassByChannel from '../../../../shared/helpers/cssClassByChannel';
import { STYLE_3X2_PLACEHOLDER_DATA } from '../../../../../shared/constants/images';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { RecommendationsProps } from '../../../../../common/components/Recommendations/components/Recommendations/typings';
import { ActiveMainChannel } from '../../../../shared/types';

const getStylesByProps = ({
  activeMainChannel,
  isInsideParagraph,
  isBlack,
  titleLinkPath,
}: RecommendationsProps & { activeMainChannel?: ActiveMainChannel }) => {
  const getThemedClass = cssClassByChannel(styles, activeMainChannel || '');

  return {
    RecommendationItem: classNames({
      /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
      [getThemedClass('RecommendationsItemRelated')]: isInsideParagraph,
      [grid.ColXs24]: isInsideParagraph,
      [grid.ColSm12]: isInsideParagraph,
      [styles.RecommendationsItem]: !isInsideParagraph,
      [grid.ColSm6]: !isInsideParagraph,
    }),
    Wrapper: isInsideParagraph
      ? classNames(
          getThemedClass('RecommendationsContainerRelated'),
          grid.ColXs22,
          grid.ColOffsetXs1,
          grid.HideForPrint,
        )
      : classNames(styles.RecommendationsContainer, grid.HideForPrint),
    Title: classNames({
      /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
      [getThemedClass('SectionTitleRelated')]: isInsideParagraph,
      /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
      [getThemedClass('SectionTitle')]: !isInsideParagraph,
      [styles.IsBlack]: !isInsideParagraph && isBlack,
      [styles.TitleHover]: titleLinkPath,
    }),
    RecommendationsListContainer: classNames(
      grid.Row,
      styles.RecommendationsListContainer,
    ),
  };
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

const withStoreConnection = connect(mapStateToProps);

const Recommendations = recommendationsFactory({
  Teaser,
  skeletonPlaceholderImg: STYLE_3X2_PLACEHOLDER_DATA,
  styles: getStylesByProps,
});

const withLifecycle = lifecycle<any, any>({
  shouldComponentUpdate(
    nextProps: RecommendationsProps & {
      activeMainChannel: ActiveMainChannel;
    },
  ) {
    return (
      JSON.stringify(this.props.items) !== JSON.stringify(nextProps.items) ||
      this.props.activeMainChannel !== nextProps.activeMainChannel ||
      this.props.title !== nextProps.title ||
      this.props.titleLinkPath !== nextProps.titleLinkPath ||
      this.props.isInsideParagraph !== nextProps.isInsideParagraph ||
      this.props.isBlack !== nextProps.isBlack
    );
  },
});

export default compose<any, any>(
  withLifecycle,
  withStoreConnection,
  withImpressionTrack({ propName: 'items' }),
)(Recommendations);
