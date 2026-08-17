import React, { ReactElement, useState } from 'react';
import { connect } from 'react-redux';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views'. '/Users/bhs/code/work/rasch-stack/node_modules/re */
import SwipeableViews from 'react-swipeable-views';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-core/lib/mod'. '/Users/bhs/code/work/rasch-stack/no */
import mod from 'react-swipeable-views-core/lib/mod';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-utils/lib/virtualize'. '/Users/bhs/code/work/rasch- */
import virtualize from 'react-swipeable-views-utils/lib/virtualize';
import classNames from 'classnames';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import Picture from '../../../../../../../common/components/Picture';
import FullscreenButton from '../../../FullscreenButton';
import Icon from '../../../Icon';
import ImageCaption from '../../../Paragraphs/components/ImageCaption';
import SwipeInteractionButton from '../../../SwipeInteractionButton';
import AirBnBIndicator from '../AirBnBIndicator';
import { ImageGalleryPropsInner } from '../../../ImageGallery';
import {
  IMAGE_FORMAT_DEFAULT,
  IMAGE_FORMAT_LANDSCAPE,
  IMAGE_FORMAT_PORTRAIT,
  IMAGE_FORMAT_SQUARE,
  STYLE_1X1_410,
  STYLE_1X1_495,
  STYLE_1X1_640,
  STYLE_1X1_660,
  STYLE_2X3_305,
  STYLE_2X3_360,
  STYLE_2X3_960,
  STYLE_3X2_440,
  STYLE_3X2_770,
} from '../../../../../../../shared/constants/images';
import {
  TRACKING_SLIDER_DIRECTION_BACKWARD,
  TRACKING_SLIDER_DIRECTION_FORWARD,
} from '../../../../../../../shared/constants/tracking';
import { IMAGE_GALLERY_LAYOUT_DEFAULT } from '../../../ImageGallery/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import helpers from '../../../../assets/styles/helpers.legacy.css';
import styles from './styles.legacy.css';
import { ActiveMainChannel } from '../../../../../../shared/types';

type ImageGalleryDefaultPropsInner = ImageGalleryPropsInner & {
  activeMainChannel: ActiveMainChannel;
};

// if you have to add new image style, make sure to updated the following css classes with the correct widths and heights: "ImageFormat_landscape" "ImageFormat_portrait" "ImageFormat_square"
const FORMAT_STYLE_MAPPING = {
  [IMAGE_FORMAT_LANDSCAPE]: {
    style_320: STYLE_3X2_440,
    style_540: STYLE_3X2_770,
  },
  [IMAGE_FORMAT_PORTRAIT]: {
    style_320: STYLE_2X3_360,
    style_540: STYLE_2X3_960,
    style_760: STYLE_2X3_305,
    style_960: STYLE_2X3_960,
  },
  [IMAGE_FORMAT_SQUARE]: {
    style_320: STYLE_1X1_410,
    style_480: STYLE_1X1_495,
    style_760: STYLE_1X1_640,
    style_960: STYLE_1X1_660,
  },
};

const EnhancedSwipeableViews = virtualize(SwipeableViews);

