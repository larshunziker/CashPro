import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views'. '/Users/bhs/code/work/rasch-stack/node_modules/re */
import SwipeableViews from 'react-swipeable-views';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-core/lib/mod'. '/Users/bhs/code/work/rasch-stack/no */
import mod from 'react-swipeable-views-core/lib/mod';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-utils/lib/virtualize'. '/Users/bhs/code/work/rasch- */
import virtualize from 'react-swipeable-views-utils/lib/virtualize';
import classNames from 'classnames';
import { tealiumTrackEvent } from '../../../../../../../../../shared/helpers/tealium';
import cssClassByChannel from '../../../../../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../../../../../shared/selectors/settingsStateSelector';
import Picture from '../../../../../../../../../common/components/Picture';
import FullscreenButton from '../../../../../../components/FullscreenButton';
import Icon from '../../../../../../components/Icon';
import AirBnBIndicator from '../../../../../../components/ImageGallery/components/AirBnBIndicator';
import ImageCaption from '../../../../../../components/Paragraphs/components/ImageCaption';
import SwipeInteractionButton from '../../../../../../components/SwipeInteractionButton';
import {
  IMAGE_FORMAT_DEFAULT,
  IMAGE_FORMAT_LANDSCAPE,
  IMAGE_FORMAT_PORTRAIT,
  IMAGE_FORMAT_SQUARE,
  STYLE_16X9_1180,
  STYLE_16X9_340,
  STYLE_16X9_360,
  STYLE_16X9_560,
  STYLE_16X9_700,
  STYLE_16X9_800,
  STYLE_1X1_410,
  STYLE_1X1_640,
  STYLE_2X3_305,
  STYLE_2X3_360,
  STYLE_2X3_960,
} from '../../../../../../../../../shared/constants/images';
import {
  TRACKING_CLASS_IMAGE_GALLERY_HERO_PARAGRAPH,
  TRACKING_SLIDER_DIRECTION_BACKWARD,
  TRACKING_SLIDER_DIRECTION_FORWARD,
} from '../../../../../../../../../shared/constants/tracking';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ActiveMainChannel } from '../../../../../../../../shared/types';
import { ImageGalleryHeroProps } from './typings';

type ImageGalleryHeroPropsInner = ImageGalleryHeroProps;

// if you have to add new image style, make sure to updated the following css classes with the correts widths and heights: "ImageFormat-landscape" "ImageFormat-portrait" "ImageFormat-square"
const FORMAT_STYLE_MAPPING = {
  [IMAGE_FORMAT_LANDSCAPE]: {
    style_320: STYLE_16X9_340,
    style_480: STYLE_16X9_360,
    style_540: STYLE_16X9_560,
    style_760: STYLE_16X9_700,
    style_960: STYLE_16X9_800,
    style_1680: STYLE_16X9_1180,
  },
  [IMAGE_FORMAT_PORTRAIT]: {
    style_320: STYLE_2X3_360,
    style_540: STYLE_2X3_960,
    style_760: STYLE_2X3_305,
    style_960: STYLE_2X3_960,
  },
  [IMAGE_FORMAT_SQUARE]: {
    style_320: STYLE_1X1_410,
    style_760: STYLE_1X1_640,
  },
};

const EnhancedSwipeableViews = virtualize(SwipeableViews);

