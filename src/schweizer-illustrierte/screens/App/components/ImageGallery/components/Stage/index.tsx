import React, { useMemo, useState } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views'. '/Users/bhs/code/work/rasch-stack/node_modules/re */
import SwipeableViews from 'react-swipeable-views';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-core/lib/mod'. '/Users/bhs/code/work/rasch-stack/no */
import mod from 'react-swipeable-views-core/lib/mod';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-utils/lib/virtualize'. '/Users/bhs/code/work/rasch- */
import virtualize from 'react-swipeable-views-utils/lib/virtualize';
import classNames from 'classnames';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import InView from '../../../../../../../common/components/InView';
import Picture from '../../../../../../../common/components/Picture';
import FullscreenButton from '../../../FullscreenButton';
import Icon from '../../../Icon';
import SwipeInteractionButton from '../../../SwipeInteractionButton';
import AirBnBIndicator from '../AirBnBIndicator';
import {
  IMAGE_FORMAT_DEFAULT,
  IMAGE_FORMAT_LANDSCAPE,
  IMAGE_FORMAT_PORTRAIT,
  IMAGE_FORMAT_SQUARE,
  STYLE_1X1_410,
  STYLE_1X1_495,
  STYLE_1X1_640,
  STYLE_2X3_360,
  STYLE_2X3_960,
  STYLE_3X2_440,
  STYLE_3X2_770,
} from '../../../../../../../shared/constants/images';
import {
  TRACKING_SLIDER_DIRECTION_BACKWARD,
  TRACKING_SLIDER_DIRECTION_FORWARD,
} from '../../../../../../../shared/constants/tracking';
import { IMAGE_GALLERY_LAYOUT_STAGE } from '../../../ImageGallery/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../../../../common/assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { ImageGalleryStageProps } from './typings';

// if you have to add new image style, make sure to updated the following css classes with the correts widths and heights: "ImageFormat_landscape" "ImageFormat_portrait" "ImageFormat_square"
const FORMAT_STYLE_MAPPING = {
  [IMAGE_FORMAT_LANDSCAPE]: {
    style_320: STYLE_3X2_440,
    style_540: STYLE_3X2_770,
  },
  [IMAGE_FORMAT_PORTRAIT]: {
    style_320: STYLE_2X3_360,
    style_540: STYLE_2X3_960,
  },
  [IMAGE_FORMAT_SQUARE]: {
    style_320: STYLE_1X1_410,
    style_480: STYLE_1X1_495,
    style_760: STYLE_1X1_640,
  },
};

const EnhancedSwipeableViews = virtualize(SwipeableViews);

