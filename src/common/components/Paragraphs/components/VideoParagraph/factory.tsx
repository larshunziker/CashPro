/**
 * @file   VideoParagraph factory
 */

import React from 'react';
import classNames from 'classnames';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import {
  TRACKING_CLASS_PARAGRAPH,
  TRACKING_CLASS_VIDEO_PARAGRAPH,
} from '../../../../../shared/constants/tracking';
import { BrightcoveProps } from '../../../Brightcove/typings';
import {
  VideoParagraphComponent,
  VideoParagraphFactoryOptions,
  VideoParagraphFactoryOptionsStyles,
  VideoParagraphProps,
} from './typings';

type VideoParagraphPropsInner = VideoParagraphProps & BrightcoveProps;

export default ({
  Video,
  styles: appStyles,
  ImageCaption,
  hasTitle: appHasTitle,
  shouldAutoPlay: appShouldAutoPlay,
  muted: appIsMuted,
  hasShortTitle: appHasShortTitle,
  shouldHideCaption: appShouldHideCaption,
}: VideoParagraphFactoryOptions) => {
  /* @ts-ignore TODO: TS2322 ->  Type '(props */
  const VideoParagraph: VideoParagraphComponent = (
    props: VideoParagraphPropsInner,
  ) => {
    const {
      video,
      isFirst,
      autoPlay,
      muted,
      hasToLazyLoadBrightcoveScript,
      origin,
      suppressSource,
    }: VideoParagraphPropsInner = props;

    const defaultStyles: VideoParagraphFactoryOptionsStyles = {
      Wrapper: '',
      OuterWrapper: '',
      TitleWrapper: '',
      VideoTitle: '',
      CaptionWrapper: '',
      VideoCaption: '',
      VideoCredit: '',
    };

    const getStyles = (): VideoParagraphFactoryOptionsStyles => {
      const styles: VideoParagraphFactoryOptionsStyles =
        (typeof appStyles === 'function' && appStyles(props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;

      return styles;
    };

    const styles: VideoParagraphFactoryOptionsStyles = getStyles();

    const hasTitle =
      (typeof appHasTitle === 'function' && appHasTitle(props)) ||
      (typeof appHasTitle === 'boolean' && appHasTitle) ||
      null;

    const hasShortTitle =
      (typeof appHasShortTitle === 'function' && appHasShortTitle(props)) ||
      (typeof appHasShortTitle === 'boolean' && appHasShortTitle) ||
      null;

    const shouldAutoPlay =
      (typeof appShouldAutoPlay === 'function' && appShouldAutoPlay(props)) ||
      (typeof appShouldAutoPlay === 'boolean' && appShouldAutoPlay) ||
      autoPlay ||
      null;

    const isMuted =
      (typeof appIsMuted === 'function' && appIsMuted(props)) ||
      (typeof appIsMuted === 'boolean' && appIsMuted) ||
      muted ||
      null;

    const shouldHideVideoCaption =
      (typeof appShouldHideCaption === 'function' &&
        appShouldHideCaption(props)) ||
      (typeof appShouldHideCaption === 'boolean' && appShouldHideCaption) ||
      false;

    if (!video) {
      return null;
    }

    return (
      <div
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_VIDEO_PARAGRAPH,
          styles.OuterWrapper,
        )}
      >
        {hasTitle && (
          <div
            data-testid="video-title-wrapper"
            className={styles.TitleWrapper}
          >
            {hasShortTitle && video.shortTitle && (
              <span className={styles.ShortTitle}>{video.shortTitle}</span>
            )}
            {video.title && !isFirst && (
              <>
                <h2 className={styles.VideoTitle} data-testid="video-title">
                  {video.title}
                </h2>
              </>
            )}
          </div>
        )}
        <div className={styles.Wrapper} data-testid="video-wrapper">
          <Video
            video={video}
            autoPlay={shouldAutoPlay}
            muted={isMuted}
            hasToLazyLoadBrightcoveScript={hasToLazyLoadBrightcoveScript}
          />
        </div>
        {!shouldHideVideoCaption &&
          ((ImageCaption && (video.credit || video.caption) && (
            <TestFragment data-testid="video-caption-wrapper">
              <ImageCaption
                caption={video.caption || ''}
                credit={video.credit || video.image?.credit || '&nbsp;'}
                origin={origin}
                suppressSource={suppressSource}
              />
            </TestFragment>
          )) || (
            <>
              {!isFirst && video.caption && (
                <div
                  className={styles.CaptionWrapper}
                  data-testid="video-info-wrapper"
                >
                  <p
                    className={styles.VideoCaption}
                    dangerouslySetInnerHTML={{ __html: video.caption }}
                  />
                </div>
              )}
              {!isFirst && (video.credit || video.image?.credit) && (
                <p className={styles.VideoCredit} data-testid="video-credit">
                  Quelle: {video.credit || video.image?.credit}
                </p>
              )}
            </>
          ))}
      </div>
    );
  };

  return VideoParagraph;
};
