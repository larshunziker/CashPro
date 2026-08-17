import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-event-listener'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import EventListener from 'react-event-listener';
import { useNavigate } from 'react-router-dom';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views'. '/Users/bhs/code/work/rasch-stack/node_modules/re */
import SwipeableViews from 'react-swipeable-views';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-core/lib/mod'. '/Users/bhs/code/work/rasch-stack/no */
import mod from 'react-swipeable-views-core/lib/mod';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-utils/lib/virtualize'. '/Users/bhs/code/work/rasch- */
import virtualize from 'react-swipeable-views-utils/lib/virtualize';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import { removeEmptyKeysFromObject } from '../../../../../shared/helpers/objectUtils';
import { tealiumTrackEvent } from '../../../../../shared/helpers/tealium';
import { getTealiumData } from '../../../../../shared/helpers/tealium/helper';
import Picture from '../../../../../common/components/Picture';
import Icon from '../Icon';
import LoadingSpinner from '../LoadingSpinner';
import ModalOverlay from '../ModalOverlay';
import SwipeInteractionButton from '../SwipeInteractionButton';
import Caption from './components/Caption';
import SliderArrowLeft from './assets/slider_arrow_left.svg';
import SliderArrowRight from './assets/slider_arrow_right.svg';
import InfoActive from './assets/info_active.svg';
import InfoInActive from './assets/info_inactive.svg';
import {
  FULLSCREEN_HASH,
  FULLSCREEN_HASH_IMAGE_CLICK,
  FULLSCREEN_HASH_SEPARATOR,
  FULLSCREEN_HASH_TEASER_CLICK,
} from '../../../../../shared/constants/fullscreen';
import {
  IMAGE_FORMAT_DEFAULT,
  IMAGE_FORMAT_LANDSCAPE,
  IMAGE_FORMAT_PORTRAIT,
  IMAGE_FORMAT_SQUARE,
  STYLE_1X1_495,
  STYLE_1X1_640,
  STYLE_1X1_660,
  STYLE_3X4_360,
  STYLE_3X4_960,
  STYLE_16X9_440,
  STYLE_16X9_560,
  STYLE_16X9_890,
} from '../../../../../shared/constants/images';
import {
  TRACKING_SLIDER_DIRECTION_BACKWARD,
  TRACKING_SLIDER_DIRECTION_FORWARD,
} from '../../../../../shared/constants/tracking';
import { DEFAULT_MODAL_OVERLAY } from '../ModalOverlay/constants';
import {
  OPENING_MODE_DIRECT_URL,
  OPENING_MODE_IMAGE_CLICK,
  OPENING_MODE_TEASER_CLICK,
  RECTANGLE_AD_CLASS,
} from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/beobachter/screens/App/ */
import { FULLSCREEN_GALLERY_QUERY } from './queries';

// eslint-disable-next-line
import styles from './styles.legacy.css';
import { CaptionRenderProps } from './components/Caption/typings';

const FORMAT_STYLE_MAPPING = {
  [IMAGE_FORMAT_LANDSCAPE]: {
    style_320: STYLE_16X9_440,
    style_540: STYLE_16X9_560,
    style_960: STYLE_16X9_890,
  },
  [IMAGE_FORMAT_PORTRAIT]: {
    style_320: STYLE_3X4_360,
    style_540: STYLE_3X4_960,
  },
  [IMAGE_FORMAT_SQUARE]: {
    style_320: STYLE_1X1_495,
    style_760: STYLE_1X1_640,
    style_960: STYLE_1X1_660,
  },
};

type FullscreenGalleryQueryComponentProps = {
  environment: Environment & {
    routeByPath: {
      object: Route;
    };
  };
};