export const ImageGallery = ({
  addClass = '',
  gallery,
  hasTitleOverride,
  activeMainChannel,
  title,
}: ImageGalleryDefaultPropsInner): ReactElement => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!gallery) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const galleryItems =
    gallery?.items &&
    // @ts-ignore PragraphsInterface typing issue
    gallery.items.filter(
      /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
      (item) => item.image !== null && item.image !== undefined,
    );

  if (!galleryItems?.length) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const handleIndexChange = (index: number, indexLast: number) => {
    setActiveIndex(index);
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
        gallery_paragraph: gallery.id,
      },
    });
  };

  const galleryTitle = hasTitleOverride ? title : gallery.title;

  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

  return (
    <>
      <div
        data-testid="imagegallery-container"
        className={classNames(
          grid.ColOffsetXs2,
          grid.ColXs20,
          grid.ColOffsetSm4,
          grid.ColSm16,
          grid.ColOffsetXl5,
          grid.ColXl14,
          helpers.TextCenter,
          addClass,
          {
            [styles.TitleWrapper]: galleryTitle,
          },
        )}
      >
        {galleryTitle && (
          <>
            {!hasTitleOverride && (
              <span
                data-testid="imagegallery-short-title"
                className={getThemedClass('HeadingCatch3')}
              >
                {gallery.shortTitle}
              </span>
            )}

            <h1
              data-testid="imagegallery-title"
              className={getThemedClass('Quote')}
            >
              {galleryTitle}
            </h1>
          </>
        )}
      </div>

      <div className={styles.Wrapper}>
        <div className={styles.SliderAndNavigationWrapper}>
          <EnhancedSwipeableViews
            index={activeIndex}
            onChangeIndex={handleIndexChange}
            enableMouseEvents={true}
            containerStyle={{ width: '100%' }}
            /* @ts-ignore TODO: TS7031 ->  Binding element 'key' implicitly has an 'any' type. */
            /* @ts-ignore TODO: TS7031 ->  Binding element 'index' implicitly has an 'any' type. */
            slideRenderer={({ key, index }) => {
              const node = galleryItems[mod(index, galleryItems.length)];
              const galleryImageFormat: string =
                node?.format || IMAGE_FORMAT_DEFAULT;

              return (
                <div key={`image-gallery-item-${key}-${node.id}`}>
                  <div
                    className={
                      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '`FullscreenGalleryButton_${string}`' can't be used to  */
                      styles[`FullscreenGalleryButton_${galleryImageFormat}`]
                    }
                  >
                    <FullscreenButton
                      imageId={node.id}
                      origin={IMAGE_GALLERY_LAYOUT_DEFAULT}
                    />
                  </div>
                  <div
                    key={`image-gallery-slide-item-${index}`}
                    className={styles.ImageWrapper}
                  >
                    {(node.image?.file?.relativeOriginPath && (
                      <Picture
                        relativeOrigin={node.image.file.relativeOriginPath}
                        focalPointX={node.image.file.focalPointX}
                        focalPointY={node.image.file.focalPointY}
                        className={styles.GalleryItem}
                        style_320={
                          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                          FORMAT_STYLE_MAPPING[galleryImageFormat]?.style_320
                        }
                        style_480={
                          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                          FORMAT_STYLE_MAPPING[galleryImageFormat]?.style_480
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
                        style_1680={
                          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                          FORMAT_STYLE_MAPPING[galleryImageFormat]?.style_1680
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

          <div className={styles.IndicatorWrapper}>
            <AirBnBIndicator
              slideCount={galleryItems.length}
              activeIndex={mod(activeIndex, galleryItems.length)}
              clearUpdateActiveIndex={(index) => {
                handleIndexChange(index, activeIndex);
              }}
              secondaryTheme
            />
          </div>

          <div>
            <SwipeInteractionButton
              onClickHandler={() => {
                handleIndexChange(activeIndex + 1, activeIndex);
              }}
              direction="next"
            >
              <Icon type="IconArrowRight" />
            </SwipeInteractionButton>
            <SwipeInteractionButton
              onClickHandler={() => {
                handleIndexChange(activeIndex - 1, activeIndex);
              }}
              direction="prev"
            >
              <Icon type="IconArrowLeft" />
            </SwipeInteractionButton>
          </div>

          <div className={styles.NavigationWrapper}>
            <button
              onClick={() => {
                handleIndexChange(activeIndex - 1, activeIndex);
              }}
              className={classNames(styles.Icon, getThemedClass('PrevButton'))}
              title="previous"
            />
            <button
              onClick={() => {
                handleIndexChange(activeIndex + 1, activeIndex);
              }}
              className={classNames(styles.Icon, getThemedClass('NextButton'))}
              title="next"
            />
          </div>
        </div>

        <div
          className={classNames(
            grid.ColOffsetXs2,
            grid.ColXs20,
            grid.ColOffsetSm4,
            grid.ColSm16,
            grid.ColOffsetXl5,
            grid.ColXl14,
            helpers.TextCenter,
          )}
        >
          <ImageCaption
            addClass={styles.ImageCaption}
            caption={
              galleryItems[mod(activeIndex, galleryItems.length)]?.caption || ''
            }
            suppressSource={
              galleryItems[mod(activeIndex, galleryItems.length)]
                ?.suppressSource || false
            }
            credit={
              galleryItems[mod(activeIndex, galleryItems.length)]?.image
                ?.credit || ''
            }
          />
        </div>
      </div>

      <div
        className={classNames(
          grid.ColOffsetXs2,
          grid.ColXs20,
          grid.ColOffsetSm4,
          grid.ColSm16,
          grid.ColOffsetXl5,
          grid.ColXl14,
          styles.BottomLine,
        )}
      />
    </>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(ImageGallery);
