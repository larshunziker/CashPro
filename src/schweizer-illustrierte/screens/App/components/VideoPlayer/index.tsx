import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import brightcoveFactory from '../../../../../common/components/Brightcove/factory';
import { createSSRHelmet } from '../../../../../common/components/Brightcove/helpers';
import {
  assembleAkamaiImgUrl,
  getWidthAndHeightByImageStyle,
} from '../../../../../common/components/Picture/helpers';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import CSSPicture from '../../../../../common/components/CSSPicture';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import { useSSRContext } from '../../../../../common/components/SSRContext';
import {
  STYLE_HEADER_16_9_LARGE,
  STYLE_HEADER_16_9_SMALL,
  STYLE_THUMBNAIL,
} from '../../../../../shared/constants/images';
import {
  BRIGHTCOVE_ACCOUNT_ID,
  BRIGHTCOVE_PLAYER_ID,
} from '../../../App/constants';
import styles from './styles.legacy.css';
import { BrightcoveProps } from '../../../../../common/components/Brightcove/typings';

export type VideoPlayerPropsInner = BrightcoveProps;

const Player = brightcoveFactory({
  accountId: BRIGHTCOVE_ACCOUNT_ID,
  playerId: BRIGHTCOVE_PLAYER_ID,
});

const VideoPlayer = ({
  autoPlay = false,
  muted = false,
  isObserveForAutoplayEnabled = false,
  hasToLazyLoadBrightcoveScript = true,
  video,
}: VideoPlayerPropsInner): ReactElement | null => {
  const { isSSR } = useSSRContext();
  const clientUrl = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).clientUrl,
  );

  if (!video) {
    return null;
  }

  const relativeOriginPath: string =
    video?.image?.file?.relativeOriginPath ||
    video?.teaserImage?.image?.file?.relativeOriginPath ||
    '';

  const { height: imageHeight, width: imageWidth } =
    getWidthAndHeightByImageStyle(STYLE_HEADER_16_9_LARGE);
  const { width: thumbnailWidth, height: thumbnailHeight } =
    getWidthAndHeightByImageStyle(STYLE_THUMBNAIL);

  return (
    <div
      key={`video-${video.brightcoveId}`}
      data-testid="video-player-container"
      className={styles.Wrapper}
    >
      {createSSRHelmet(
        video,
        assembleAkamaiImgUrl({
          relativeOriginPath,
          width: imageWidth,
          height: imageHeight,
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
          focalPointX: video?.image?.file?.focalPointX,
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
          focalPointY: video?.image?.file?.focalPointY,
          clientUrl,
        }),
        assembleAkamaiImgUrl({
          relativeOriginPath,
          width: thumbnailWidth,
          height: thumbnailHeight,
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
          focalPointX: video?.image?.file?.focalPointX,
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
          focalPointY: video?.image?.file?.focalPointY,
          clientUrl,
        }),
      )}

      {(!__TESTING__ && !isSSR && video.brightcoveId && (
        <TestFragment data-testid="video-brightcove-wrapper">
          <Player
            video={video}
            autoPlay={autoPlay}
            muted={muted}
            isObserveForAutoplayEnabled={isObserveForAutoplayEnabled}
            hasToLazyLoadBrightcoveScript={hasToLazyLoadBrightcoveScript}
          />
        </TestFragment>
      )) || (
        <CSSPicture
          style_320={STYLE_HEADER_16_9_SMALL}
          style_540={STYLE_HEADER_16_9_LARGE}
          relativeOriginPath={relativeOriginPath}
        >
          {({ className }) => {
            return (
              <div
                data-testid="video-ssr-loading-container"
                className={classNames(styles.LoaderWrapper, className)}
              >
                <span className={styles.Loader}>loading...</span>
              </div>
            );
          }}
        </CSSPicture>
      )}
    </div>
  );
};

export default VideoPlayer;
