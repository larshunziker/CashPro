/* eslint-disable jsx-a11y/media-has-caption */
import React, {
  ReactElement,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-async-script-loader'. '/Users/bhs/code/work/rasch-stack/node_module */
import scriptLoader from 'react-async-script-loader';
import ReactDOMServer from 'react-dom/server';
import compose from 'recompose/compose';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'lodash.uniqueid'. '/Users/bhs/code/work/rasch-stack/node_modules/lodash.u */
import uniqueId from 'lodash.uniqueid';
import storageAvailable from '../../../shared/helpers/storage';
import { log } from '../../../shared/helpers/utils';
import { useSSRContext } from '../SSRContext';
import CSSPicture from '../CSSPicture';
import InView from '../InView';
import Link from '../Link';
import { BrightcovePlayer } from '../../../shared/@types/brightcove';
import { APP_NEXUS_CLASS_PREFIX } from '../../../shared/constants/ads';
import {
  STYLE_HEADER_16_9_LARGE,
  STYLE_HEADER_16_9_SMALL,
} from '../../../shared/constants/images';
import { ERROR_UNKNOWN, ERROR_VIDEO_NOT_FOUND } from './constants';
import styles from './styles.legacy.css';
import type { BrightcoveFactoryOptions, BrightcoveProps } from './typings';

let skipButtonTimer: number;
let intervalId: NodeJS.Timeout;

export type BrightcovePropsInner = BrightcoveProps & {
  isInView: boolean;
  entry?: IntersectionObserverEntry | null;
  isScriptLoaded: boolean;
  isScriptLoadSucceed: boolean;
  isStyleLoaded: boolean;
  isStyleLoadedSucceed: boolean;
  settingsState: SettingsState;
};

export const getErrorMessage = (error: string): string => {
  switch (error) {
    case ERROR_VIDEO_NOT_FOUND:
      return 'Das Video konnte nicht gefunden werden.';
    case ERROR_UNKNOWN:
    default:
      return 'Ein unbekannter Fehler ist aufgetreten.';
  }
};

const localStorageVolumeKey = 'brightcove:volumeLevel';
const isLocalStorageAvailable: boolean = storageAvailable('localStorage');
let isAdPaused = false;

function skipButtonDelayToggle() {
  return (isAdPaused = !isAdPaused);
}

const resetTimerInterval = (skipButtonDelay: number) => {
  skipButtonTimer = skipButtonDelay;
  clearInterval(intervalId);
};

function skipButtonDelayed(
  /* @ts-ignore TODO: TS7006 ->  Parameter 'element' implicitly has an 'any' type. */
  element,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'player' implicitly has an 'any' type. */
  player,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'skipButtonDelay' implicitly has an 'any' type. */
  skipButtonDelay,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'skipButtonLabel' implicitly has an 'any' type. */
  skipButtonLabel,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'skipButtonDelayLabel' implicitly has an 'any' type. */
  skipButtonDelayLabel,
) {
  intervalId = setInterval(function () {
    if (!isAdPaused) {
      if (skipButtonTimer > 1) {
        skipButtonTimer = skipButtonTimer - 1;
        element.innerText = skipButtonDelayLabel.replace('%s', skipButtonTimer);
      } else {
        element.classList.add('enabled');
        element.innerText = skipButtonLabel;
        element.addEventListener('click', function () {
          player.ima3 &&
            player.ima3.adsManager &&
            player.ima3.adsManager.stop();
          player.muted(false);

          // reset element to it's default values
          // this is needed if we have more then one ad in same video
          element.innerText = skipButtonDelayLabel.replace(
            '%s',
            skipButtonDelay,
          );
          element.classList.remove('enabled');
          resetTimerInterval(skipButtonDelay);
        });
      }
    }
  }, 1000);
}

/* @ts-ignore TODO: TS7006 ->  Parameter 'cuePointData' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'player' implicitly has an 'any' type. */
function displayCuePointOverlay(cuePointData, player) {
  let path = cuePointData?.metadata;
  if (
    !path ||
    (!path.startsWith('http') &&
      !path.startsWith('www') &&
      !path.startsWith('/'))
  ) {
    return;
  }

  if (path.startsWith('www')) {
    path = `http://${path}`;
  }

  const jsx = (
    <Link
      path={path}
      className="custom-interaction-link"
      nofollow={!path.startsWith('/')}
    />
  );

  const overlays = [
    {
      align: 'top',
      start: cuePointData.startTime,
      end:
        cuePointData.endTime > cuePointData.startTime
          ? cuePointData.endTime
          : 'end',
      content: ReactDOMServer.renderToString(jsx),
    },
  ];

  player.overlay({
    class: 'custom-interaction-overlay',
    overlays,
  });
}

/* @ts-ignore TODO: TS7006 ->  Parameter 'cuePoints' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'activeCueStartTime' implicitly has an 'any' type. */
function getCurrentCuePoint(cuePoints, activeCueStartTime) {
  return (
    /* @ts-ignore TODO: TS7006 ->  Parameter 'cuePoint' implicitly has an 'any' type. */
    cuePoints.find((cuePoint) => cuePoint['time'] === activeCueStartTime) ||
    null
  );
}

const videojsReadyCallback = (
  player: BrightcovePlayer,
  overlayAdLabel: string,
  skipButtonDelay: number,
  skipButtonLabel: string,
  skipButtonDelayLabel: string,
) => {
  let currentCuePointData = [];
  player.on('loadstart', () => {
    const textTracks = player.textTracks()[0];

    // when a cue point starts, extract cue data and pass data to be displayed
    textTracks.oncuechange = () => {
      if (textTracks?.activeCues[0] !== undefined) {
        currentCuePointData = getCurrentCuePoint(
          player.mediainfo.cuePoints,
          textTracks.activeCues[0].startTime,
        );
        displayCuePointOverlay(currentCuePointData, player);
      }
    };
  });

  player.on('ads-pause', () => {
    skipButtonDelayToggle();
  });

  player.on('ads-play', () => {
    skipButtonDelayToggle();
  });

  player.on('ads-ad-started', () => {
    const currentAd = player.ima3.currentAd;
    const skipButton = document.createElement('div');
    const adLable = document.createElement('div');
    adLable.classList.add('video-ad-label');
    adLable.innerText = overlayAdLabel;
    const overlays: Array<any> = [
      {
        align: 'top-left',
        start: 'play',
        content: adLable,
      },
    ];

    // if current ad duration is more then the defined length in each app then we show the skip button
    if (currentAd.getDuration() > skipButtonDelay) {
      skipButtonDelayed(
        skipButton,
        player,
        skipButtonDelay,
        skipButtonLabel,
        skipButtonDelayLabel,
      );
      skipButton.innerText = skipButtonDelayLabel.replace(
        '%s',
        String(skipButtonDelay),
      );
      skipButton.classList.add('video-skip-timer');
      overlays.push({
        align: 'bottom-right',
        start: 'play',
        content: skipButton,
      });
    }

    // reset element to it's default values
    // this is needed if we have more then one ad in same video
    player.on('ima3-complete', () => {
      skipButton.classList.remove('enabled');
      skipButton.innerText = skipButtonDelayLabel.replace(
        '%s',
        String(skipButtonDelay),
      );
      resetTimerInterval(skipButtonDelay);
    });

    // initialize the overlay plugin
    player.overlay({
      class: 'custom-overlay',
      overlays,
    });
  });

  player.on('volumechange', () => {
    if (isLocalStorageAvailable) {
      global.localStorage.setItem(
        localStorageVolumeKey,
        player.volume().toFixed(2),
      );
    }
  });

  if (isLocalStorageAvailable) {
    const volume: number = parseFloat(
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null' is not assignable to parameter of type 'string'. */
      global.localStorage.getItem(localStorageVolumeKey),
    );

    if (!isNaN(volume) && volume >= 0.0 && volume <= 1.0) {
      player.volume(volume);
    }
  }

  return null;
};

const BrightcoveFactory = ({
  playerId,
  accountId,
  skipButtonDelay = 15,
  overlayAdLabel: appOverlayAdLabel,
  skipButtonLabel: appSkipButtonLabel,
  skipButtonDelayLabel: appSkipButtonDelayLabel,
}: BrightcoveFactoryOptions) => {
  const config: InViewConfig = {
    rootMargin: '0px',
    threshold: 0.5,
  };

  const outerConfig: InViewConfig = {
    rootMargin: '150px',
    threshold: 0,
    triggerOnce: true,
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'callback' implicitly has an 'any' type. */
  const getVastUrlByAppnexus = (callback) => {
    window.admTagMan.q.push(() => {
      window.admTagMan.registerSlot({
        slot: 'PREROLL_1',
        container: `${APP_NEXUS_CLASS_PREFIX}preroll-1`,
        events: {
          /* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
          adReady(data) {
            if (data && data.vastUrl) {
              log(
                'appnexus-provider',
                ['preroll_1 adReady VAST URL: ', data.vastUrl],
                'green',
              );
              callback(data.vastUrl);
            } else {
              log(
                'appnexus-provider',
                ['preroll_1 adReady no VAST URL available!'],
                'red',
              );
              callback('');
            }
          },
        },
      });

      window.admTagMan.loadSlots();
      window.admTagMan.showSlot(`${APP_NEXUS_CLASS_PREFIX}preroll-1`);
    });
  };

  const Brightcove = ({
    isScriptLoaded,
    isScriptLoadSucceed,
    isStyleLoaded,
    isStyleLoadedSucceed,
    video,
    autoPlay = false,
    muted = false,
    isObserveForAutoplayEnabled = false,
    entry,
    ...props
  }: BrightcovePropsInner): ReactElement => {
    const { isSSR } = useSSRContext();
    const [error, setError] = useState('');
    const [isDirty, setIsDirty] = useState(false); // Boolean value if the video had user interaction
    const [player, setPlayer] = useState<BrightcovePlayer | null>(null); // Brightcove video object of the current video
    const videoEl = useRef<HTMLVideoElement | null>(null); // Reference of the <video> element
    const [showVideo, setShowVideo] = useState(false);
    const getOverlayAdLabel: string =
      (typeof appOverlayAdLabel === 'function' && appOverlayAdLabel(props)) ||
      (typeof appOverlayAdLabel === 'string' && appOverlayAdLabel) ||
      'Anzeige';
    const getSkipButtonLabel: string =
      (typeof appSkipButtonLabel === 'function' && appSkipButtonLabel(props)) ||
      (typeof appSkipButtonLabel === 'string' && appSkipButtonLabel) ||
      'Werbung überspringen';
    const getSkipButtonDelayLabel: string =
      (typeof appSkipButtonDelayLabel === 'function' &&
        appSkipButtonDelayLabel(props)) ||
      (typeof appSkipButtonDelayLabel === 'string' &&
        appSkipButtonDelayLabel) ||
      'Werbung in %s Sek. überspringen';

    const relativeOriginPath: string =
      video?.image?.file?.relativeOriginPath ||
      video?.teaserImage?.image?.file?.relativeOriginPath ||
      '';

    useEffect(() => {
      if (!error && videoEl.current) {
        setShowVideo(true);
      }
    }, [
      error,
      isScriptLoaded,
      isScriptLoadSucceed,
      isStyleLoaded,
      isStyleLoadedSucceed,
    ]);

    useEffect(() => {
      if (videoEl.current) {
        try {
          // this is used if a user clicks on related video so we have to reset the timer since we do not an unmount
          resetTimerInterval(skipButtonDelay);

          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          const bcPlayer: BrightcovePlayer = global.bc(videoEl.current);

          bcPlayer.ima3({
            requestMode: 'onplay',
            /* @ts-ignore TODO: TS7006 ->  Parameter 'callback' implicitly has an 'any' type. */
            serverUrl: (callback) => {
              getVastUrlByAppnexus(callback);
            },
          });

          bcPlayer.ready(() => {
            videojsReadyCallback(
              bcPlayer,
              getOverlayAdLabel,
              skipButtonDelay,
              getSkipButtonLabel,
              getSkipButtonDelayLabel,
            );
          });

          setPlayer(bcPlayer);
        } catch (err) {
          log('[Brightcove] error', err.message);
        }
      }

      return () => {
        // unmounting player
        if (player && player.dispose && typeof player.dispose === 'function') {
          player.dispose();
        }
      };
    }, [
      isScriptLoaded,
      isScriptLoadSucceed,
      isStyleLoaded,
      isStyleLoadedSucceed,
      player,
      getOverlayAdLabel,
      getSkipButtonLabel,
      getSkipButtonDelayLabel,
    ]);

    if (player) {
      try {
        player?.catalog &&
          player.catalog.getVideo(
            video.brightcoveId,
            (err: Record<string, any>) => {
              if (err && err.responseText) {
                if (err.responseText.indexOf('VIDEO_NOT_FOUND') > -1) {
                  setError(ERROR_VIDEO_NOT_FOUND);
                } else {
                  setError(ERROR_UNKNOWN);
                }
              } else {
                setError('');
              }
            },
          );
      } catch (err) {
        log('[Brightcove] error', err.message);
        setError(ERROR_UNKNOWN);
      }
    }

    const videoClickCallback = useCallback(() => {
      // pause all players except one (defined by id)
      try {
        const allPlayers: Array<BrightcovePlayer> =
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          global.videojs.getAllPlayers();
        allPlayers.forEach((videoItem: BrightcovePlayer) => {
          const videoId: string = videoItem.id();
          if (videoId !== player?.id_) {
            /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
            global.videojs(videoId).pause();
          }
        });
      } catch (err) {
        log('[Brightcove] error', err.message);
      }

      // if a video is muted and has not been touched by the user, unmute it an continue the video playback
      if (player && player.muted() && !isDirty) {
        player.play();
        player.muted(false);
      }
      setIsDirty(true);
    }, [isDirty, player]);

    let playerJsx: ReactElement | null = null;

    // video stage autoplay for iOS

    useEffect(() => {
      if (
        player &&
        autoPlay &&
        !isObserveForAutoplayEnabled &&
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global.videojs?.browser?.IS_IOS &&
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global.videojs?.browser?.IS_SAFARI
      ) {
        // // auto-play on OS/IOs catch browser settings https://webkit.org/blog/7734/
        player.play().catch((err: Error): void => {
          // play failed
          player.muted(true);
          if (err.message === 'The operation was aborted.') {
            player.play();
          }
        });
      }
    }, [autoPlay, player, isObserveForAutoplayEnabled]);

    // inView autoplay functionallity
    if (player && isObserveForAutoplayEnabled && !isDirty) {
      const is50PercentVisible: boolean =
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        entry?.intersectionRatio >= config.threshold;
      if (is50PercentVisible) {
        player.muted(true); // this is to make it work on iOS
        player.play();
      } else {
        // if the video is muted while leaving the viewport, pause the video
        if (player.muted()) {
          player.pause();
        } else {
          // set isDirty to true if the video has been plyed, so the observer longer effects the video playing state
          if (player.played().length > 0) {
            setIsDirty(true);
          }
        }
      }
    }

    if (
      isScriptLoaded &&
      isScriptLoadSucceed &&
      isStyleLoaded &&
      isStyleLoadedSucceed
    ) {
      playerJsx = (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          autoPlay={
            /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
            isObserveForAutoplayEnabled || global.videojs?.browser?.IS_IOS
              ? false
              : autoPlay
          }
          className={classNames('video-js', styles.Player)}
          controls
          data-account={accountId}
          data-embed="default"
          data-player={playerId}
          data-testid="factory-video-element"
          data-video-id={video.brightcoveId}
          id={`brightcoveVideo${uniqueId()}`}
          playsInline={true}
          muted={!isDirty && isObserveForAutoplayEnabled ? true : muted}
          ref={videoEl}
          onClick={videoClickCallback}
        ></video>
      );
    }

    if (isSSR) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }

    return (
      <div
        className={classNames(styles.Wrapper, {
          [styles.Loaded]: showVideo,
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
                  display:
                    !!error ||
                    (isScriptLoaded && !isScriptLoadSucceed) ||
                    !isStyleLoadedSucceed
                      ? 'block'
                      : 'none',
                }}
              >
                <span data-testid="error-message-container">
                  {getErrorMessage(error)}
                </span>
              </div>
            );
          }}
        </CSSPicture>
        {playerJsx}
      </div>
    );
  };

  function arePropsEqual(
    prevProps: BrightcovePropsInner,
    nextProps: BrightcovePropsInner,
  ) {
    return (
      prevProps.isScriptLoaded &&
      prevProps.isScriptLoadSucceed &&
      prevProps.isStyleLoaded &&
      prevProps.isStyleLoadedSucceed &&
      nextProps.isInView &&
      !nextProps.isInView
    );
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'WrappedComponent' implicitly has an 'any' type. */
  const withCssLoader = (WrappedComponent) => {
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    const CssLoaderComopnent = (props) => {
      const styleId = 'ima3-stylings-vast';

      const [isStyleLoading, setIsStyleLoading] = useState(false);
      const [isStyleLoaded, setIsStyleLoaded] = useState(false);
      const [isStyleLoadedSucceed, setIsStyleLoadedSucceed] = useState(false);

      useEffect(() => {
        const style: HTMLElement | null = document.getElementById(styleId);

        if (style) {
          setIsStyleLoaded(true);
          setIsStyleLoadedSucceed(true);
          return;
        }

        if (!isStyleLoading && !isStyleLoaded && !isStyleLoadedSucceed) {
          setIsStyleLoading(true);

          const ima3Stylings = document.createElement('link');
          ima3Stylings.id = styleId;
          ima3Stylings.onload = () => {
            setIsStyleLoaded(true);
            setIsStyleLoadedSucceed(true);
            setIsStyleLoading(false);
          };
          ima3Stylings.onerror = () => {
            setIsStyleLoaded(true);
            setIsStyleLoadedSucceed(false);
            setIsStyleLoading(false);
          };

          ima3Stylings.rel = 'stylesheet';
          ima3Stylings.type = 'text/css';
          ima3Stylings.href =
            '//players.brightcove.net/videojs-ima3/3/videojs.ima3.min.css';

          if (document.head) {
            document.head.appendChild(ima3Stylings);
          }
        }
      }, [isStyleLoading, isStyleLoaded, isStyleLoadedSucceed]);

      return (
        <WrappedComponent
          {...props}
          isStyleLoaded={isStyleLoaded}
          isStyleLoadedSucceed={isStyleLoadedSucceed}
        />
      );
    };

    return CssLoaderComopnent;
  };

  const FinalComponent = compose<any, any>(
    withCssLoader,
    scriptLoader(
      `//players.brightcove.net/${accountId}/${playerId}_default/index.min.js`,
      '//players.brightcove.net/videojs-ima3/3/videojs.ima3.min.js',
      '//players.brightcove.net/videojs-overlay/2/videojs-overlay.min.js',
    ),
  )(memo(Brightcove, arePropsEqual));

  return ({
    hasToLazyLoadBrightcoveScript = true,
    isObserveForAutoplayEnabled = false,
    ...props
  }) => {
    if (hasToLazyLoadBrightcoveScript) {
      return (
        <InView config={outerConfig}>
          {({ isInView }) => {
            return (
              isInView && (
                <InView config={config}>
                  {({ isInView: isInViewInner, entry }) => {
                    return (
                      <FinalComponent
                        {...props}
                        isObserveForAutoplayEnabled={
                          isObserveForAutoplayEnabled
                        }
                        hasToLazyLoadBrightcoveScript={
                          hasToLazyLoadBrightcoveScript
                        }
                        isInView={isInViewInner}
                        entry={entry}
                      />
                    );
                  }}
                </InView>
              )
            );
          }}
        </InView>
      );
    } else {
      return (
        <FinalComponent
          {...props}
          isObserveForAutoplayEnabled={isObserveForAutoplayEnabled}
        />
      );
    }
  };
};

export default BrightcoveFactory;
