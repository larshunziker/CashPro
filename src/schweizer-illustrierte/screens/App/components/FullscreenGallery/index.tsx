import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views'. '/Users/bhs/code/work/rasch-stack/node_modules/re */
import SwipeableViews from 'react-swipeable-views';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-core/lib/mod'. '/Users/bhs/code/work/rasch-stack/no */
import mod from 'react-swipeable-views-core/lib/mod';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-utils'. '/Users/bhs/code/work/rasch-stack/node_modu */
import { bindKeyboard } from 'react-swipeable-views-utils';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-utils/lib/virtualize'. '/Users/bhs/code/work/rasch- */
import virtualize from 'react-swipeable-views-utils/lib/virtualize';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import raf from 'raf';
import { removeEmptyKeysFromObject } from '../../../../../shared/helpers/objectUtils';
import { tealiumTrackEvent } from '../../../../../shared/helpers/tealium';
import { getTealiumData } from '../../../../../shared/helpers/tealium/helper';
import scrollStateSelector from '../../../../../shared/selectors/scrollStateSelector';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import Picture from '../../../../../common/components/Picture';
import Icon from '../Icon';
import LoadingSpinner from '../LoadingSpinner';
import ModalOverlay from '../ModalOverlay';
import SwipeInteractionButton from '../SwipeInteractionButton';
import Caption from './components/Caption';
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
  STYLE_2X3_360,
  STYLE_2X3_960,
  STYLE_3X2_1000,
  STYLE_3X2_440,
  STYLE_3X2_770,
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
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illustrierte/ */
import { FULLSCREEN_GALLERY_QUERY } from './queries';
import styles from './styles.legacy.css';
import { CaptionRenderProps } from './components/Caption/typings';

const FORMAT_STYLE_MAPPING = {
  [IMAGE_FORMAT_LANDSCAPE]: {
    style_320: STYLE_3X2_440,
    style_540: STYLE_3X2_770,
    style_960: STYLE_3X2_1000,
  },
  [IMAGE_FORMAT_PORTRAIT]: {
    style_320: STYLE_2X3_360,
    style_540: STYLE_2X3_960,
  },
  [IMAGE_FORMAT_SQUARE]: {
    style_320: STYLE_1X1_495,
    style_760: STYLE_1X1_640,
    style_960: STYLE_1X1_660,
  },
};

