import React, {
  ReactElement,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'lodash.uniqueid'. */
import uniqueId from 'lodash.uniqueid';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '@jwplayer/jwplayer-react'. */
import JWPlayerReact from '@jwplayer/jwplayer-react';
import { useSSRContext } from '../SSRContext';
import CSSPicture from '../CSSPicture';
import {
  STYLE_HEADER_16_9_LARGE,
  STYLE_HEADER_16_9_SMALL,
} from '../../../shared/constants/images';
import styles from './styles.legacy.css';
import type { JWPlayerFactoryOptions, JWPlayerProps } from './typings';

const ERROR_UNKNOWN = 'jwplayerError/unknown';
const ERROR_SCRIPT_LOADING = 'jwplayerError/script-loading';
const DEFAULT_ENDPOINT = 'https://cdn.jwplayer.com/libraries';

type JWPlayerPropsInner = JWPlayerProps;

type JWPlayerSetupOptions = {
  playlist: string;
  autostart?: boolean | 'viewable';
  mute?: boolean;
  aspectratio?: string;
  stretching?: string;
  height?: string;
  width?: string;
};

export const getErrorMessage = (error: string): string => {
  switch (error) {
    case ERROR_SCRIPT_LOADING:
      return 'JW Player script could not be loaded.';
    case ERROR_UNKNOWN:
    default:
      return 'An unknown JW Player error occurred.';
  }
};

const JWPlayerFactory = ({
  endpoint = DEFAULT_ENDPOINT,
  playerId,
}: JWPlayerFactoryOptions) => {
  const JWPlayer = ({
    video,
    autoPlay = true,
    muted = true,
    isObserveForAutoplayEnabled = false,
  }: JWPlayerPropsInner): ReactElement | null => {
    const { isSSR } = useSSRContext();
    const [error, setError] = useState('');
    const [isInitialized, setIsInitialized] = useState(false);
    const instanceIdRef = useRef(uniqueId());
    const elementId = useMemo(
      () => `jwplayer-${video?.jwPlayerId || 'video'}-${instanceIdRef.current}`,
      [video?.jwPlayerId],
    );

    useEffect(() => {
      if (isSSR) {
        return;
      }

      const playerElement = document.getElementById(elementId);

      if (!playerElement) {
        return;
      }

      playerElement.style.position = 'absolute';
      playerElement.style.inset = '0';
      playerElement.style.width = '100%';
      playerElement.style.height = '100%';
      playerElement.style.overflow = 'hidden';

      const aspectElement = playerElement.querySelector(
        '.jw-aspect',
      ) as HTMLElement | null;

      if (aspectElement) {
        aspectElement.style.display = 'none';
      }
    }, [elementId, isSSR, isInitialized]);

    const relativeOriginPath: string =
      video?.image?.file?.relativeOriginPath ||
      video?.teaserImage?.image?.file?.relativeOriginPath ||
      '';

    useEffect(() => {
      if (isSSR) {
        return;
      }

      if (!video?.jwPlayerId) {
        setError('');
        setIsInitialized(false);
        return;
      }

      setIsInitialized(false);

      if (!playerId || playerId === 'YOUR_PLAYER_ID') {
        setError(ERROR_SCRIPT_LOADING);
        return;
      }

      setError('');
    }, [isSSR, video?.jwPlayerId]);

    if (isSSR || !video?.jwPlayerId) {
      return null;
    }

    const libraryUrl = `${endpoint}/${playerId}.js`;
    const autostart = isObserveForAutoplayEnabled ? 'viewable' : autoPlay;
    const playerSetupOptions: JWPlayerSetupOptions = {
      playlist: `https://cdn.jwplayer.com/v2/media/${video.jwPlayerId}`,
      autostart,
      mute: muted || isObserveForAutoplayEnabled || autoPlay,
      width: '100%',
      height: '100%',
    };

    return (
      <div
        className={classNames(styles.Wrapper, {
          [styles.Loaded]: isInitialized,
        })}
      >
        <CSSPicture
          style_320={STYLE_HEADER_16_9_SMALL}
          style_540={STYLE_HEADER_16_9_LARGE}
          relativeOriginPath={relativeOriginPath}
        >
          {({ className }) => {
            return (
              <div
                className={classNames(styles.ErrorPanel, className)}
                style={{
                  display: !isInitialized || !!error ? 'block' : 'none',
                }}
              >
                {error ? (
                  <span data-testid="error-message-container">
                    {getErrorMessage(error)}
                  </span>
                ) : (
                  <span className={styles.Loader}>loading...</span>
                )}
              </div>
            );
          }}
        </CSSPicture>

        <div className={styles.Player}>
          {!error && (
            <JWPlayerReact
              id={elementId}
              library={libraryUrl}
              {...playerSetupOptions}
              onReady={() => {
                setIsInitialized(true);
              }}
              onSetupError={() => {
                setError(ERROR_SCRIPT_LOADING);
              }}
              onError={() => {
                setError(ERROR_UNKNOWN);
              }}
            />
          )}
        </div>
      </div>
    );
  };

  const FinalComponent = memo(JWPlayer);

  return (props: JWPlayerProps) => <FinalComponent {...props} />;
};

export default JWPlayerFactory;
