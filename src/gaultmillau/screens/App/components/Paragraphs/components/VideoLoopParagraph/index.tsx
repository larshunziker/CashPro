import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import classNames from 'classnames';
import {
  assembleAkamaiImgUrl,
  getWidthAndHeightByImageStyle,
} from '../../../../../../../common/components/Picture/helpers';
import locationStateSelector from '../../../../../../../shared/selectors/locationStateSelector';
import Picture from '../../../../../../../common/components/Picture';
import { STYLE_16X9_1130 } from '../../../../../../../shared/constants/images';
import {
  TRACKING_CLASS_PARAGRAPH,
  TRACKING_CLASS_VIDEO_LOOP_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { VideoParagraphProps } from '../../../../../../../common/components/Paragraphs/components/VideoParagraph/typings';
import { VideoLoopParagraphProps } from './typings';

type VideoParagraphPropsInner = VideoParagraphProps;

export type VideoLoopParagraphPropsInner = VideoLoopParagraphProps;

const { width: coverImageWidth, height: coverImageHeight } =
  getWidthAndHeightByImageStyle(STYLE_16X9_1130);

const VideoLoopParagraph = ({
  addClass = '',
  videoLoopParagraph,
}: VideoLoopParagraphPropsInner): ReactElement => {
  const clientUrl = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).clientUrl,
  );

  const imageUrl = assembleAkamaiImgUrl({
    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
    relativeOriginPath: videoLoopParagraph.image?.file?.relativeOriginPath,
    width: coverImageWidth,
    height: coverImageHeight,
    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
    focalPointX: videoLoopParagraph.image?.file?.focalPointX,
    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
    focalPointY: videoLoopParagraph.image?.file?.focalPointY,
    clientUrl,
  });

  return (
    <div
      data-testid="video-loop-paragraph-wrapper"
      className={classNames(
        TRACKING_CLASS_PARAGRAPH,
        TRACKING_CLASS_VIDEO_LOOP_PARAGRAPH,
        styles.Wrapper,
        { [addClass]: !!addClass },
      )}
    >
      {imageUrl && (
        <video
          className={classNames(styles.VideoLoop, grid.HiddenSmDown)}
          poster={imageUrl}
          autoPlay
          muted
          loop
        >
          <track kind="captions" />
          {videoLoopParagraph.videoLoop &&
            videoLoopParagraph.videoLoop.videoMp4 &&
            videoLoopParagraph.videoLoop.videoMp4.mimeType &&
            videoLoopParagraph.videoLoop.videoMp4.source && (
              <source
                type={videoLoopParagraph.videoLoop.videoMp4.mimeType}
                src={videoLoopParagraph.videoLoop.videoMp4.source}
              />
            )}

          {videoLoopParagraph.videoLoop &&
            videoLoopParagraph.videoLoop.videoOgg &&
            videoLoopParagraph.videoLoop.videoOgg.mimeType &&
            videoLoopParagraph.videoLoop.videoOgg.source && (
              <source
                type={videoLoopParagraph.videoLoop.videoOgg.mimeType}
                src={videoLoopParagraph.videoLoop.videoOgg.source}
              />
            )}

          {videoLoopParagraph.videoLoop &&
            videoLoopParagraph.videoLoop.videoWebM &&
            videoLoopParagraph.videoLoop.videoWebM.mimeType &&
            videoLoopParagraph.videoLoop.videoWebM.source && (
              <source
                type={videoLoopParagraph.videoLoop.videoWebM.mimeType}
                src={videoLoopParagraph.videoLoop.videoWebM.source}
              />
            )}
        </video>
      )}
      {videoLoopParagraph?.image?.file?.relativeOriginPath && (
        <Picture
          relativeOrigin={videoLoopParagraph.image.file.relativeOriginPath}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
          focalPointX={videoLoopParagraph?.image?.file?.focalPointX}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
          focalPointY={videoLoopParagraph?.image?.file?.focalPointY}
          alt={videoLoopParagraph?.caption || ''}
          className={classNames(styles.VideoLoopFallback, grid.HiddenSmUp)}
          style_320={STYLE_16X9_1130}
          disableWrapperClassName
        />
      )}
    </div>
  );
};

const withUpdatePolicy = shouldUpdate<any>(
  (
    props: VideoParagraphPropsInner,
    nextProps: VideoParagraphPropsInner,
  ): boolean =>
    props.isFirst !== nextProps.isFirst ||
    props.addClass !== nextProps.addClass,
);

export default compose<any, any>(withUpdatePolicy)(VideoLoopParagraph);
