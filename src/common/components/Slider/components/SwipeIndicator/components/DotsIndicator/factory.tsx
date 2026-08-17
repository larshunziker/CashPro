import React, { MouseEvent, ReactElement } from 'react';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import classNames from 'classnames';
import {
  SwipeIndicatorFactoryOptions,
  SwipeIndicatorFactoryOptionsStyles,
  SwipeIndicatorProps,
} from './typings';

const defaultStyles: SwipeIndicatorFactoryOptionsStyles = {
  Active: '',
  Wrapper: '',
  SwipeIndicator: '',
};

type SwipeIndicatorPropsInner = SwipeIndicatorProps & {
  dotClickHandler: (index: number) => (event: MouseEvent) => void;
};

const DotsIndicatorFactory = ({
  styles: appStyles,
}: SwipeIndicatorFactoryOptions<any>) => {
  const DotsIndicator = ({
    slideCount,
    activeIndex,
    dotClickHandler,
    ...props
  }: SwipeIndicatorPropsInner): ReactElement => {
    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;
    return (
      <div className={styles.Wrapper} data-testid="dots-indicator-wrapper">
        {[...Array(slideCount)].map(
          (_, i: number): ReactElement => (
            <button
              key={`dots-indicator-button-${i}`}
              onClick={dotClickHandler(i)}
              className={classNames(styles.SwipeIndicator, {
                [styles.Active]: activeIndex === i,
              })}
              aria-label={`${i + 1} von ${slideCount}`}
            ></button>
          ),
        )}
      </div>
    );
  };

  const extendWithHandlers = withHandlers({
    dotClickHandler:
      (props: SwipeIndicatorPropsInner) =>
      (index: number) =>
      (event: MouseEvent) =>
        props.clearUpdateActiveIndex(index, event),
  });

  return compose<any, any>(extendWithHandlers)(DotsIndicator);
};

export default DotsIndicatorFactory;
