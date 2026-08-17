import React, { ComponentType, useState } from 'react';
import { useSelector } from 'react-redux';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views'. '/Users/bhs/code/work/rasch-stack/node_modules/re */
import SwipeableViews from 'react-swipeable-views';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-core/lib/mod'. '/Users/bhs/code/work/rasch-stack/no */
import mod from 'react-swipeable-views-core/lib/mod';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-utils/lib/virtualize'. '/Users/bhs/code/work/rasch- */
import virtualize from 'react-swipeable-views-utils/lib/virtualize';
import classNames from 'classnames';
import { assembleAkamaiImgUrl } from '../../../../../../../../../common/components/Picture/helpers';
import { tealiumTrackEvent } from '../../../../../../../../../shared/helpers/tealium';
import locationStateSelector from '../../../../../../../../../shared/selectors/locationStateSelector';
import AirBnBIndicator from '../../../../../../components/ImageGallery/components/AirBnBIndicator';
import Img from '../../../../../../components/Img';
import SliderArrowLeft from '../../../../../../components/FullscreenGallery/assets/slider_arrow_left.svg';
import SliderArrowRight from '../../../../../../components/FullscreenGallery/assets/slider_arrow_right.svg';
import ImageCaption from '../../../../../../components/Paragraphs/components/ImageCaption';
import FullscreenButton from '../../../../../../components/FullscreenButton';
import Icon from '../../../../../../components/Icon';
import SwipeInteractionButton from '../../../../../../components/SwipeInteractionButton';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ImageGalleryHeroProps } from './typings';

type ImageGalleryHeroPropsInner = ImageGalleryHeroProps;

const EnhancedSwipeableViews = virtualize(SwipeableViews);

const ImageGalleryHero: ComponentType<ImageGalleryHeroProps> = ({
  gallery,
}: ImageGalleryHeroPropsInner) => {
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
  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  const handleIndexChange = (index) => {
    setActiveIndex(index);

    tealiumTrackEvent({});
  };

  if (!gallery || !galleryItems?.length) {
    return null;
  }

  return (
    <div className={grid.Container}>
      <div className={styles.Wrapper}>
        <div className={styles.SliderWrapper}>
          <EnhancedSwipeableViews
            index={activeIndex}
            onChangeIndex={handleIndexChange}
            enableMouseEvents={true}
            resistance
            containerStyle={{ width: '100%' }}
            /* @ts-ignore TODO: TS7031 ->  Binding element 'key' implicitly has an 'any' type. */
            /* @ts-ignore TODO: TS7031 ->  Binding element 'index' implicitly has an 'any' type. */
            slideRenderer={({ key, index }) => {
              const node = galleryItems[mod(index, galleryItems.length)];
              const url = assembleAkamaiImgUrl({
                relativeOriginPath: node?.image?.file?.relativeOriginPath,
                width: 1695,
                height: 953,
                focalPointX: node?.image?.file?.focalPointX,
                focalPointY: node?.image?.file?.focalPointY,
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
                      origin={'image-gallery-hero'}
                    />
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
                      allowUpscaling
                    />
                  </span>
                </div>
              );
            }}
          ></EnhancedSwipeableViews>
          {galleryItems.length > 1 && (
            <div>
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
            </div>
          )}
          <div
            className={classNames(styles.IndicatorWrapper, grid.HiddenSmDown)}
          >
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
    </div>
  );
};

export default ImageGalleryHero;
