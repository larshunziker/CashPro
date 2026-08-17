import React, { ReactElement } from 'react';
import classNames from 'classnames';
import {
  SliderNavigationComponent,
  SliderNavigationFactoryOptions,
  SliderNavigationFactoryOptionsStyles,
  SliderNavigationProps,
} from './typings';

// ---------------------------------------------------------------------------------- //
// COMPONENT
// ---------------------------------------------------------------------------------- //

const defaultStyles: SliderNavigationFactoryOptionsStyles = {
  DisabledButton: '',
  Icon: '',
  NextButton: '',
  PrevButton: '',
  TopArrows: '',
  Wrapper: '',
};

const SliderNavigationFactory = ({
  styles: appStyles,
}: SliderNavigationFactoryOptions<any>): SliderNavigationComponent => {
  const SliderNavigation = ({
    activeIndex,
    nextImage,
    prevImage,
    totalSlides,
    loop,
    ...props
  }: SliderNavigationProps): ReactElement => {
    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;
    const isFirst = !loop && activeIndex === 0;
    const isLast = !loop && activeIndex === totalSlides - 1;

    return (
      <div
        data-testid="slidernavigation-factory-wrapper"
        className={styles.Wrapper}
      >
        <button
          data-testid="slidernavigation-factory-prev-button"
          onClick={() => {
            prevImage();
          }}
          className={classNames(styles.Icon, styles.PrevButton, {
            /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
            [styles.DisabledButton]: isFirst,
          })}
          disabled={isFirst}
          title="previous"
        />
        <button
          data-testid="slidernavigation-factory-next-button"
          onClick={() => {
            nextImage();
          }}
          className={classNames(styles.Icon, styles.NextButton, {
            /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
            [styles.DisabledButton]: isLast,
          })}
          disabled={isLast}
          title="next"
        />
      </div>
    );
  };

  return SliderNavigation;
};

export default SliderNavigationFactory;
