import React, { useEffect, useState } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views'. '/Users/bhs/code/work/rasch-stack/node_modules/re */
import SwipeableViews from 'react-swipeable-views';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-core/lib/mod'. '/Users/bhs/code/work/rasch-stack/no */
import mod from 'react-swipeable-views-core/lib/mod';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-utils/lib/virtualize'. '/Users/bhs/code/work/rasch- */
import virtualize from 'react-swipeable-views-utils/lib/virtualize';
import mapProps from 'recompose/mapProps';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'lodash.shuffle'. '/Users/bhs/code/work/rasch-stack/node_modules/lodash.sh */
import shuffle from 'lodash.shuffle';
import {
  NativeAdvertisingCarouselParagraphFactoryOptions2,
  NativeAdvertisingCarouselParagraphProps2,
} from './typings';

type NativeAdvertisingCarouselParagraphPropsInner =
  NativeAdvertisingCarouselParagraphProps2 & {
    carouselItems: Record<string, any>;
  };

// virtualized slider works with 6 items by default
// if you change default values then you need to change them in DotsIndicator too
const EnhancedSwipeableViews = virtualize(SwipeableViews);

export default ({
  Teaser,
  DotsIndicator,
  teaserLayout,
  tealiumTrackEvent,
  ensureTeaserInterface,
  trackingClassNAParagraph,
  trackingClass,
  styles,
}: NativeAdvertisingCarouselParagraphFactoryOptions2) => {
  const HeroImageGallery = (
    props: NativeAdvertisingCarouselParagraphPropsInner,
  ) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [carouselItems, setCarouselItems] = useState(props.carouselItems);

    useEffect(() => {
      setCarouselItems(shuffle(props.carouselItems));
    }, [props.carouselItems]);

    if (
      !carouselItems ||
      !Array.isArray(carouselItems) ||
      carouselItems.length <= 0
    ) {
      return null;
    }

    /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
    const handleIndexChange = (index) => {
      setActiveIndex(index);
      tealiumTrackEvent({});
    };

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
    return (
      <div
        className={classNames(
          trackingClass,
          trackingClassNAParagraph,
          styles.Wrapper,
        )}
        data-testid="nativeadvertising-carousel-paragraph-wrapper"
      >
        <EnhancedSwipeableViews
          index={activeIndex}
          resistance
          onChangeIndex={handleIndexChange}
          enableMouseEvents={false}
          containerStyle={{ width: '100%' }}
          /* @ts-ignore TODO: TS7031 ->  Binding element 'key' implicitly has an 'any' type. */
          /* @ts-ignore TODO: TS7031 ->  Binding element 'index' implicitly has an 'any' type. */
          slideRenderer={({ key, index }) => {
            const node = carouselItems[mod(index, carouselItems.length)];
            return (
              <div
                key={`native-advertising-carousel-item-${key}-${node.id}`}
                className={styles.Slide}
              >
                <Teaser
                  component={teaserLayout}
                  node={node.node}
                  {...node.node}
                  first
                />
              </div>
            );
          }}
        />
        <DotsIndicator
          activeIndex={activeIndex}
          slideCount={carouselItems.length}
          dotClickHandler={handleIndexChange}
        />
      </div>
    );
  };

  const withGalleryProps = mapProps(
    /* @ts-ignore TODO: TS7031 ->  Binding element 'nativeAdvertisingCarouselParagraph' implicitly has an 'any' type. */
    ({ nativeAdvertisingCarouselParagraph }) => {
      let carouselItems: NativeAdvertisingEdge[] =
        (nativeAdvertisingCarouselParagraph?.nativeAdvertising?.edges &&
          nativeAdvertisingCarouselParagraph.nativeAdvertising.edges.length >
            0 &&
          nativeAdvertisingCarouselParagraph.nativeAdvertising.edges.filter(
            /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
            (item): boolean => item?.node?.teaserImage !== null,
          )) ||
        [];

      carouselItems = ensureTeaserInterface(carouselItems);

      return {
        carouselItems,
      };
    },
  );
  // @ts-ignore
  return withGalleryProps(HeroImageGallery);
};
