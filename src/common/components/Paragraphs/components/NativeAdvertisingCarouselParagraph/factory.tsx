import React from 'react';
import compose from 'recompose/compose';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'lodash.shuffle'. '/Users/bhs/code/work/rasch-stack/node_modules/lodash.sh */
import shuffle from 'lodash.shuffle';
import heightByAspectRatio from '../../../../../shared/helpers/heightByAspectRatio';
import {
  NativeAdvertisingCarouselParagraphFactoryOptions,
  NativeAdvertisingCarouselParagraphProps,
} from './typings';

type NativeAdvertisingCarouselParagraphPropsInner =
  NativeAdvertisingCarouselParagraphProps;

export default ({
  Slider,
  sliderIndicator,
  sliderIndicatorPosition,
  autoplay,
  opacityInactive,
  Teaser,
  teaserLayout,
  trackingClassNAParagraph,
  trackingClass,
  ensureTeaserInterface,
  detectParentDimensionsMemoized,
  detectParentDimensionsCacheKey,
  tealiumTrackEvent,
  getAspectRatio,
  styles,
}: NativeAdvertisingCarouselParagraphFactoryOptions) => {
  const NativeAdvertisingCarouselParagraph = (
    props: NativeAdvertisingCarouselParagraphPropsInner,
  ) => {
    const { nativeAdvertisingCarouselParagraph, parentDimensions } = props;

    let carouselItems: Array<any> =
      (nativeAdvertisingCarouselParagraph?.nativeAdvertising?.edges &&
        nativeAdvertisingCarouselParagraph.nativeAdvertising.edges.length > 0 &&
        nativeAdvertisingCarouselParagraph.nativeAdvertising.edges.filter(
          (item): boolean => item?.node?.teaserImage !== null,
        )) ||
      [];

    carouselItems = ensureTeaserInterface(carouselItems);
    carouselItems = shuffle(carouselItems);

    if (
      carouselItems &&
      Array.isArray(carouselItems) &&
      carouselItems.length <= 0
    ) {
      return null;
    }

    const onSliderPositionUpdated =
      () =>
      /* @ts-ignore TODO: TS7006 ->  Parameter '_' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7006 ->  Parameter 'direction' implicitly has an 'any' type. */
      (_, direction): void => {
        direction && tealiumTrackEvent({});
      };

    const carouselHeight: number = heightByAspectRatio(
      Math.round(parentDimensions.width),
      getAspectRatio(),
    );

    const slideDimensions: Array<any> = carouselItems.map(() => ({
      width: Math.round(parentDimensions.width),
      height: carouselHeight,
    }));

    // render just one teaser not as carousel
    if (
      carouselItems &&
      Array.isArray(carouselItems) &&
      carouselItems.length === 1
    ) {
      return (
        <div className={classNames(trackingClass, trackingClassNAParagraph)}>
          <Teaser
            component={teaserLayout}
            node={carouselItems[0]?.node || null}
            {...(carouselItems[0]?.node || null)}
            first
          />
        </div>
      );
    }

    const renderItems = (items: Array<any>) =>
      items.map((node, index: number) => {
        return () => {
          return (
            <div key={index} className={styles.TeaserWrapper}>
              <Teaser
                key={index}
                component={teaserLayout}
                node={node.node}
                {...node.node}
                first
              />
            </div>
          );
        };
      });

    return (
      <div
        className={classNames(trackingClass, trackingClassNAParagraph)}
        data-testid="nativeadvertising-carousel-paragraph-wrapper"
      >
        <Slider
          addClass={styles.SliderWrapper}
          autoPlay={autoplay}
          slideCount={(carouselItems && carouselItems.length) || 0}
          slideDimensions={slideDimensions}
          sliderWidth={parentDimensions.width}
          slideInterval={5000}
          swipeIndicator={sliderIndicator}
          swipeIndicatorBottomOuter
          preloadCount={4}
          opacityInactive={opacityInactive}
          fadeInactive
          showSlideLabel={false}
          sliderHeight={`${carouselHeight}px`}
          swipeIndicatorOptions={{
            position: sliderIndicatorPosition,
            swipeIndicatorType: sliderIndicator,
          }}
          showSliderNavigation={false}
          dynamicWidthSlides
          onPositionUpdate={onSliderPositionUpdated}
          prevNextBtnClasses={[`${styles.NavBtns}`, `${styles.NavBtns}`]}
        >
          {renderItems(carouselItems)}
        </Slider>
      </div>
    );
  };

  return compose<any, any>(
    detectParentDimensionsMemoized({
      cacheKey: detectParentDimensionsCacheKey,
    }),
    onlyUpdateForKeys(['parentDimensions']),
  )(NativeAdvertisingCarouselParagraph);
};
