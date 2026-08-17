import compose from 'recompose/compose';
import classNames from 'classnames';
import videoStageFactory from '../../../../../common/components/VideoStage/factory';
import withWaitUntilApolloLoaded from '../../../../shared/decorators/withWaitUntilApolloLoaded';
import Link from '../../../../../common/components/Link';
import SmoothScroll from '../../../../../common/components/SmoothScroll';
import Teaser from '../Teaser';
import Video from '../Video';
import ImageCaption from './components/ImageCaption';
import { TEASER_LAYOUT_VIDEO } from '../../../../../shared/constants/teaser';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../common/assets/styles/variablesDefault.legacy.css'. '/Users */
import { BREAKPOINTS } from '../../../../../common/assets/styles/variablesDefault.legacy.css';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';

const gridStyle = {
  ...grid,
  Container: sections.Container,
};

export default compose<any, any>(withWaitUntilApolloLoaded)(
  videoStageFactory({
    Link,
    grid: gridStyle,
    VideoPlayer: Video,
    Teaser,
    SmoothScroll,
    ImageCaption,
    teaserLayout: TEASER_LAYOUT_VIDEO,
    viewportsToPerformAnchorScroll: BREAKPOINTS.lgBreakpointTo,
    isCaptionVisible: true,
    isObserveForAutoplayEnabled: false,
    hasToLazyLoadBrightcoveScript: true,
    styles: {
      Container: styles.Container,
      Wrapper: styles.Wrapper,
      Items: classNames(grid.ColSm6, styles.Items),
      IsActive: '',
      LeftBoxCols: classNames(styles.LeftColWrapper, gridStyle.Container),
      RightBoxCols: classNames(styles.RightColWrapper, gridStyle.Container),
      InnerWrapper: '',
      HeadingWrapper: '',
      Heading: styles.Heading,
      StageWrapper: classNames(grid.ColMd16, styles.StageWrapper),
      ContentWrapper: classNames(grid.ColMd8, styles.ContentWrapper),
      Title: styles.Title,
      ShortTitle: styles.ShortTitle,
    },
  }),
);
