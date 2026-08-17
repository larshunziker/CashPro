import React, { ReactElement } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-core/lib/mod'. '/Users/bhs/code/work/rasch-stack/no */
import mod from 'react-swipeable-views-core/lib/mod';
import classNames from 'classnames';
import styles from './styles.legacy.css';
import { SwipeIndicatorProps } from './typings';

type SwipeIndicatorPropsInner = SwipeIndicatorProps;

const DotsIndicator = ({
  slideCount,
  activeIndex,
  dotClickHandler,
}: SwipeIndicatorPropsInner): ReactElement => (
  <div className={styles.Wrapper}>
    {[...Array(slideCount)].map(
      (_, i: number): ReactElement => (
        <a
          href="#carouselToggle"
          key={`carousel-toggle-${i + activeIndex}`}
          onClick={(event) => {
            event.preventDefault();
            // virtualized slider works with 6 items by default
            // if you change default values then you need to change them here too
            dotClickHandler(mod(i, 6));
          }}
          className={classNames(styles.SwipeIndicator, {
            [styles.Active]:
              mod(i, slideCount) === mod(activeIndex, slideCount),
          })}
        >
          {''}
        </a>
      ),
    )}
  </div>
);

export default DotsIndicator;
