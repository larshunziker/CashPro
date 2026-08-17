import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
// @ts-ignore
import cssClassByChannel from 'helpers/cssClassByChannel';
// @ts-ignore
import settingsStateSelector from 'selectors/settingsStateSelector';
// @ts-ignore
import withWaitUntilApolloLoaded from 'decorators/withWaitUntilApolloLoaded';
import videoStageFactory, {
  VideoStagePropsInner as VideoStageProps,
} from '../../../../../common/components/VideoStage/factory';
import Link from '../../../../../common/components/Link';
import SmoothScroll from '../../../../../common/components/SmoothScroll';
import Teaser from '../Teaser';
import UtilityBar from '../UtilityBar';
import UtilityOverlay from '../UtilityBar/components/UtilityOverlay';
import VideoPlayer from '../VideoPlayer';
import ImageCaption from './components/ImageCaption';
import { TEASER_LAYOUT_VIDEO_S } from '../../../../../shared/constants/teaser';
import {
  UTILITY_TYPE_EMAIL,
  UTILITY_TYPE_FACEBOOK,
  UTILITY_TYPE_MESSENGER,
  UTILITY_TYPE_PINTEREST,
  UTILITY_TYPE_SHARE,
  UTILITY_TYPE_TWITTER,
  UTILITY_TYPE_WHATSAPP,
} from '../../components/UtilityBar/constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../common/assets/styles/variablesDefault.legacy.css'. '/Users */
import { BREAKPOINTS } from '../../../../../common/assets/styles/variablesDefault.legacy.css';
import styles from './styles.legacy.css';
// @ts-ignore
import sections from '@sections.legacy.css';
import { UtilityBarProps } from '../../../../../common/components/UtilityBar/typings';
import {
  VideoStageComponent,
  VideoStageFactoryOptionsStyles,
} from '../../../../../common/components/VideoStage/typings';
import { ActiveMainChannel } from '../../../../shared/types';

type VideoStagePropsInner = VideoStageProps & {
  activeMainChannel: ActiveMainChannel;
};

const VideoStageUtilityBar = ({
  title,
  shareUrl,
  imageUrl,
}: UtilityBarProps) => (
  <UtilityBar
    title={title}
    shareUrl={shareUrl}
    imageUrl={imageUrl}
    enabledUtilities={[UTILITY_TYPE_SHARE]}
  >
    {({ isOverlayVisible, toggleOverlayVisible }) => (
      <div className={styles.UtilityOverlayWrapper}>
        <UtilityOverlay
          title={title}
          shareUrl={shareUrl}
          imageUrl={imageUrl}
          hasStickyness={false}
          overlayTitle="Video teilen"
          isOverlayVisible={isOverlayVisible}
          toggleOverlayVisible={toggleOverlayVisible}
          enabledUtilities={[
            UTILITY_TYPE_EMAIL,
            UTILITY_TYPE_FACEBOOK,
            UTILITY_TYPE_MESSENGER,
            UTILITY_TYPE_WHATSAPP,
            UTILITY_TYPE_PINTEREST,
            UTILITY_TYPE_TWITTER,
          ]}
        />
      </div>
    )}
  </UtilityBar>
);

const getStylesByProps = ({
  activeMainChannel,
}: VideoStagePropsInner): VideoStageFactoryOptionsStyles => {
  const getThemedClass = cssClassByChannel(styles, activeMainChannel || '');

  return {
    Wrapper: styles.Wrapper,
    Items: styles.Items,
    IsActive: styles.IsActive,
    LeftBoxCols: classNames(grid.ColXs24, grid.ColSm14, grid.ColXl16),
    RightBoxCols: classNames(grid.ColXs24, grid.ColSm10, grid.ColXl8),
    InnerWrapper: classNames(sections.SectionPullOut, styles.InnerWrapper),
    HeadingWrapper: styles.HeadingWrapper,
    Heading: getThemedClass('Heading'),
    StageWrapper: styles.StageWrapper,
    ContentWrapper: styles.ContentWrapper,
    Title: getThemedClass('Title'),
    ShortTitle: getThemedClass('ShortTitle'),
    UtilityBarWrapper: classNames(
      'utility-bar-wrapper',
      styles.SocialBarWrapper,
    ),
  };
};

const shouldRerender = (
  prevProps: VideoStagePropsInner,
  nextProps: VideoStagePropsInner,
) => prevProps.activeMainChannel !== nextProps.activeMainChannel;

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

const VideoStage: VideoStageComponent = compose<any, any>(
  connect(mapStateToProps),
  withWaitUntilApolloLoaded,
)(
  videoStageFactory({
    Link,
    grid,
    VideoPlayer,
    Teaser,
    SmoothScroll,
    ImageCaption,
    UtilityBar: VideoStageUtilityBar,
    isObserveForAutoplayEnabled: false,
    hasToLazyLoadBrightcoveScript: true,
    isCaptionVisible: false,
    teaserLayout: TEASER_LAYOUT_VIDEO_S,
    viewportsToPerformAnchorScroll: BREAKPOINTS.xsBreakpointTo,
    styles: getStylesByProps,
    shouldRerender,
  }),
);

export default VideoStage;
