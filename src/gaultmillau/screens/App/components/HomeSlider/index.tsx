import React, { ComponentType, useState } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views'. '/Users/bhs/code/work/rasch-stack/node_modules/re */
import SwipeableViews from 'react-swipeable-views';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-core/lib/mod'. '/Users/bhs/code/work/rasch-stack/no */
import mod from 'react-swipeable-views-core/lib/mod';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-utils/lib/virtualize'. '/Users/bhs/code/work/rasch- */
import virtualize from 'react-swipeable-views-utils/lib/virtualize';
import { truncateByWord } from '../../../../../shared/helpers/utils';
import { ensureTeaserInterfaceItem } from '../Teaser/shared/helpers';
import autoplay from '../../../../../shared/decorators/swipeableViews/autoplay';
import Link from '../../../../../common/components/Link';
import Error from '../Error';
import Icon from '../Icon';
import TeaserHero from '../Teaser/components/TeaserHeroMain';
import ShortTitle from '../Teaser/shared/components/ShortTitle';
import { ARTICLE_CONTENT_TYPE } from '../../../../../shared/constants/content';
import {
  TEASER_LEAD_LENGTH,
  TEASER_ORIGIN_HOME_SLIDER,
} from '../Teaser/constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { GridConfigItem } from '../../../../../common/components/TeaserGrid/typings';

type HomeSliderProps = {
  teaserList: GridConfigItem[];
  paragraphIndex?: number;
};

const EnhancedSwipeableViews = autoplay(virtualize(SwipeableViews));

const HomeSlider: ComponentType<HomeSliderProps> = ({
  teaserList,
  paragraphIndex,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  const handleIndexChange = (index: number) => {
    setActiveIndex(index);
  };

  const handleSwitching = () => {
    if (autoplayEnabled) {
      setAutoplayEnabled(false);
    }
  };

  const nextSlide = () => {
    if (autoplayEnabled) {
      setAutoplayEnabled(false);
    }
    handleIndexChange(activeIndex + 1);
  };

  const prevSlide = () => {
    if (autoplayEnabled) {
      setAutoplayEnabled(false);
    }
    handleIndexChange(activeIndex - 1);
  };

  const teaserListEnsured = teaserList.filter((item) => !!item);

  if (teaserListEnsured.length < 1) {
    return null;
  }

  const idx = mod(activeIndex, teaserListEnsured.length);
  const node = teaserListEnsured[idx];
  const teaserData = { ...ensureTeaserInterfaceItem(node.data) };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.SliderAndNavigationWrapper}>
        <EnhancedSwipeableViews
          index={activeIndex}
          onChangeIndex={handleIndexChange}
          onSwitching={handleSwitching}
          enableMouseEvents={false}
          containerStyle={{ width: '100%' }}
          autoplay={autoplayEnabled}
          interval={4000}
          /* @ts-ignore TODO: TS7031 ->  Binding element 'key' implicitly has an 'any' type. */
          /* @ts-ignore TODO: TS7031 ->  Binding element 'index' implicitly has an 'any' type. */
          slideRenderer={({ key, index }) => {
            const idx = mod(index, teaserListEnsured.length);
            const node = teaserListEnsured[idx];
            const teaserData = { ...ensureTeaserInterfaceItem(node.data) };

            if (!teaserData.teaserImage || !teaserData.teaserImage.image) {
              if (__DEVELOPMENT__) {
                return (
                  <Error
                    key={index}
                    msg={`Could not render Hero Slide - node without teaserImage given! "${teaserData.title}"`}
                  />
                );
              }

              return null;
            }

            return (
              <div
                key={`hero-slider-teaser-${key}-${teaserData.id || index}`}
                className={styles.Slide}
              >
                <TeaserHero
                  {...teaserData}
                  paragraphIndex={paragraphIndex}
                  paragraphName="home-slider"
                  trackingIndex={index}
                  origin={TEASER_ORIGIN_HOME_SLIDER}
                />
              </div>
            );
          }}
        />

        <div className={styles.NavigationWrapper}>
          <button
            onClick={prevSlide}
            className={styles.PrevButton}
            title="previous"
          >
            <Icon type="IconChevronLeft" />
          </button>
          <button
            onClick={nextSlide}
            className={styles.NextButton}
            title="next"
          >
            <Icon type="IconChevronRight" />
          </button>
        </div>
      </div>

      <div className={grid.HiddenSmUp}>
        <Link
          key={`home-slider-id-${teaserData.title || ''}`}
          path={teaserData.preferredUri || ''}
          className={styles.Caption}
        >
          <>
            <ShortTitle
              __typename={teaserData?.__typename}
              subtypeValue={teaserData?.subtypeValue}
              title={teaserData?.title}
              preferredUri={teaserData?.preferredUri}
              shortTitle={teaserData?.shortTitle}
              authors={teaserData?.authors}
              teaserType={teaserData?.teaserType}
              organizationData={teaserData?.organizationData}
              organizationType={teaserData?.organizationType}
              restaurantType={teaserData?.restaurantType}
              cityList={teaserData?.cityList}
              sponsor={teaserData?.sponsor}
              channel={teaserData?.channel}
              styles={styles}
              wrapperStyle={styles.Type}
            />
            <div className={styles.Title}>
              {(teaserData.type === ARTICLE_CONTENT_TYPE && (
                <span>{teaserData.shortTitle || ''}</span>
              )) || <span>{teaserData.title || ''}</span>}
            </div>
            {(teaserData.lead || teaserData.description) && (
              <div
                className={styles.Lead}
                dangerouslySetInnerHTML={{
                  __html: truncateByWord(
                    teaserData.lead || teaserData.description,
                    TEASER_LEAD_LENGTH,
                  ),
                }}
              ></div>
            )}
          </>
        </Link>
      </div>
    </div>
  );
};

export default HomeSlider;
