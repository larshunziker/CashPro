import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import videoParagraphFactory from '../../../../../../../common/components/Paragraphs/components/VideoParagraph/factory';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import pianoStateSelector from '../../../../../../../shared/selectors/pianoStateSelector';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import VideoPlayer from '../../../VideoPlayer';
import ImageCaption from '../ImageCaption';
import {
  TRACKING_CLASS_PARAGRAPH,
  TRACKING_CLASS_VIDEO_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import {
  ARTICLE_DEFAULT,
  ARTICLE_VIDEO,
  ARTICLE_VIDEO_HERO,
} from '../../../../screens/Article/constants';
import { HOROSCOPE_DEFAULT } from '../../../../screens/Horoscope/constants';
import { HOROSCOPE_DETAIL_DEFAULT } from '../../../../screens/HoroscopeDetail/constants';
import { PAGE_SCREEN_DEFAULT } from '../../../../screens/PageScreen/constants';
import { VIDEO_PAGE } from '../../../../screens/Video/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import helpers from '../../../../assets/styles/helpers.legacy.css';
import styles from './styles.legacy.css';
import { BrightcoveProps } from '../../../../../../../common/components/Brightcove/typings';
import {
  VideoParagraphFactoryOptionsStyles,
  VideoParagraphProps,
} from '../../../../../../../common/components/Paragraphs/components/VideoParagraph/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';

type VideoParagraphPropsInner = VideoParagraphProps &
  BrightcoveProps & {
    activeMainChannel: ActiveMainChannel;
    webinarAccessGranted: boolean;
    isCrawler: boolean;
  };

const getStylesByProps = (
  props: VideoParagraphPropsInner,
): VideoParagraphFactoryOptionsStyles => {
  const { activeMainChannel, origin, video } = props;
  const getThemedClass = cssClassByChannel(styles, activeMainChannel);
  return {
    OuterWrapper: classNames({
      [styles.OuterWrapper]: origin !== VIDEO_PAGE,
      [styles.CaptionPlaceholder]: !video?.credit && !video?.caption,
      [styles.HeroVideoMargin]: origin === ARTICLE_VIDEO_HERO,
    }),
    Wrapper: classNames(styles.Wrapper, {
      [helpers.PullOutXs]:
        origin === ARTICLE_VIDEO_HERO || origin === VIDEO_PAGE,
    }),
    TitleWrapper: classNames(
      grid.ColOffsetXs2,
      grid.ColXs20,
      grid.ColOffsetSm4,
      grid.ColSm16,
      grid.ColOffsetXl5,
      grid.ColXl14,
      helpers.TextCenter,
      styles.TitleWrapper,
    ),
    VideoTitle: getThemedClass('Quote'),
    ShortTitle: getThemedClass('HeadingCatch3'),
  };
};

const checkIfHasTitleByProps = ({
  origin,
  video,
}: VideoParagraphPropsInner) => {
  return (
    video?.title &&
    video?.shortTitle &&
    (origin === ARTICLE_DEFAULT ||
      origin === ARTICLE_VIDEO ||
      origin === PAGE_SCREEN_DEFAULT ||
      origin === HOROSCOPE_DETAIL_DEFAULT ||
      origin === HOROSCOPE_DEFAULT)
  );
};

const checkIfHasShortTitleByProps = ({ video }: VideoParagraphPropsInner) => {
  return !!video?.shortTitle;
};

const checkOriginByProps = ({ origin }: VideoParagraphPropsInner) => {
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  return [VIDEO_PAGE, ARTICLE_VIDEO_HERO].includes(origin);
};

const VideoParagraph = (
  props: VideoParagraphPropsInner,
): ReactElement | null => {
  // Video paywall (Webinar PoC)
  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  const webinarKeyword = props.video?.keywords?.edges.filter(
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    (keyword) => keyword.node?.label?.toLowerCase() === 'webinar',
  );

  const showPaywall =
    webinarKeyword &&
    webinarKeyword.length > 0 &&
    props.video?.restrictionStatus === 'paid' &&
    !props.isCrawler &&
    !props.webinarAccessGranted;
  if (showPaywall) {
    return (
      <div
        key={'paywall' + props.video?.brightcoveId}
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_VIDEO_PARAGRAPH,
          styles.OuterWrapper,
          'webinar-' + props.video?.brightcoveId,
        )}
      ></div>
    );
  }

  return (
    <div key={'video' + props.video?.brightcoveId}>
      {videoParagraphFactory({
        styles: getStylesByProps,
        Video: VideoPlayer,
        /* @ts-ignore TODO: TS2322 ->  Type 'ConnectedComponent<FunctionComponent<ImageCaptionProps>, { caption */
        ImageCaption,
        /* @ts-ignore TODO: TS2322 ->  Type '({ origin, video, } */
        hasTitle: checkIfHasTitleByProps,
        hasShortTitle: checkIfHasShortTitleByProps,
        shouldAutoPlay: checkOriginByProps,
        muted: checkOriginByProps,
        shouldHideCaption: false,
      })(props)}
    </div>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  webinarAccessGranted: pianoStateSelector(state).webinarAccessGranted,
  isCrawler: locationStateSelector(state)?.isCrawler || false,
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(VideoParagraph);
