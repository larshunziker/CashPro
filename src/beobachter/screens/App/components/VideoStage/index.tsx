import compose from 'recompose/compose';
import classNames from 'classnames';
import videoStageFactory from '../../../../../common/components/VideoStage/factory';
import withWaitUntilApolloLoaded from '../../../../../shared/decorators/withWaitUntilApolloLoaded';
import Link from '../../../../../common/components/Link';
import SmoothScroll from '../../../../../common/components/SmoothScroll';
import Teaser from '../Teaser';
import VideoPlayer from '../VideoPlayer';
import ImageCaption from './components/ImageCaption';
import { isInsideColumn } from '../../../../shared/helpers/isInsideColumn';
import { TEASER_LAYOUT_VIDEO } from '../../../../../shared/constants/teaser';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../common/assets/styles/variablesDefault.legacy.css'. '/Users */
import { BREAKPOINTS } from '../../../../../common/assets/styles/variablesDefault.legacy.css';
import styles from './styles.legacy.css';
import { VideoStageComponent } from '../../../../../common/components/VideoStage/typings';

const VideoStage: VideoStageComponent = compose<any, any>(
  withWaitUntilApolloLoaded,
)(
  videoStageFactory({
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
    styles: ({ origin }) => ({
      Container: styles.Container,
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
      Wrapper: isInsideColumn(origin) ? styles.WrapperInGuideArticle : '',
      Items: classNames(grid.ColXs12, grid.ColMd6, styles.Items),
      IsActive: '',
      LeftBoxCols: classNames(grid.ColXs24, styles.LeftColWrapper),
      RightBoxCols: classNames(grid.ColXs24, styles.RightColWrapper),
      InnerWrapper: '',
      HeadingWrapper: '',
      Heading: styles.Heading,
      StageWrapper: classNames(grid.ColMd16, styles.StageWrapper),
      ContentWrapper: classNames(grid.ColMd8, styles.ContentWrapper),
      DetailWrapper: styles.DetailWrapper,
      Title: styles.Title,
      ShortTitle: styles.ShortTitle,
    }),
  }),
);

export default VideoStage;
