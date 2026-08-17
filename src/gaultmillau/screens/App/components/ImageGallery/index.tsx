import React, { ComponentType, useState } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views'. '/Users/bhs/code/work/rasch-stack/node_modules/re */
import SwipeableViews from 'react-swipeable-views';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-core/lib/mod'. '/Users/bhs/code/work/rasch-stack/no */
import mod from 'react-swipeable-views-core/lib/mod';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-utils/lib/virtualize'. '/Users/bhs/code/work/rasch- */
import virtualize from 'react-swipeable-views-utils/lib/virtualize';
import Picture from '../../../../../common/components/Picture';
import Icon from '../Icon';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../Paragraphs/components/ImageCaption'. '/Users/bhs/code/work/rasch-stack */
import ImageCaption from '../Paragraphs/components/ImageCaption';
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
} from '../../../../../shared/constants/images';
import { ImageGalleryProps } from './typings';

const EnhancedSwipeableViews = virtualize(SwipeableViews);

// if you have to add new image style, make sure to updated the following css classes with the correts widths and heights: "ImageFormat_landscape" "ImageFormat_portrait" "ImageFormat_square"
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

export const ImageGallery: ComponentType<ImageGalleryProps> = ({
  gallery,
  styles,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleIndexChange = (index: number) => {
    setActiveIndex(index);
  };

  if (!gallery.gallery) {
    return null;
  }

  const galleryItems = (gallery.gallery as ImageGallery & { items: any }).items;

  return (
    <div data-testid="image-gallery-wrapper" className={styles.Wrapper}>
      <div className={styles.SliderAndNavigationWrapper}>
        <EnhancedSwipeableViews
          index={activeIndex}
          onChangeIndex={handleIndexChange}
          enableMouseEvents={false}
          containerStyle={{ width: '100%' }}
          /* @ts-ignore TODO: TS7031 ->  Binding element 'key' implicitly has an 'any' type. */
          /* @ts-ignore TODO: TS7031 ->  Binding element 'index' implicitly has an 'any' type. */
          slideRenderer={({ key, index }) => {
            const node = galleryItems[mod(index, galleryItems.length)];
            const galleryImageFormat: string =
              node?.format || IMAGE_FORMAT_DEFAULT;

            if (
              !node.image ||
              !node.image.file ||
              !node.image.file.relativeOriginPath
            ) {
              return null;
            }

            return (
              <div
                key={`image-gallery-slide-item-${key}-${index}`}
                className={styles.Slide}
              >
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
                  alt={node?.image?.file?.alt}
                />
              </div>
            );
          }}
        />

        <div className={styles.NavigationWrapper}>
          <button
            onClick={() => {
              handleIndexChange(activeIndex - 1);
            }}
            className={styles.PrevButton}
            title="previous"
          >
            <Icon type="IconChevronLeft" />
          </button>
          <button
            onClick={() => {
              handleIndexChange(activeIndex + 1);
            }}
            className={styles.NextButton}
            title="next"
          >
            <Icon type="IconChevronRight" />
          </button>
        </div>

        <div className={styles.Indicator}>
          <span>{mod(activeIndex, galleryItems.length) + 1}</span>|
          <span>{galleryItems.length}</span>
        </div>
      </div>

      <div className={styles.ImageCaptionWrapper}>
        <ImageCaption
          caption={
            galleryItems[mod(activeIndex, galleryItems.length)]?.caption || ''
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

export default ImageGallery;
