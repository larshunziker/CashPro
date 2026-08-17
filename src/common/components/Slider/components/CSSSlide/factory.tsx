import React, { ReactElement } from 'react';
import compose from 'recompose/compose';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import classNames from 'classnames';
import internalStyles from './styles.legacy.css';
import {
  CSSSlideComponent,
  CSSSlideFactoryOptions,
  CSSSlideProps,
} from './typings';

const CSSSlideFactory = ({
  styles,
}: CSSSlideFactoryOptions): CSSSlideComponent => {
  const CSSSlide = ({
    animate = true,
    children,
    deltaX = 0,
    fadeInactive,
    height,
    index,
    isActive,
    opacityInactive = 0.4,
    positions,
    slide,
    slideWidth = 500,
    visible,
    isIntersecting,
  }: CSSSlideProps): ReactElement => {
    const opacity = fadeInactive && !isActive ? opacityInactive : 1;
    const noAnimation = animate ? deltaX !== 0 || !visible : true;

    return (
      <div
        data-testid="cssslide-factory-wrapper"
        key={`css-slide-${slide}`}
        className={classNames(
          internalStyles.Slide,
          {
            [internalStyles.NoAnimation]: noAnimation,
            [internalStyles.ActiveSlide]: isActive,
          },
          styles.Wrapper,
        )}
        style={{
          height,
          transform: `translate(${positions[index] - deltaX}px, 0)`,
          width: `${slideWidth}px`,
        }}
      >
        <span style={{ opacity }} data-testid="cssslide-factory-item">
          {children &&
            typeof children === 'function' &&
            children({ slide, height, isIntersecting })}
        </span>
      </div>
    );
  };

  // ---------------------------------------------------------------------------------- //
  // COMPOSE
  // ---------------------------------------------------------------------------------- //

  const withUpdatePolicy = onlyUpdateForKeys(['deltaX', 'positions']);
  const FinalCSSSlideSlide = compose<any, any>(withUpdatePolicy)(CSSSlide);

  return FinalCSSSlideSlide;
};

export default CSSSlideFactory;
