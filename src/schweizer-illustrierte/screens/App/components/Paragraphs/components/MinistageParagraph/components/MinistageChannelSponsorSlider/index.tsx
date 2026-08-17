import React, { ReactElement, useState } from 'react';
import { connect } from 'react-redux';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views'. '/Users/bhs/code/work/rasch-stack/node_modules/re */
import SwipeableViews from 'react-swipeable-views';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-core/lib/mod'. '/Users/bhs/code/work/rasch-stack/no */
import mod from 'react-swipeable-views-core/lib/mod';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-utils/lib/virtualize'. '/Users/bhs/code/work/rasch- */
import virtualize from 'react-swipeable-views-utils/lib/virtualize';
import settingsStateSelector from '../../../../../../../../shared/selectors/settingsStateSelector';
import autoplay from '../../../../../../../../../shared/decorators/swipeableViews/autoplay';
import AirBnBIndicator from '../../../../../ImageGallery/components/AirBnBIndicator';
import { ChannelSponsor } from '../MinistageChannelSponsor';
import styles from './styles.legacy.css';
import { MinistageChannelSponsorProps } from '../MinistageChannelSponsor/typings';

type MinistageChannelSponsorSliderProps = Pick<
  MinistageChannelSponsorProps,
  'items'
>;

const EnhancedSwipeableViews = autoplay(virtualize(SwipeableViews));

export const MinistageChannelSponsorSlider = ({
  items,
}: MinistageChannelSponsorSliderProps): ReactElement => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleIndexChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={styles.Wrapper}>
      <EnhancedSwipeableViews
        index={activeIndex}
        autoplay
        onChangeIndex={handleIndexChange}
        containerStyle={{ width: '100%' }}
        /* @ts-ignore TODO: TS7031 ->  Binding element 'key' implicitly has an 'any' type. */
        /* @ts-ignore TODO: TS7031 ->  Binding element 'index' implicitly has an 'any' type. */
        slideRenderer={({ key, index }) => {
          const item = items[mod(index, items.length)];

          return (
            <div key={`foo-image-gallery-item-${key}`}>
              {/* @ts-ignore TODO: TS2786 ->  'ChannelSponsor' cannot be used as a JSX component. */}
              <ChannelSponsor
                item={item}
                standalone={false}
                index={index}
                slideIndex={key}
              />
            </div>
          );
        }}
      />

      <div className={styles.IndicatorWrapper}>
        <AirBnBIndicator
          slideCount={items.length}
          activeIndex={mod(activeIndex, items.length)}
          clearUpdateActiveIndex={(index) => {
            handleIndexChange(index);
          }}
          withBoxShadow={false}
        />
      </div>
    </div>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(MinistageChannelSponsorSlider);
