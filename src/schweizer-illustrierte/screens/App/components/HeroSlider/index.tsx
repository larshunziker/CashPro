import React, { MouseEvent, memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views'. '/Users/bhs/code/work/rasch-stack/node_modules/re */
import SwipeableViews from 'react-swipeable-views';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-core/lib/mod'. '/Users/bhs/code/work/rasch-stack/no */
import mod from 'react-swipeable-views-core/lib/mod';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-utils/lib/virtualize'. '/Users/bhs/code/work/rasch- */
import virtualize from 'react-swipeable-views-utils/lib/virtualize';
import classNames from 'classnames';
import { tealiumTrackEvent } from '../../../../../shared/helpers/tealium';
import cssClassByChannel from '../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import autoplay from '../../../../../shared/decorators/swipeableViews/autoplay';
import AirBnBIndicator from '../ImageGallery/components/AirBnBIndicator';
import Teaser from '../Teaser';
import SliderProgressBar from './components/SliderProgressBar';
import {
  TRACKING_SLIDER_DIRECTION_BACKWARD,
  TRACKING_SLIDER_DIRECTION_FORWARD,
} from '../../../../../shared/constants/tracking';
import styles from './styles.legacy.css';
import { ActiveMainChannel } from '../../../../shared/types';
import { HeroSliderProps } from './typings';

const EnhancedSwipeableViews = autoplay(virtualize(SwipeableViews));

export const HeroSlider = ({ item }: HeroSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const activeMainChannel = useSelector(
    (state) =>
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
      settingsStateSelector(state).activeMainChannel as ActiveMainChannel,
  );

  const getThemedClass = useMemo(
    () => cssClassByChannel(styles, activeMainChannel),
    [activeMainChannel],
  );

  if (!item.data || !item.items) {
    return null;
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'meta' implicitly has an 'any' type. */
  const handleIndexChange = (index: number, indexLast: number, meta) => {
    setActiveIndex(index);
    if (meta?.isAutoplayed) {
      return;
    }
    const direction =
      index > indexLast
        ? TRACKING_SLIDER_DIRECTION_FORWARD
        : TRACKING_SLIDER_DIRECTION_BACKWARD;
    tealiumTrackEvent({
      type: 'view',
      payload: {
        hit_type: 'article_slider',
        gallery_current_image: activeIndex + 1,
        gallery_total_images: item?.data?.length || 0,
        gallery_direction: direction,
      },
    });
  };

  const handleSwitching = () => {
    if (autoplayEnabled) {
      setAutoplayEnabled(false);
    }
  };

  const clearUpdateActiveIndex = (index: number, event: MouseEvent) => {
    event.preventDefault();

    if (activeIndex !== index) {
      setAutoplayEnabled(false);
      setActiveIndex(index);
    }
  };

  const nextSlide = () => {
    if (autoplayEnabled) {
      setAutoplayEnabled(false);
    }
    handleIndexChange(activeIndex + 1, activeIndex, null);
  };

  const prevSlide = () => {
    if (autoplayEnabled) {
      setAutoplayEnabled(false);
    }
    handleIndexChange(activeIndex - 1, activeIndex, null);
  };

  return (
    <div className={styles.Wrapper}>
      <EnhancedSwipeableViews
        index={activeIndex}
        onChangeIndex={handleIndexChange}
        onSwitching={handleSwitching}
        enableMouseEvents={false}
        containerStyle={{ width: '100%' }}
        autoplay={autoplayEnabled}
        interval={5000}
        /* @ts-ignore TODO: TS7031 ->  Binding element 'key' implicitly has an 'any' type. */
        /* @ts-ignore TODO: TS7031 ->  Binding element 'index' implicitly has an 'any' type. */
        slideRenderer={({ key, index }) => {
          /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
          const idx = mod(index, item.data.length);
          /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
          const node = item.data[idx];
          const { id } = node;
          return (
            <div
              key={`hero-slider-slide-item-${key}-${id}`}
              className={styles.MobileSlide}
            >
              {autoplayEnabled && (
                <SliderProgressBar
                  activeIndex={activeIndex}
                  slideInterval={5000}
                />
              )}
              <Teaser
                component={
                  item?.items &&
                  Array.isArray(item.items) &&
                  item.items.length > 0 &&
                  item.items[idx]?.type
                }
                {...node}
              />
            </div>
          );
        }}
      />

      <div className={getThemedClass('IndicatorWrapper')}>
        <AirBnBIndicator
          slideCount={item?.data?.length || 0}
          activeIndex={mod(activeIndex, item?.data?.length)}
          clearUpdateActiveIndex={clearUpdateActiveIndex}
          withBoxShadow={false}
        />
      </div>

      <div className={styles.NavigationWrapper}>
        <button
          onClick={prevSlide}
          className={classNames(styles.Icon, getThemedClass('PrevButton'))}
          title="previous"
        />
        <button
          onClick={nextSlide}
          className={classNames(styles.Icon, getThemedClass('NextButton'))}
          title="next"
        />
      </div>
    </div>
  );
};

export default memo(HeroSlider);