const ImageGallery = ({ gallery }: ImageGalleryStageProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const galleryItems = useMemo(
    () =>
      gallery?.items?.filter(
        /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
        (item) => item.image !== null && item.image !== undefined,
      ) || [],
    [gallery],
  );
  const galleryId = gallery?.id || null;

  const handleNext = () => {
    handleIndexChange(activeIndex + 1, activeIndex);
  };

  const handlePrev = () => {
    handleIndexChange(activeIndex - 1, activeIndex);
  };

  const handleIndexChange = (index: number, indexLast: number) => {
    setActiveIndex(index);
    setIsFirstSlide(index === 0);
    setIsLastSlide(index + 1 === (galleryItems && galleryItems.length));
    const direction =
      index > indexLast
        ? TRACKING_SLIDER_DIRECTION_FORWARD
        : TRACKING_SLIDER_DIRECTION_BACKWARD;
    tealiumTrackEvent({
      type: 'view',
      payload: {
        hit_type: 'gallery_view',
        gallery_current_image: index + 1,
        gallery_total_images: galleryItems.length,
        gallery_direction: direction,
        gallery_paragraph: galleryId,
      },
    });
  };

  if (!gallery || !galleryItems?.length) {
    return null;
  }

  return (
    <InView
      config={{
        rootMargin: '200px',
        threshold: 0,
        triggerOnce: true,
      }}
    >
      {({ isInView }) => {
        return (
          isInView && (
            <div data-testid="image-gallery-wrapper" className={styles.Wrapper}>
              <div
                data-testid="image-gallery-container"
                className={grid.Container}
              >
                <div
                  className={classNames(
                    sections.SectionPullOut,
                    styles.InnerWrapper,
                  )}
                >
                  <>
                    <div
                      className={classNames(
                        styles.ContentWrapper,
                        grid.HiddenSmUp,
                      )}
                    >
                      <p
                        data-testid="image-gallery-short-title"
                        className={styles.ShortTitle}
                      >
                        {gallery.shortTitle}
                      </p>
                      <p
                        data-testid="image-gallery-title"
                        className={styles.Title}
                      >
                        {gallery.title}
                      </p>
                    </div>

                    <div className={styles.SliderWrapper}>
                      <EnhancedSwipeableViews
                        index={activeIndex}
                        onChangeIndex={handleIndexChange}
                        enableMouseEvents={false}
                        containerStyle={{ width: '100%' }}
                        slideCount={galleryItems.length}
                        /* @ts-ignore TODO: TS7031 ->  Binding element 'key' implicitly has an 'any' type. */
                        /* @ts-ignore TODO: TS7031 ->  Binding element 'index' implicitly has an 'any' type. */
                        slideRenderer={({ key, index }) => {
                          const node =
                            galleryItems[mod(index, galleryItems.length)];

                          const shouldDisplayImageCredit =
                            !node?.suppressSource;

                          const galleryImageFormat: string =
                            node?.format || IMAGE_FORMAT_DEFAULT;

                          return (
                            <div key={`image-gallery-item-${key}-${node.id}`}>
                              <div
                                data-testid="image-gallery-items"
                                key={`image-gallery-slide-item-${index}`}
                                className={styles.SlideWrapper}
                              >
                                <div
                                  className={classNames(grid.Row, styles.Row)}
                                >
                                  <div
                                    className={classNames(
                                      grid.ColXs24,
                                      grid.ColSm18,
                                    )}
                                  >
                                    <div className={styles.ImageWrapper}>
                                      <div className={styles.ImageInnerWrapper}>
                                        <FullscreenButton
                                          imageId={node.id}
                                          origin={IMAGE_GALLERY_LAYOUT_STAGE}
                                        />
                                        {(node?.image?.file
                                          ?.relativeOriginPath && (
                                          <Picture
                                            relativeOrigin={
                                              node.image.file.relativeOriginPath
                                            }
                                            focalPointX={
                                              node.image.file.focalPointX
                                            }
                                            focalPointY={
                                              node.image.file.focalPointY
                                            }
                                            className={classNames(
                                              styles.Image,
                                              /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '`ImageFormat_${string}`' can't be used to index type ' */
                                              styles[
                                                `ImageFormat_${galleryImageFormat}`
                                              ],
                                            )}
                                            style_320={
                                              /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                                              FORMAT_STYLE_MAPPING[
                                                galleryImageFormat
                                              ]?.style_320
                                            }
                                            style_480={
                                              /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                                              FORMAT_STYLE_MAPPING[
                                                galleryImageFormat
                                              ]?.style_480
                                            }
                                            style_540={
                                              /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                                              FORMAT_STYLE_MAPPING[
                                                galleryImageFormat
                                              ]?.style_540
                                            }
                                            style_760={
                                              /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                                              FORMAT_STYLE_MAPPING[
                                                galleryImageFormat
                                              ]?.style_760
                                            }
                                            style_960={
                                              /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                                              FORMAT_STYLE_MAPPING[
                                                galleryImageFormat
                                              ]?.style_960
                                            }
                                            style_1680={
                                              /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                                              FORMAT_STYLE_MAPPING[
                                                galleryImageFormat
                                              ]?.style_1680
                                            }
                                            disableWrapperClassName
                                            disableLineHeightResetClassName
                                            alt={node?.image?.file?.alt || ''}
                                          />
                                        )) ||
                                          null}
                                      </div>
                                    </div>
                                    <div className={styles.Credit}>
                                      {(shouldDisplayImageCredit &&
                                        node?.image?.credit) || <>&nbsp;</>}
                                    </div>
                                  </div>
                                  <div
                                    className={classNames(
                                      grid.ColSm6,
                                      grid.HiddenSmDown,
                                    )}
                                  >
                                    <div className={styles.ContentWrapper}>
                                      <div
                                        className={classNames({
                                          [grid.HiddenXlUp]: activeIndex > 0,
                                        })}
                                      >
                                        <p
                                          data-testid="image-gallery-short-title"
                                          className={styles.ShortTitle}
                                        >
                                          {gallery.shortTitle}
                                        </p>
                                        <p
                                          data-testid="image-gallery-title"
                                          className={styles.Title}
                                        >
                                          {gallery.title}
                                        </p>
                                      </div>
                                      {node.caption && (
                                        <p
                                          className={classNames(
                                            styles.Caption,
                                            grid.HiddenXlDown,
                                          )}
                                          dangerouslySetInnerHTML={{
                                            __html: node?.caption,
                                          }}
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }}
                      />

                      <div>
                        <SwipeInteractionButton
                          onClickHandler={handleNext}
                          direction="next"
                        >
                          <Icon type="IconArrowRight" />
                        </SwipeInteractionButton>
                        <SwipeInteractionButton
                          onClickHandler={handlePrev}
                          direction="prev"
                        >
                          <Icon type="IconArrowLeft" />
                        </SwipeInteractionButton>
                      </div>

                      <div className={styles.ControlWrapper}>
                        <button
                          onClick={handlePrev}
                          disabled={isFirstSlide}
                          title="previous"
                          aria-label="Vorheriges Bild"
                          className={classNames(
                            styles.Icon,
                            styles.PrevButton,
                            {
                              [styles.DisabledButton]: isFirstSlide,
                            },
                          )}
                        />
                        <button
                          onClick={handleNext}
                          disabled={isLastSlide}
                          title="next"
                          aria-label="Nächstes Bild"
                          className={classNames(
                            styles.Icon,
                            styles.NextButton,
                            {
                              [styles.DisabledButton]: isLastSlide,
                            },
                          )}
                        />
                      </div>

                      <div className={styles.IndicatorWrapper}>
                        <AirBnBIndicator
                          slideCount={galleryItems.length}
                          activeIndex={mod(activeIndex, galleryItems.length)}
                          clearUpdateActiveIndex={(index) => {
                            handleIndexChange(index, activeIndex);
                          }}
                          withBoxShadow={false}
                        />
                      </div>
                    </div>

                    {galleryItems[activeIndex].caption && (
                      <div
                        className={classNames(styles.Caption, grid.HiddenXlUp)}
                        dangerouslySetInnerHTML={{
                          __html: galleryItems[activeIndex]?.caption,
                        }}
                      />
                    )}
                  </>
                </div>
              </div>
            </div>
          )
        );
      }}
    </InView>
  );
};

export default ImageGallery;
