import React from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-core/lib/mod'. '/Users/bhs/code/work/rasch-stack/no */
import mod from 'react-swipeable-views-core/lib/mod';
import classNames from 'classnames';
import { tealiumTrackEvent } from '../../../../../../../../../shared/helpers/tealium';
import AirBnBIndicator from '../../../../../AirBnBIndicator';
import Icon from '../../../../../Icon';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

type MobilePaginationProps = {
  handleIndexChange: (index: number) => void;
  activeIndex: number;
  dataCount: number;
  isLastSlide: boolean;
  isArticleAside: boolean;
  origin?: string;
};

const MobilePagination = ({
  handleIndexChange,
  activeIndex,
  dataCount,
  isLastSlide,
  isArticleAside,
  origin,
}: MobilePaginationProps) => {
  return (
    <div
      className={classNames(
        { [grid.HiddenSmUp]: !isArticleAside },
        styles.Wrapper,
      )}
    >
      <button
        onClick={() => {
          handleIndexChange(activeIndex - 1);
          tealiumTrackEvent({
            type: 'link',
            payload: {
              event_name: 'element_interaction',
              element: 'dividend_calendar',
              element_action: 'swipe_left',
              element_position: `${origin}`,
              currentSlide: activeIndex,
              nextSlide: (!isLastSlide && activeIndex + 1) || 'is_last_slide',
              isMobile: true,
            },
          });
        }}
        title="Zurück"
        aria-label="zurück"
        className={classNames(styles.NavigationItem, styles.Left)}
      >
        <Icon
          addClass={classNames({
            [styles.Disabled]: activeIndex === 0,
          })}
          type={'IconChevronLeft'}
        />
      </button>
      <AirBnBIndicator
        addClass={styles.IndicatorDotsWrapper}
        slideCount={dataCount}
        activeIndex={mod(activeIndex, dataCount)}
        clearUpdateActiveIndex={(index) => {
          handleIndexChange(index);
        }}
      />
      <button
        onClick={() => {
          !isLastSlide && handleIndexChange(activeIndex + 1);
          tealiumTrackEvent({
            type: 'link',
            payload: {
              event_name: 'element_interaction',
              element: 'dividend_calendar',
              element_action: 'swipe_right',
              element_position: `${origin}`,
              currentSlide: activeIndex,
              nextSlide: (!isLastSlide && activeIndex + 1) || 'is_last_slide',
              isMobile: true,
            },
          });
        }}
        title="Weiter"
        aria-label="weiter"
        className={classNames(styles.NavigationItem, styles.Right)}
      >
        <Icon
          addClass={classNames({
            [styles.Disabled]: isLastSlide,
          })}
          type={'IconChevronRight'}
        />
      </button>
    </div>
  );
};

export default MobilePagination;