type FullscreenGalleryPropsInner = Partial<RouterProps> & {
  routeHash: string;
  scrollScrollTop: number;
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
    const keywords = Object.keys(targeting.keywords).map(function (index) {
      return targeting.keywords[index];
    });
    targeting.keywords = keywords;
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

const EnhancedSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

const FullscreenGallery = ({
  scrollScrollTop,
  routeHash,
}: FullscreenGalleryPropsInner) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCaptionVisible, setIsCaptionVisible] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const navigate = useNavigate();
  const openingModeRef = useRef('');

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

  const keyPressListeners = useCallback(
    (event: KeyboardEvent) => {
      // esc key
      if (event.keyCode === 27) {
        closeFullscreen(event);
      }

      // i key
      if (event.keyCode === 73) {
        setIsCaptionVisible(!isCaptionVisible);
      }
    },
    [closeFullscreen, isCaptionVisible],
  );

  useEffect(() => {
    shouldUpdateAd = true;

    if (scrollScrollTop > 0) {
      setScrollTop(scrollScrollTop);
    }

    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.isFullscreenGallery = true;

    // init event listeners
    global.addEventListener('keydown', keyPressListeners, false);
    global.addEventListener('touchmove', preventDefault, false);

    // push state to handle history back issue if referrer is not same
    // we push on open our own page to the history to handle the close fullscreen with history back
    const hash = global.location.hash;
    global.history.replaceState(
      {},
      '',
      global.location.pathname + global.location.search,
    );
    global.history.replaceState(
      {},
      '',
      global.location.pathname + global.location.search + hash,
    );
    return () => {
      // unbind event listeners
      global.removeEventListener('keydown', keyPressListeners);
      global.removeEventListener('touchmove', preventDefault);
      global.scrollTo(0, scrollTop);
      shouldUpdateAd = false;
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      global.isFullscreenGallery = false;
    };
  }, [keyPressListeners, scrollTop, scrollScrollTop]);

  const gqlVariables = {
    path:
      global.location.pathname === '/'
        ? 'home-si'
        : global.location.pathname.replace(/^\/+/g, ''),
    publication: 'SI',
  };

  const { data, loading } = useQuery<FullscreenGalleryQueryComponentProps>(
    FULLSCREEN_GALLERY_QUERY,
    {
      variables: gqlVariables,
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

  if (loading || activeIndex === -1) {
    return (
      <div
        key={`fullscreen-gallery-loading-wrapper-${global?.location?.pathname}`}
        data-testid="fullscreen-gallery-wrapper-loading"
      >
        <ModalOverlay component={DEFAULT_MODAL_OVERLAY} isVisible>
          <section
            key={`fullscreen-gallery-loading-${global?.location?.pathname}`}
            data-testid="fullscreen-gallery-loading-spinner"
            className={styles.LoadingWrapper}
          >
            <LoadingSpinner />
          </section>
        </ModalOverlay>
      </div>
    );
  }

  const galleryItems: any =
    (Array.isArray(data?.environment?.routeByPath?.object?.media?.edges) &&
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      data.environment.routeByPath.object.media.edges.filter(
        ({ node }: any): boolean =>
          node.image !== null && node.image !== undefined,
      )) ||
    [];

  const getImageIdByIndex = (currentIndex: number) => {
    let imageId = '';
    galleryItems.forEach(({ node }: any, index: number) => {
      if (index === currentIndex) {
        imageId = node.id;
      }
    });
    return imageId;
  };

  const onInitCallback = () => {
    if (
      openingModeRef.current !== OPENING_MODE_IMAGE_CLICK &&
      data?.environment?.routeByPath
    ) {
      const tealiumTrackingData =
        getTealiumData(data?.environment?.routeByPath) || {};
      const action = {
        payload: {
          ...tealiumTrackingData,
        },
      };
      tealiumTrackEvent(action);
    }
    let imageIndex = activeIndex;
    const hash: Array<string> = global.location.hash.split(
      FULLSCREEN_HASH_SEPARATOR,
    );
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    const imageId: string = hash.pop();
    // find slider index by image id from hash
    /* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */
    galleryItems.forEach(({ node }, index: number) => {
      if (node.id === imageId && index !== activeIndex) {
        imageIndex = index;
      }
    });

    if (galleryItems?.length <= 1) {
      setIsLastSlide(true);
    }

    raf(() => {
      if (imageIndex !== activeIndex) {
        onTransitionEnd(imageIndex);
        setActiveIndex(imageIndex);
      }
    });
    return null;
  };

  const handleIndexChange = (index: number) => {
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
        gallery_paragraph: data?.environment?.routeByPath?.object?.id,
      },
    });
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  const onTransitionEnd = (index) => {
    const imageId: string = getImageIdByIndex(index);
    if (imageId && routeHash !== `#${FULLSCREEN_HASH}${imageId}`) {
      global.history.replaceState(
        {},
        '',
        `${
          global.location.pathname + global.location.search
        }#${FULLSCREEN_HASH}${imageId}`,
      );
    }
    if (!loading && galleryItems.length > 0) {
      setIsFirstSlide(index === 0);
      setIsLastSlide(index + 1 === (galleryItems && galleryItems.length));
    }
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
              className={classNames(styles.Icon, styles.NextButton, {
                [styles.DisabledButton]: isLastSlide,
              })}
              aria-label="Zum nächsten Bild"
              data-testid="fullscreen-gallery-next-button"
            />

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
              className={classNames(styles.Icon, styles.PrevButton, {
                [styles.DisabledButton]: isFirstSlide,
              })}
              data-testid="fullscreen-gallery-prev-button"
              aria-label="Zum vorherigen Bild"
            />

            <button
              onClick={(event) => toggleCaption(event)}
              onKeyUp={(event) => toggleCaption(event)}
              title="Info"
              className={classNames(styles.Icon, styles.InfoButton, {
                [styles.IsCaptionVisible]: isCaptionVisible,
              })}
              aria-label="Info"
              data-testid="fullscreen-gallery-info-button"
            />

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

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
export const mapStateToProps = (state) => ({
  routeHash: locationStateSelector(state).locationBeforeTransitions.hash,
  scrollScrollTop: scrollStateSelector(state).scrollTop,
});

export default connect(mapStateToProps)(FullscreenGallery);
