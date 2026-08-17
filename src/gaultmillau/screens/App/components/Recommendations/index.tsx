import classNames from 'classnames';

import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import recommendationsFactory from '../../../../../common/components/Recommendations/components/Recommendations/factory';
import Teaser from '../Teaser';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import { STYLE_3X2_PLACEHOLDER_DATA } from '../../../../../shared/constants/images';

import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import {
  RecommendationsItem,
  RecommendationsProps,
} from '../../../../../common/components/Recommendations/components/Recommendations/typings';
import { OrganizationTeaserData } from './typings';

const getStylesByProps = ({ isInsideParagraph }: RecommendationsProps) => {
  return {
    RecommendationItem: classNames({
      [styles.RecommendationsItemRelated]: isInsideParagraph,
      [grid.ColXs24]: isInsideParagraph,
      [grid.ColSm12]: isInsideParagraph,
      [styles.RecommendationsItem]: !isInsideParagraph,
      [grid.ColSm8]: !isInsideParagraph,
    }),
    Wrapper: isInsideParagraph
      ? classNames(
          styles.RecommendationsContainerRelated,
          grid.ColXs22,
          grid.ColOffsetXs1,
          grid.HideForPrint,
        )
      : classNames(styles.RecommendationsContainer, grid.HideForPrint),
    Title: classNames({
      [styles.SectionTitleRelated]: isInsideParagraph,
      [styles.SectionTitle]: !isInsideParagraph,
    }),
    RecommendationsListContainer: classNames(
      grid.Row,
      styles.RecommendationsListContainer,
    ),
  };
};

const mapTeaserInterface = (
  item: RecommendationsItem & {
    node: {
      points: number;
      zipCode: string;
      city: string;
      address: string;
      secondaryName: string;
      organizationTeaserData: OrganizationTeaserData;
    };
  },
) => {
  if (
    item.node.__typename === 'Organization' &&
    item.node.organizationTeaserData
  ) {
    const organizationTeaserData = item.node.organizationTeaserData || null;
    item.node.organizationData = {
      points: organizationTeaserData?.points || 19,
    };

    item.node = {
      ...item.node,
      zipCode: organizationTeaserData?.zipCode || '',
      city: organizationTeaserData?.city || '',
      address: organizationTeaserData?.address || '',
      secondaryName: organizationTeaserData?.secondaryName || '',
    };
    item.node.lead = `${item.node.address}, ${item.node.zipCode} ${item.node.city} `;
  }

  return item;
};

const Recommendations = recommendationsFactory({
  Teaser,
  skeletonPlaceholderImg: STYLE_3X2_PLACEHOLDER_DATA,
  styles: getStylesByProps,
  mapTeaserInterface,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

const withStoreConnection = connect(mapStateToProps);

const withLifecycle = lifecycle<any, any>({
  shouldComponentUpdate(
    nextProps: RecommendationsProps & {
      activeMainChannel: string;
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
  // withImpressionTrack({ propName: 'items' }),
)(Recommendations);
