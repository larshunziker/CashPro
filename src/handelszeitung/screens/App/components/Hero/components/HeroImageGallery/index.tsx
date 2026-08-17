import React, { useState } from 'react';
import { useSelector } from 'react-redux';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views'. '/Users/bhs/code/work/rasch-stack/node_modules/re */
import SwipeableViews from 'react-swipeable-views';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-core/lib/mod'. '/Users/bhs/code/work/rasch-stack/no */
import mod from 'react-swipeable-views-core/lib/mod';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-utils/lib/virtualize'. '/Users/bhs/code/work/rasch- */
import virtualize from 'react-swipeable-views-utils/lib/virtualize';
import classNames from 'classnames';
import { assembleAkamaiImgUrl } from '../../../../../../../common/components/Picture/helpers';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import locationStateSelector from '../../../../../../../shared/selectors/locationStateSelector';
import PagesIndicator from '../../../ImageGallery/components/PagesIndicator/index';
import Img from '../../../Img';
import ImageCaption from '../../../Paragraphs/components/ImageCaption';
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
  const clientUrl = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).clientUrl,
  );
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
      <div className={styles.SliderWrapper}>
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
            const url = assembleAkamaiImgUrl({
              relativeOriginPath: node?.image?.file?.relativeOriginPath,
              width: 1155,
              height: 770,
              focalPointX: node?.image?.file?.focalPointX,
              focalPointY: node?.image?.file?.focalPointY,
              clientUrl,
            });
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
                  <Img
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
                  />
                </span>
              </div>
            );
          }}
        ></EnhancedSwipeableViews>
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
      <PagesIndicator
        activeIndex={mod(activeIndex, galleryItems.length)}
        slideCount={galleryItems.length}
      />
      <div className={styles.ImageCaptionWrapper}>
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

export default HeroImageGallery;
