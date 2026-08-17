import React, { useState } from 'react';
import { useSelector } from 'react-redux';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views'. '/Users/bhs/code/work/rasch-stack/node_modules/re */
import SwipeableViews from 'react-swipeable-views';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-core/lib/mod'. '/Users/bhs/code/work/rasch-stack/no */
import mod from 'react-swipeable-views-core/lib/mod';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-utils/lib/virtualize'. '/Users/bhs/code/work/rasch- */
import virtualize from 'react-swipeable-views-utils/lib/virtualize';
import classNames from 'classnames';
import { assembleAkamaiImgUrl } from '../../../../../common/components/Picture/helpers';
import { tealiumTrackEvent } from '../../../../../shared/helpers/tealium';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import Icon from '../Icon';
import Img from '../Img';
import ImageCaption from '../Paragraphs/components/ImageCaption';
import PagesIndicator from './components/PagesIndicator';
import styles from './styles.legacy.css';
import { ImageGalleryProps } from './typings';

const EnhancedSwipeableViews = virtualize(SwipeableViews);

const ImageGallery = ({ gallery }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const clientUrl = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).clientUrl,
  );
  const galleryItems =
    gallery?.gallery?.items &&
    // @ts-ignore PragraphsInterface typing issue
    gallery.gallery.items.filter(
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
  const galleryTitle = gallery.hasTitleOverride
    ? gallery.title
    : gallery.gallery.title;

  return (
    <div className={styles.Wrapper}>
      {galleryTitle && <h2 className={styles.Title}>{galleryTitle}</h2>}
      <div className={styles.SliderWrapper}>
        <EnhancedSwipeableViews
          index={activeIndex}
          onChangeIndex={handleIndexChange}
          enableMouseEvents={true}
          containerStyle={{ width: '100%' }}
          className={styles.Slider}
          /* @ts-ignore TODO: TS7031 ->  Binding element 'key' implicitly has an 'any' type. */
          /* @ts-ignore TODO: TS7031 ->  Binding element 'index' implicitly has an 'any' type. */
          slideRenderer={({ key, index }) => {
            const node = galleryItems[mod(index, galleryItems.length)];
            const url = assembleAkamaiImgUrl({
              relativeOriginPath: node?.image?.file?.relativeOriginPath,
              width: node?.image?.showOriginal ? 0 : 900, // inline_image_1200
              height: 0,
              clientUrl,
            });
            return (
              <div
                key={`image-gallery-item-${key}-${node.id}`}
                className={styles.Slide}
              >
                <span
                  className={classNames(styles.ImageWrapper, {
                    [styles.InactiveSlide]: activeIndex !== index,
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
          className={styles.PrevButton}
          aria-label="zurück"
        >
          <Icon type="IconChevronLeft" />
        </button>
        <button
          onClick={() => {
            handleIndexChange(activeIndex + 1);
          }}
          title="Weiter"
          aria-label="weiter"
          className={styles.NextButton}
        >
          <Icon type="IconChevronRight" />
        </button>
      </div>
      <PagesIndicator
        activeIndex={mod(activeIndex, galleryItems.length)}
        slideCount={galleryItems.length}
      />
      <div>
        <>
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
        </>
      </div>
    </div>
  );
};

export default ImageGallery;