const registerSlots = () => {
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  const initialConfig = global.Ads?.config;
  const targeting =
    (initialConfig?.targeting &&
      removeEmptyKeysFromObject(initialConfig.targeting)) ||
    {};
  if (targeting && targeting.keywords) {
    targeting.keywords = Object.keys(targeting.keywords).map(function (index) {
      return targeting.keywords[index];
    });
  }

  // force ads for tests
  if (document.cookie && document.cookie.indexOf('RASCHFORCEADS') > -1) {
    targeting.admforce = 'qa';
  }

  if (!__TESTING__) {
    // appNexus function to push our slots
    window.admTagMan.q.push(function () {
      window.admTagMan.registerSlot({
        slot: 'MR_4',
        container: RECTANGLE_AD_CLASS,
        targeting: {
          ...targeting,
        },
      });

      window.admTagMan.loadSlots();
      window.admTagMan.showSlot(RECTANGLE_AD_CLASS);
    });
  }
};

let shouldUpdateAd = false;

const EnhancedSwipeableViews = virtualize(SwipeableViews);

const FullscreenGallery = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [galleryItems, setGalleryItems] = useState([]);
  const [isCaptionVisible, setIsCaptionVisible] = useState(true);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const navigate = useNavigate();
  const openingModeRef = useRef('');
  const dataForTealium = useRef(null);

  if (!openingModeRef.current) {
    if (global.location.hash.indexOf(FULLSCREEN_HASH_IMAGE_CLICK) !== -1) {
      openingModeRef.current = OPENING_MODE_IMAGE_CLICK;
    } else if (
      global.location.hash.indexOf(FULLSCREEN_HASH_TEASER_CLICK) !== -1
    ) {
      openingModeRef.current = OPENING_MODE_TEASER_CLICK;
    } else {
      openingModeRef.current = OPENING_MODE_DIRECT_URL;
    }
  }

  const closeFullscreen = useCallback(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (global.location.hash) {
        if (
          openingModeRef.current === OPENING_MODE_DIRECT_URL ||
          global.history.length === 1 ||
          (global.history.length === 2 && document.referrer === '')
        ) {
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          global.isFullscreenGallery = false;
          navigate(global.location.pathname + global.location.search, {
            replace: true,
          });
        } else {
          global.history.back();
        }
      }
    },
    [navigate],
  );

  const keyPressListeners = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        closeFullscreen(event);
        break;
      case 'i':
        setIsCaptionVisible(!isCaptionVisible);
        break;
      case 'ArrowRight':
        handleIndexChange(activeIndex + 1);
        break;
      case 'ArrowLeft':
        handleIndexChange(activeIndex - 1);
        break;
    }
  };

  useEffect(() => {
    shouldUpdateAd = true;

    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.isFullscreenGallery = true;

    // init event listeners
    global.addEventListener('touchmove', preventDefault, false);

    return () => {
      // unbind event listeners
      global.removeEventListener('touchmove', preventDefault);
      shouldUpdateAd = false;
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      global.isFullscreenGallery = false;
    };
  }, []);

  const gqlVariables = {
    path:
      global.location.pathname === '/'
        ? 'home'
        : global.location.pathname.replace(/^\/+/g, ''),
    publication: 'BEO',
  };

  const { data, loading } = useQuery<FullscreenGalleryQueryComponentProps>(
    FULLSCREEN_GALLERY_QUERY,
    {
      variables: gqlVariables,
      skip: activeIndex !== -1,
    },
  );

  const preventDefault = (event: MouseEvent | KeyboardEvent): void => {
    event.preventDefault();
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  const disableAutoFocus = (event) => {
    preventDefault(event);

    /*
     INFO: the .blur() is needed because of this plugin: https://github.com/postcss/postcss-focus
     this plugin automatically adds :focus css selectors if you only use a :hover selector.
     read sam's change request here: https://jira.ringieraxelspringer.ch/browse/SI-519
     */

    // @ts-ignore
    event.target.blur();
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  const toggleCaption = (event) => {
    disableAutoFocus(event);
    setIsCaptionVisible(!isCaptionVisible);
  };

  const getImageIdByIndex = (currentIndex: number) => {
    let imageId = '';
    galleryItems.forEach(({ node }: any, index: number) => {
      if (index === currentIndex) {
        imageId = node.id;
      }
    });
    return imageId;
  };
  const onTransitionEnd = (index: number) => {
    const imageId: string = getImageIdByIndex(index);
    if (
      imageId &&
      global.location.hash &&
      global.location.hash !== `${FULLSCREEN_HASH}${imageId}`
    ) {
      global.history.replaceState(
        undefined,
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'undefined' is not assignable to parameter of type 'string'. */
        undefined,
        `#${FULLSCREEN_HASH}${imageId}`,
      );
    }
    setIsFirstSlide(index === 0);
    setIsLastSlide(index + 1 >= galleryItems.length);
  };

  if (!loading && activeIndex === -1) {
    const galleryItemsTmp: any =
      (Array.isArray(data?.environment?.routeByPath?.object?.media?.edges) &&
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        data.environment.routeByPath.object.media.edges.filter(
          ({ node }: any): boolean =>
            node.image !== null && node.image !== undefined,
        )) ||
      [];

    let imageIndex = 0;
    const hash: Array<string> = global.location.hash.split(
      FULLSCREEN_HASH_SEPARATOR,
    );
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    const imageId: string = hash.pop();
    // find slider index by image id from hash
    /* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */
    galleryItemsTmp.forEach(({ node }, index: number) => {
      if (node.id === imageId) {
        imageIndex = index;
      }
    });
    /* @ts-ignore TODO: TS2322 ->  Type '(NodeInterface & { __typename? */
    dataForTealium.current = data?.environment?.routeByPath;
    setGalleryItems(galleryItemsTmp);
    setActiveIndex(imageIndex);
  }
  if (activeIndex === -1) {
    return (
      <div
        key={`fullscreen-gallery-loading-wrapper-${global?.location?.pathname}`}
        data-testid="fullscreen-gallery-wrapper-loading"
      >
        <ModalOverlay component={DEFAULT_MODAL_OVERLAY} isVisible>
          <div className={classNames(styles.Wrapper, styles.Slide)}>
            <section
              key={`fullscreen-gallery-loading-${global?.location?.pathname}`}
              data-testid="fullscreen-gallery-loading-spinner"
              className={styles.LoadingWrapper}
            >
              <LoadingSpinner />
            </section>
          </div>
        </ModalOverlay>
      </div>
    );
  }

  const onInitCallback = () => {
    if (
      openingModeRef.current !== OPENING_MODE_IMAGE_CLICK &&
      dataForTealium.current
    ) {
      const tealiumTrackingData = getTealiumData(dataForTealium.current) || {};
      const action = {
        payload: {
          ...tealiumTrackingData,
        },
      };
      tealiumTrackEvent(action);
    }
    onTransitionEnd(activeIndex);

    return null;
  };

  const handleIndexChange = (index: number) => {
    if (index < 0) {
      return;
    }

    if (index >= galleryItems.length) {
      return;
    }

    setActiveIndex(index);
    onTransitionEnd(index);

    const direction =
      index > activeIndex
        ? TRACKING_SLIDER_DIRECTION_FORWARD
        : TRACKING_SLIDER_DIRECTION_BACKWARD;

    tealiumTrackEvent({
      type: 'view',
      payload: {
        hit_type: 'gallery_view',
        gallery_current_image: index + 1,
        gallery_total_images: (galleryItems && galleryItems.length) || 0,
        gallery_direction: direction,
        /* @ts-ignore TODO: TS2339 ->  Property 'object' does not exist on type 'never'. */
        gallery_paragraph: dataForTealium.current?.object?.id,
      },
    });
  };

  // todo find a logic to refresh on window resize
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  if (!global.isFullscreenGallery && shouldUpdateAd) {
    setTimeout(() => {
      registerSlots();
      shouldUpdateAd = false;
    }, 0);
  }

  const counterJsx: ReactElement = (
    <div className={styles.Counter}>
      {activeIndex + 1} / {galleryItems.length}
    </div>
  );

  /* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'never'. */
  const activeGalleryItem = galleryItems[activeIndex]?.node;

  const captionCreaditJsx: ReactElement = (
    <>
      {activeGalleryItem?.caption && (
        <span
          dangerouslySetInnerHTML={{
            __html: activeGalleryItem?.caption,
          }}
        />
      )}
      {activeGalleryItem?.caption && ' '}
      {activeGalleryItem?.image?.credit &&
        !activeGalleryItem?.suppressSource && (
          <span className={styles.Credit}>
            {activeGalleryItem.image.credit}
          </span>
        )}
    </>
  );
  return (
    <div
      key={`fullscreen-gallery-wrapper-${global?.location?.pathname}`}
      data-testid="fullscreen-gallery-wrapper"
    >
      <ModalOverlay component={DEFAULT_MODAL_OVERLAY} isVisible>
        <EventListener target="window" onKeyDown={keyPressListeners} />
        <div
          key={`fullscreen-gallery-${global?.location?.pathname}`}
          className={styles.Wrapper}
          data-testid="fullscreen-gallery-container"
        >
          <EnhancedSwipeableViews
            action={onInitCallback}
            index={activeIndex}
            onChangeIndex={handleIndexChange}
            enableMouseEvents
            slideCount={galleryItems.length}
            resistance
            containerStyle={{ width: '100vw', height: '100vh' }}
            className={styles.Slider}
            /* @ts-ignore TODO: TS7031 ->  Binding element 'key' implicitly has an 'any' type. */
            /* @ts-ignore TODO: TS7031 ->  Binding element 'index' implicitly has an 'any' type. */
            slideRenderer={({ key, index }) => {
              /* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'never'. */
              const node = galleryItems[mod(index, galleryItems.length)]?.node;

              if (!node) {
                return;
              }

              const galleryImageFormat: string =
                node.format || IMAGE_FORMAT_DEFAULT;
              const originalUrl =
                (node.image?.showOriginal && node.image?.file?.origin) || null;

              return (
                <div
                  data-testid="image-gallery-items"
                  key={`image-gallery-item-${key}-${node.id}`}
                  className={styles.Slide}
                >
                  <div className={styles.ImageWrapper}>
                    {((node?.image?.file?.relativeOriginPath ||
                      originalUrl) && (
                      <Picture
                        url={originalUrl}
                        showOriginal={node.image?.showOriginal}
                        relativeOrigin={node.image.file.relativeOriginPath}
                        focalPointX={node.image.file.focalPointX}
                        focalPointY={node.image.file.focalPointY}
                        className={classNames(
                          styles.Image,
                          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '`ImageFormat_${string}`' can't be used to index type ' */
                          styles[`ImageFormat_${galleryImageFormat}`],
                          {
                            [styles.IsCaptionVisible]: isCaptionVisible,
                          },
                        )}
                        style_320={
                          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                          FORMAT_STYLE_MAPPING[galleryImageFormat]?.style_320
                        }
                        style_540={
                          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                          FORMAT_STYLE_MAPPING[galleryImageFormat]?.style_540
                        }
                        style_760={
                          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                          FORMAT_STYLE_MAPPING[galleryImageFormat]?.style_760
                        }
                        style_960={
                          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                          FORMAT_STYLE_MAPPING[galleryImageFormat]?.style_960
                        }
                        disableWrapperClassName
                        disableLineHeightResetClassName
                        alt={node?.image?.file?.alt || ''}
                      />
                    )) ||
                      null}
                  </div>
                </div>
              );
            }}
          />

          <div className={styles.MobileCaption}>
            <Caption activeIndex={activeIndex + 1}>
              {(c: CaptionRenderProps) => {
                return (
                  <div className={styles.Caption}>
                    {counterJsx}
                    <c.ScrollableContent>
                      {captionCreaditJsx}
                    </c.ScrollableContent>
                  </div>
                );
              }}
            </Caption>
          </div>

          <div
            className={classNames(styles.CaptionWrapper, {
              [styles.Active]: isCaptionVisible,
            })}
            data-testid="fullscreen-gallery-caption-credit-wrapper"
          >
            <div className={styles.Caption}>
              {counterJsx}
              {captionCreaditJsx}
            </div>
          </div>

          <div>
            {!isLastSlide && (
              <SwipeInteractionButton
                onClickHandler={() => {
                  handleIndexChange(activeIndex + 1);
                }}
                direction="next"
              >
                <Icon type="IconArrowRight" />
              </SwipeInteractionButton>
            )}
            {!isFirstSlide && (
              <SwipeInteractionButton
                onClickHandler={() => {
                  handleIndexChange(activeIndex - 1);
                }}
                direction="prev"
              >
                <Icon type="IconArrowLeft" />
              </SwipeInteractionButton>
            )}
          </div>

          <div className={styles.ControlWrapper}>
            <button
              onClick={(event) => closeFullscreen(event)}
              onKeyUp={(event) => closeFullscreen(event)}
              title="Schliessen"
              className={classNames(styles.Icon, styles.CloseButton)}
              aria-label="Schliessen"
              data-testid="fullscreen-gallery-close-button"
            />

            <button
              onClick={(event) => {
                disableAutoFocus(event);
                handleIndexChange(activeIndex + 1);
              }}
              onKeyUp={(event) => {
                disableAutoFocus(event);
                handleIndexChange(activeIndex + 1);
              }}
              title="Next"
              disabled={isLastSlide}
              className={classNames(styles.NextButton, {
                [styles.DisabledButton]: isLastSlide,
              })}
              aria-label="Zum nächsten Bild"
              data-testid="fullscreen-gallery-next-button"
            >
              <img src={SliderArrowRight} alt="Next" className={styles.Basic} />
            </button>

            <button
              onClick={(event) => {
                disableAutoFocus(event);
                handleIndexChange(activeIndex - 1);
              }}
              onKeyUp={(event) => {
                disableAutoFocus(event);
                handleIndexChange(activeIndex - 1);
              }}
              title="Previous"
              disabled={isFirstSlide}
              className={classNames(styles.PrevButton, {
                [styles.DisabledButton]: isFirstSlide,
              })}
              data-testid="fullscreen-gallery-prev-button"
              aria-label="Zum vorherigen Bild"
            >
              <img
                src={SliderArrowLeft}
                alt="Previous"
                className={styles.Basic}
              />
            </button>

            <button
              onClick={(event) => toggleCaption(event)}
              onKeyUp={(event) => toggleCaption(event)}
              title="Info"
              className={classNames(styles.InfoButton, {
                [styles.IsCaptionVisible]: isCaptionVisible,
              })}
              aria-label="Info"
              data-testid="fullscreen-gallery-info-button"
            >
              {isCaptionVisible && (
                <>
                  <img src={InfoActive} alt="Info" className={styles.Basic} />
                </>
              )}
              {!isCaptionVisible && (
                <>
                  <img src={InfoInActive} alt="Info" className={styles.Basic} />
                </>
              )}
            </button>

            <div
              className={styles.Counter}
              data-testid="fullscreen-gallery-counter"
            >
              {activeIndex + 1} / {galleryItems.length}
            </div>
          </div>

          {global.innerWidth >= 960 && (
            <div
              className={styles.AdWrapper}
              data-testid="fullscreen-gallery-ad-wrapper"
            >
              <div id={RECTANGLE_AD_CLASS} />
            </div>
          )}
        </div>
      </ModalOverlay>
    </div>
  );
};

export default FullscreenGallery;
