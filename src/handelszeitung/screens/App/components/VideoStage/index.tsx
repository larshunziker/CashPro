/* istanbul ignore file */

import classNames from 'classnames';
import videoStageFactory from '../../../../../common/components/VideoStage/factory';
import Link from '../../../../../common/components/Link';
import SmoothScroll from '../../../../../common/components/SmoothScroll';
import Teaser from '../Teaser';
import VideoPlayer from '../VideoPlayer';
import ImageCaption from './components/ImageCaption';
import { TEASER_LAYOUT_VIDEO } from '../../../../../shared/constants/teaser';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../common/assets/styles/variablesDefault.legacy.css'. '/Users */
import { BREAKPOINTS } from '../../../../../common/assets/styles/variablesDefault.legacy.css';
import styles from './styles.legacy.css';

const VideoStage = videoStageFactory({
  Link,
  grid,
  VideoPlayer,
  Teaser,
  SmoothScroll,
  ImageCaption,
  teaserLayout: TEASER_LAYOUT_VIDEO,
  viewportsToPerformAnchorScroll: BREAKPOINTS.smBreakpointTo,
  isCaptionVisible: true,
  isObserveForAutoplayEnabled: false,
  hasToLazyLoadBrightcoveScript: true,
  styles: {
    Wrapper: '',
    Items: classNames(grid.ColXs12, grid.ColSm6, styles.Items),
    IsActive: styles.IsActive,
    LeftBoxCols: classNames(grid.ColXs24, styles.LeftColWrapper),
    RightBoxCols: classNames(styles.RightColWrapper),
    InnerWrapper: '',
    HeadingWrapper: '',
    Heading: styles.Heading,
    StageWrapper: classNames(grid.ColMd16, styles.StageWrapper),
    ContentWrapper: classNames(grid.ColMd8, styles.ContentWrapper),
    DetailWrapper: styles.DetailWrapper,
    Title: styles.Title,
    ShortTitle: styles.ShortTitle,
  },
});

export default VideoStage;
