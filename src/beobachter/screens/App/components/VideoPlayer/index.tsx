import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { buildJwPlayerEmbedUrl } from '../../../../../common/components/JWPlayer/helpers';
import jwPlayerFactory from '../../../../../common/components/JWPlayer/factory';
import { createSSRHelmet } from '../../../../../common/components/Brightcove/helpers';
import {
  assembleAkamaiImgUrl,
  getWidthAndHeightByImageStyle,
} from '../../../../../common/components/Picture/helpers';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import CSSPicture from '../../../../../common/components/CSSPicture';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import { useSSRContext } from '../../../../../common/components/SSRContext';
import {
  fetchJwPlayerIdByBrightcoveId,
  getResolvedJwPlayerId,
  withResolvedJwPlayerId,
} from '../../../../../shared/helpers/videoPlayer';
import {
  STYLE_HEADER_16_9_LARGE,
  STYLE_HEADER_16_9_SMALL,
  STYLE_THUMBNAIL,
} from '../../../../../shared/constants/images';
import { JWPLAYER_PLAYER_ID, JWPLAYER_SEO_PLAYER_ID } from '../../constants';
import styles from './styles.legacy.css';
import { BrightcoveProps } from '../../../../../common/components/Brightcove/typings';

export type VideoPropsInner = BrightcoveProps;

const JwPlayer = jwPlayerFactory({
  playerId: JWPLAYER_PLAYER_ID,
});

const { height, width } = getWidthAndHeightByImageStyle(
  STYLE_HEADER_16_9_LARGE,
);
const { height: thumbnailHeight, width: thumbnailWidth } =
  getWidthAndHeightByImageStyle(STYLE_THUMBNAIL);

const VideoPlayer = ({
  video,
  autoPlay = false,
  muted = false,
  isObserveForAutoplayEnabled = true,
}: VideoPropsInner): ReactElement | null => {
  const { isSSR } = useSSRContext();
  const [resolvedJwPlayerId, setResolvedJwPlayerId] = useState<string | null>(
    video?.jwPlayerId || null,
  );
  const clientUrl = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).clientUrl,
  );

  useEffect(() => {
    let isMounted = true;

    if (!video?.brightcoveId || video?.jwPlayerId || isSSR) {
      setResolvedJwPlayerId(video?.jwPlayerId || null);
      return () => {
        isMounted = false;
      };
    }

    setResolvedJwPlayerId(null);

    fetchJwPlayerIdByBrightcoveId(video.brightcoveId).then((jwPlayerId) => {
      if (isMounted) {
        setResolvedJwPlayerId(jwPlayerId);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [isSSR, video?.brightcoveId, video?.jwPlayerId]);

  if (!video) {
    return null;
  }

  const resolvedVideo = withResolvedJwPlayerId(video, resolvedJwPlayerId);

  const relativeOriginPath: string =
    video?.image?.file?.relativeOriginPath ||
    video?.teaserImage?.image?.file?.relativeOriginPath ||
    '';
  const focalPointX =
    video?.image?.file?.focalPointX ||
    video?.teaserImage?.image?.file?.focalPointX;
  const focalPointY =
    video?.image?.file?.focalPointY ||
    video?.teaserImage?.image?.file?.focalPointY;
  const jwPlayerId = getResolvedJwPlayerId(video, resolvedJwPlayerId);

  if (!jwPlayerId) {
    return null;
  }

  const jwPlayerEmbedUrl = jwPlayerId
    ? buildJwPlayerEmbedUrl(JWPLAYER_SEO_PLAYER_ID, jwPlayerId)
    : undefined;

  return (
    <div
      key={`video-${jwPlayerId || video.brightcoveId}`}
      data-testid="video-container"
      className={styles.Wrapper}
    >
      {createSSRHelmet(
        resolvedVideo,
        assembleAkamaiImgUrl({
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
          relativeOriginPath,
          width,
          height,
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
          focalPointX,
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
          focalPointY,
          clientUrl,
        }),
        assembleAkamaiImgUrl({
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
          relativeOriginPath,
          width: thumbnailWidth,
          height: thumbnailHeight,
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
          focalPointX,
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
          focalPointY,
          clientUrl,
        }),
        jwPlayerEmbedUrl,
      )}
      {(!__TESTING__ && !isSSR && (
        <TestFragment data-testid="video-brightcove-wrapper">
          <JwPlayer
            video={resolvedVideo}
            autoPlay={autoPlay}
            muted={muted}
            isObserveForAutoplayEnabled={isObserveForAutoplayEnabled}
          />
        </TestFragment>
      )) || (
        <CSSPicture
          style_320={STYLE_HEADER_16_9_SMALL}
          style_540={STYLE_HEADER_16_9_LARGE}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
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
