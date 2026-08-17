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
import { mergeClasses } from '../../../../../shared/helpers/mergeClasses';
import { isInsideColumn } from '../../../../shared/helpers/isInsideColumn';
import { tealiumTrackEvent } from '../../../../../shared/helpers/tealium';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import Icon from '../Icon';
import Img from '../Img';
import FullscreenButton from '../FullscreenButton';
import ImageCaption from '../Paragraphs/components/ImageCaption';
import AirBnBIndicator from './components/AirBnBIndicator';
import SwipeInteractionButton from '../SwipeInteractionButton';
import SliderArrowLeft from '../FullscreenGallery/assets/slider_arrow_left.svg';
import SliderArrowRight from '../FullscreenGallery/assets/slider_arrow_right.svg';
import { isInLongFormArticleBody } from '../../../../shared/helpers/isInLongFormArticleBody';
import styles from './styles.legacy.css';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import { ImageGalleryProps } from './typings';

const EnhancedSwipeableViews = virtualize(SwipeableViews);

const ImageGallery = ({ gallery, origin }: ImageGalleryProps) => {
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

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const isInColumn = isInsideColumn(origin);
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const isInLongFormArticle = isInLongFormArticleBody(origin);

  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  const handleIndexChange = (index) => {
    setActiveIndex(index);
    tealiumTrackEvent({});
  };

  const galleryTitle = gallery.hasTitleOverride
    ? gallery.title
    : gallery.gallery.title;

  return (
    <div
      data-testid="image-gallery-wrapper"
      className={classNames(styles.Wrapper, {
        [mergeClasses([grid.ColXl18, grid.ColOffsetXl3])]: isInColumn,
        [mergeClasses([grid.ColSm20, grid.ColOffsetSm2])]: isInLongFormArticle,
      })}
    >
      {galleryTitle && <h2 className={styles.Title}>{galleryTitle}</h2>}
      <div className={styles.SliderWrapper}>
        <EnhancedSwipeableViews
          index={activeIndex}
          onChangeIndex={handleIndexChange}
          enableMouseEvents
          containerStyle={{ width: '100%' }}
          className={styles.Slider}
          /* @ts-ignore TODO: TS7031 ->  Binding element 'key' implicitly has an 'any' type. */
          /* @ts-ignore TODO: TS7031 ->  Binding element 'index' implicitly has an 'any' type. */
          slideRenderer={({ key, index }) => {
            const node = galleryItems[mod(index, galleryItems.length)];
            const url = assembleAkamaiImgUrl({
              relativeOriginPath: node?.image?.file?.relativeOriginPath,
              width: 900, // inline_image_1200
              height: 0,
              clientUrl,
            });
            return (
              <div
                key={`image-gallery-item-${key}-${node.id}`}
                className={styles.Slide}
              >
                <span className={styles.ImageWrapper}>
                  <FullscreenButton
                    imageId={node.id}
                    origin={'image-gallery'}
                  />
                  <Img
                    url={url}
                    alt={node?.image?.file?.alt || ''}
                    addClass={styles.Image}
                    width={node?.image?.file?.width}
                    height={node?.image?.file?.height}
                  />
                </span>
              </div>
            );
          }}
        />

        <SwipeInteractionButton
          direction="prev"
          addClass={styles.SwipeInteractionButton}
        >
          <Icon type="IconChevronLeft" />
        </SwipeInteractionButton>

        <SwipeInteractionButton
          direction="next"
          addClass={styles.SwipeInteractionButton}
        >
          <Icon type="IconChevronRight" />
        </SwipeInteractionButton>

        <div className={classNames(styles.IndicatorWrapper, grid.HiddenSmDown)}>
          <AirBnBIndicator
            slideCount={galleryItems.length}
            activeIndex={mod(activeIndex, galleryItems.length)}
            clearUpdateActiveIndex={(index) => {
              handleIndexChange(index);
            }}
          />
        </div>
      </div>

      <div className={classNames(styles.IndicatorWrapper, grid.HiddenSmUp)}>
        <AirBnBIndicator
          slideCount={galleryItems.length}
          activeIndex={mod(activeIndex, galleryItems.length)}
          clearUpdateActiveIndex={(index) => {
            handleIndexChange(index);
          }}
        />
      </div>
      <div className={styles.UnderSlidesWrapper}>
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
        <div className={styles.ControlWrapper}>
          <button
            onClick={() => handleIndexChange(activeIndex - 1)}
            title="previous"
            aria-label="Vorheriges Bild"
            className={classNames(styles.Icon, styles.PrevButton)}
          >
            <img
              src={SliderArrowLeft}
              alt="Previous"
              className={styles.Basic}
            />
          </button>
          <button
            onClick={() => handleIndexChange(activeIndex + 1)}
            title="next"
            aria-label="Nächstes Bild"
            className={classNames(styles.Icon, styles.NextButton)}
          >
            <img src={SliderArrowRight} alt="Next" className={styles.Basic} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