export const ImageGalleryHero = ({
  gallery,
}: ImageGalleryHeroPropsInner): ReactElement => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMainChannel = useSelector(
    (state) =>
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
      settingsStateSelector(state).activeMainChannel as ActiveMainChannel,
  );

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

  if (
    !galleryItems ||
    (Array.isArray(galleryItems) && galleryItems.length === 0)
  ) {
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

  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

  return (
    <div
      data-testid="wrapper"
      className={classNames(
        TRACKING_CLASS_IMAGE_GALLERY_HERO_PARAGRAPH,
        grid.Row,
        styles.Wrapper,
      )}
    >
      <div className={styles.SliderAndNavigationWrapper}>
        <EnhancedSwipeableViews
          index={activeIndex}
          onChangeIndex={handleIndexChange}
          enableMouseEvents={true}
          containerStyle={{ width: '100%' }}
          slideCount={galleryItems.length}
          /* @ts-ignore TODO: TS7031 ->  Binding element 'key' implicitly has an 'any' type. */
          /* @ts-ignore TODO: TS7031 ->  Binding element 'index' implicitly has an 'any' type. */
          slideRenderer={({ key, index }) => {
            const paragraphItem = galleryItems[mod(index, galleryItems.length)];

            const heroGalleryImageFormat: string =
              paragraphItem?.format || IMAGE_FORMAT_DEFAULT;

            return (
              <div key={`image-gallery-slide-item-${key}-${index}`}>
                <div className={styles.ImageWrapper}>
                  <div
                    className={
                      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '`FullscreenGalleryButton-${string}`' can't be used to  */
                      styles[
                        `FullscreenGalleryButton-${heroGalleryImageFormat}`
                      ]
                    }
                  >
                    <FullscreenButton
                      imageId={paragraphItem.id}
                      origin={'ImageGalleryHeroArticleScreen'}
                    />
                  </div>
                  {(paragraphItem?.image?.file?.relativeOriginPath && (
                    <Picture
                      relativeOrigin={
                        paragraphItem.image.file.relativeOriginPath
                      }
                      focalPointX={paragraphItem?.image?.file?.focalPointX}
                      focalPointY={paragraphItem?.image?.file?.focalPointY}
                      className={classNames(
                        styles.GalleryItem,
                        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '`ImageFormat-${string}`' can't be used to index type ' */
                        styles[`ImageFormat-${heroGalleryImageFormat}`],
                      )}
                      disableWrapperClassName
                      disableLineHeightResetClassName
                      downloadPriority="high"
                      alt={paragraphItem?.image?.file?.alt || ''}
                      style_320={
                        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                        FORMAT_STYLE_MAPPING[heroGalleryImageFormat]?.style_320
                      }
                      style_480={
                        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                        FORMAT_STYLE_MAPPING[heroGalleryImageFormat]?.style_480
                      }
                      style_540={
                        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                        FORMAT_STYLE_MAPPING[heroGalleryImageFormat]?.style_540
                      }
                      style_760={
                        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                        FORMAT_STYLE_MAPPING[heroGalleryImageFormat]?.style_760
                      }
                      style_960={
                        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                        FORMAT_STYLE_MAPPING[heroGalleryImageFormat]?.style_960
                      }
                      style_1680={
                        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
                        FORMAT_STYLE_MAPPING[heroGalleryImageFormat]?.style_1680
                      }
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

        {galleryItems.length > 1 && (
          <>
            <div>
              <SwipeInteractionButton
                onClickHandler={() => {
                  handleIndexChange(activeIndex + 1, activeIndex);
                }}
                direction="next"
              >
                <Icon type="IconArrowRight" />
              </SwipeInteractionButton>
            </div>

            <div className={styles.NavigationWrapper}>
              <button
                onClick={() => {
                  handleIndexChange(activeIndex - 1, activeIndex);
                }}
                className={classNames(
                  styles.Icon,
                  getThemedClass('PrevButton'),
                  {
                    [styles.DisabledButton]: activeIndex === 0,
                  },
                )}
                disabled={activeIndex === 0}
              />
              <button
                onClick={() => {
                  handleIndexChange(activeIndex + 1, activeIndex);
                }}
                className={classNames(
                  styles.Icon,
                  getThemedClass('NextButton'),
                  {
                    [styles.DisabledButton]:
                      activeIndex === galleryItems.length - 1,
                  },
                )}
                title="next"
                disabled={activeIndex === galleryItems.length - 1}
              />
            </div>
          </>
        )}
      </div>

      <div
        className={classNames(
          grid.ColSm20,
          grid.ColMd21,
          styles.ImageCaptionWrapper,
        )}
      >
        <ImageCaption
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
  );
};

export default ImageGalleryHero;
