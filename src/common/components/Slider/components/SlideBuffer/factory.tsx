// TODO: delete SliderFactory as soon we changed all slider components
/* istanbul ignore file */

import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { LEFT, RIGHT } from 'react-swipeable';
import compose from 'recompose/compose';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import Swipeable from '../../../Swipeable';
import { SlideBufferFactoryOptions, SliderBufferProps } from './typings';

export type SliderBufferPropsInner = SliderBufferProps & {
  swipedHandler: (props: SliderBufferPropsInner) => Function;
  swipedHandlerLeft: (props: SliderBufferPropsInner) => Function;
  swipedHandlerRight: (props: SliderBufferPropsInner) => Function;
  swipingHandler: (props: SliderBufferPropsInner) => Function;
  routePathname: string;
};

const SlideBufferFactory = ({ Slide }: SlideBufferFactoryOptions) => {
  const visibleSlides = (viewport: Array<number>): Array<number> => viewport;

  const SliderBuffer = ({
    activeIndex,
    animate = true,
    children,
    deltaX,
    fadeInactive = true,
    keyMappingList,
    opacityInactive,
    positions,
    slideDimensions,
    sliderHeight,
    swipedHandler,
    swipedHandlerLeft,
    swipedHandlerRight,
    swipingHandler,
    syncParentHeight = false,
    viewport,
    routePathname,
    isIntersecting,
  }: SliderBufferPropsInner): ReactElement => {
    return (
      <TestFragment data-testid="slider-buffer-factory-wrapper">
        <Swipeable
          onSwiped={swipedHandler}
          onSwipedLeft={swipedHandlerLeft}
          onSwipedRight={swipedHandlerRight}
          onSwiping={swipingHandler}
          style={{
            height: sliderHeight,
          }}
        >
          {viewport.map((key, index): ReactElement => {
            const slide = keyMappingList[key];
            return (
              <Slide
                key={`slider-buffer-${key}-${routePathname}`}
                index={index}
                slide={key}
                positions={positions}
                isActive={key === activeIndex}
                visible={visibleSlides(viewport).includes(key)}
                fadeInactive={fadeInactive}
                slideWidth={
                  slideDimensions[slide] && slideDimensions[slide].width
                }
                opacityInactive={opacityInactive}
                syncParentHeight={syncParentHeight}
                deltaX={deltaX}
                height={sliderHeight}
                animate={animate}
                isIntersecting={isIntersecting}
              >
                {children ? children[slide] : null}
              </Slide>
            );
          })}
        </Swipeable>
      </TestFragment>
    );
  };

  const withUpdatePolicy = onlyUpdateForKeys([
    'viewport',
    'deltaX',
    'children',
  ]);

  const extendWithHandlers = withHandlers({
    swipingHandler:
      (props: SliderBufferPropsInner) =>
      /* @ts-ignore TODO: TS7031 ->  Binding element 'absX' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7031 ->  Binding element 'absY' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7031 ->  Binding element 'deltaX' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7031 ->  Binding element 'event' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7031 ->  Binding element 'dir' implicitly has an 'any' type. */
      ({ absX, absY, deltaX, event, dir }): void => {
        // if no infinity loop we have to stop translate on first and last slide
        if (!props.loop) {
          const indexPrev = props.activeIndex - 1;
          const hasPrev = indexPrev >= 0;
          const indexNext = props.activeIndex + 1;
          const hasNext = indexNext < props.keyMappingList.length;

          if ((deltaX < 0 && !hasPrev) || (deltaX > 0 && !hasNext)) {
            return;
          }
        }

        // if movement on Y axis (scroll down on slider like a onmeda card) is bigger then on the X axis, do not
        // start movement of slide to deny flickering on mobile phones
        if (absX <= absY * 1.5) {
          return;
        }

        // only prevent default (disabling scrolling on ios) and only call setDeltaX if the swipe direction is left or right
        if (dir === LEFT || dir === RIGHT) {
          event.preventDefault();
          props.setDeltaX(deltaX);
        }
      },
    swipedHandler: (props: SliderBufferPropsInner) => () => props.setDeltaX(0),
  });

  const mapStateToProps = (state: ReduxState) => ({
    routePathname:
      locationStateSelector(state).locationBeforeTransitions.pathname,
  });

  return compose<any, any>(
    connect(mapStateToProps),
    withState<Object, number, string, string>('deltaX', 'setDeltaX', 0),
    withUpdatePolicy,
    extendWithHandlers,
  )(SliderBuffer);
};

export default SlideBufferFactory;
