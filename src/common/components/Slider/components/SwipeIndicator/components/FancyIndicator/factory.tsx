import React, { ReactElement } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-motion'. '/Users/bhs/code/work/rasch-stack/node_modules/react-motio */
import { StaggeredMotion, spring } from 'react-motion';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import {
  SwipeIndicatorComponent,
  SwipeIndicatorFactoryOptions,
  SwipeIndicatorFactoryOptionsStyles,
  SwipeIndicatorProps,
} from './typings';

const defaultStyles: SwipeIndicatorFactoryOptionsStyles = {
  Wrapper: '',
  SwipeIndicator: '',
};

export type SwipeIndicatorPropsInner = SwipeIndicatorProps & {
  setMotionStyles: (position: number) => Array<Record<string, any>>;
};

const SwipeIndicatorFactory = ({
  styles: appStyles,
}: SwipeIndicatorFactoryOptions<any>): SwipeIndicatorComponent => {
  const computeIndicator = (
    sliderWidth: number,
    totalWidth: number,
    slideCount: number,
    activeIndex: number,
  ) => {
    const width =
      (sliderWidth / 100) * ((100 / totalWidth) * (totalWidth / slideCount));
    const position = width * activeIndex;
    return {
      width,
      position,
    };
  };

  const FancyIndicator = (props: SwipeIndicatorPropsInner): ReactElement => {
    const {
      totalWidth,
      sliderWidth,
      slideCount,
      activeIndex,
      setMotionStyles,
    } = props;
    const { width, position } = computeIndicator(
      sliderWidth,
      totalWidth,
      slideCount,
      activeIndex,
    );

    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;
    return (
      <StaggeredMotion
        defaultStyles={[{ x: 0 }, { x: 0 }]}
        styles={setMotionStyles(position)}
      >
        {(interpolatingStyles: Record<string, any>): ReactElement => (
          <div className={styles.Wrapper} data-testid="fancy-indicator-wrapper">
            {interpolatingStyles.map(
              (style: Record<string, any>, i: number): ReactElement => (
                <div
                  key={i}
                  className={styles.SwipeIndicator}
                  style={{
                    transform: `translate(${style.x}px, 0)`,
                    width: `${width}px`,
                  }}
                />
              ),
            )}
          </div>
        )}
      </StaggeredMotion>
    );
  };

  const extendWithHandlers = withHandlers({
    setMotionStyles:
      () =>
      (position: number) =>
      (
        prevInterpolatedStyles: Record<string, any>,
      ): Array<Record<string, any>> =>
        prevInterpolatedStyles.map(
          (_: any, i: number): Record<string, any> =>
            i === 0
              ? { x: spring(position) }
              : { x: spring(prevInterpolatedStyles[i - 1].x) },
        ),
  });

  return compose<any, any>(extendWithHandlers)(FancyIndicator);
};

export default SwipeIndicatorFactory;
