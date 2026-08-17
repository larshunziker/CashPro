import React, { useState } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views'. '/Users/bhs/code/work/rasch-stack/node_modules/re */
import SwipeableViews from 'react-swipeable-views';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-core/lib/mod'. '/Users/bhs/code/work/rasch-stack/no */
import mod from 'react-swipeable-views-core/lib/mod';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-utils/lib/virtualize'. '/Users/bhs/code/work/rasch- */
import virtualize from 'react-swipeable-views-utils/lib/virtualize';
import classNames from 'classnames';
// import { assembleAkamaiImgUrl } from '../../../../../../../common/components/Picture/helpers';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
// import PagesIndicator from '../../../ImageGallery/components/PagesIndicator/index';
// import Img from '../../../Img';
// import ImageCaption from '../../../Paragraphs/components/ImageCaption';
import SVGIcon from '../../../SVGIcon';
import {
  SVG_ICONS_TYPE_CHEVRON_LEFT,
  SVG_ICONS_TYPE_CHEVRON_RIGHT,
} from '../../../../../../../shared/constants/svgIcons';
import styles from './styles.legacy.css';
import { HeroImageGalleryProps } from './typings';

const EnhancedSwipeableViews = virtualize(SwipeableViews);

const HeroImageGallery = ({ gallery }: HeroImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryItems =
    gallery?.items &&
    // @ts-ignore PragraphsInterface typing issue
    gallery.items.filter(
      /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
      (item) => item.image !== null && item.image !== undefined,
    );

  if (
    !galleryItems ||
    !Array.isArray(galleryItems) ||
    galleryItems.length <= 0
  ) {
    return null;
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  const handleIndexChange = (index) => {
    setActiveIndex(index);

    tealiumTrackEvent({});
  };
  return (
    <div className={styles.Wrapper}>
      <EnhancedSwipeableViews
        index={activeIndex}
        onChangeIndex={handleIndexChange}
        enableMouseEvents={true}
        resistance
        className={styles.Slider}
        containerStyle={{ width: '100%' }}
        /* @ts-ignore TODO: TS7031 ->  Binding element 'key' implicitly has an 'any' type. */
        /* @ts-ignore TODO: TS7031 ->  Binding element 'index' implicitly has an 'any' type. */
        slideRenderer={({ key, index }) => {
          const node = galleryItems[mod(index, galleryItems.length)];
          // const url = assembleAkamaiImgUrl(
          //   node?.image?.file?.relativeOriginPath,
          //   1155,
          //   770,
          //   node?.image?.file?.focalPointX,
          //   node?.image?.file?.focalPointY,
          // );
          return (
            <div
              key={`image-gallery-item-${key}-${node.id}`}
              className={styles.Slide}
            >
              <span
                className={classNames(styles.ImageWrapper, {
                  [styles.UnactiveSlide]: activeIndex !== index,
                })}
              >
                {/* <Img
                  url={url}
                  alt={
                    (node &&
                      node.image &&
                      node.image.file &&
                      node.image.file.alt) ||
                    ''
                  }
                  addClass={styles.Image}
                  width={node?.image?.file?.width}
                  height={node?.image?.file?.height}
                  allowUpscaling
                /> */}
                IMG
              </span>
            </div>
          );
        }}
      ></EnhancedSwipeableViews>
      {/* <PagesIndicator
        activeIndex={mod(activeIndex, galleryItems.length)}
        slideCount={galleryItems.length}
      /> */}
      PAGES-INDICATOR
      <div className={styles.ImageCaptionWrapper}>
        {/* <ImageCaption
          caption={
            galleryItems[mod(activeIndex, galleryItems.length)]?.caption || ''
          }
          credit={
            galleryItems[mod(activeIndex, galleryItems.length)]?.image
              ?.credit || ''
          }
        /> */}
        IMAGECAPTION
      </div>
      <button
        onClick={() => {
          handleIndexChange(activeIndex - 1);
        }}
        title="Zurück"
        aria-label="zurück"
        className={styles.PrevButton}
      >
        <SVGIcon type={SVG_ICONS_TYPE_CHEVRON_LEFT} />
      </button>
      <button
        onClick={() => {
          handleIndexChange(activeIndex + 1);
        }}
        title="Weiter"
        aria-label="weiter"
        className={styles.NextButton}
      >
        <SVGIcon type={SVG_ICONS_TYPE_CHEVRON_RIGHT} />
      </button>
    </div>
  );
};

export default HeroImageGallery;
