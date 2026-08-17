// TODO: delete SliderFactory as soon we changed all slider components
/* istanbul ignore file */

import 'helpers/intersection-observer';

import React, {
  Component,
  MouseEvent,
  ReactElement,
  ReactNode,
  SyntheticEvent,
  createRef,
} from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import {
  getKeyMappingList,
  swipeTo,
  updatePositions,
  viewportRange,
} from './helper';
import {
  AUTOPLAY_START,
  AUTOPLAY_STOP,
  DEFAULT_PRELOAD_COUNT,
  DEFAULT_SLIDE_INTERVAL,
  DIRECTION_BACKWARDS,
  DIRECTION_FORWARDS,
  DIRECTION_ON_INDICATOR_CLICK,
  SLIDER_NAVIGATION_POSITION_BOTTOM_IMAGE,
  SLIDE_ALIGNMENT_CENTER,
  SWIPE_INDICATOR_POSITION_BOTTOM,
  SWIPE_INDICATOR_POSITION_BOTTOM_IMAGE_CENTER,
} from './constants';
import { SliderComponent, SliderFactoryOptions, SliderProps } from './typings';

type SliderPropsInner = SliderProps & {
  activeIndex: number;
  children: ReactNode;
  clearUpdateActiveIndex: (activeIndex: number, event: MouseEvent) => void;
  labels: Array<ReactElement>;
  setPositions: (positions: Record<string, any>) => void;
  routePathname: string;
  routeScreenReady: boolean;
};

type SliderState = {
  activeIndex: number;
  preloadCount: number;
  autoPlay: boolean;
  isIntersecting: boolean;
  isDirty: boolean;
};

const SliderFactory = ({
  SlideBuffer,
  SliderNavigation,
  SwipeInteractionButton,
  SlideLabel,
  SliderProgressBar,
  SwipeIndicator,
  indicatorElementNext,
  indicatorElementPrev,
  styles,
}: SliderFactoryOptions): SliderComponent => {
  class Slider extends Component<SliderPropsInner, SliderState> {
    static defaultProps = {
      addClass: '',
      hasToStopAutoPlayOnUserInteraction: false,
      slideInterval: 5000,
      alignArrowsOnTop: false,
      autoPlay: AUTOPLAY_STOP,
      fadeInactive: true,
      initialIndex: 0,
      labelClass: '',
      labels: [],
      loop: true,
      opacityInactive: 1,
      slideAlignment: SLIDE_ALIGNMENT_CENTER,
      syncParentHeight: false,
      sliderWidth: '100%',
      sliderNavigationOptions: {},
      useCSS: false,
      showSliderNavigation: true,
      hideGalleryOverflow: true,
      checkVisibility: false,
      children: null,
    };

    keyMappingList: Array<number>;
    sliderItemsList: Array<number>;
    viewport: Array<number>;
    widthChange: boolean;
    positions: Array<number>;
    intervalId: ReturnType<typeof setInterval>;
    intervalTimeElapsed: number;
    observer: IntersectionObserver;
    sliderEl: RefObject;

    constructor(props: SliderPropsInner) {
      super(props);

      this.swipe = this.swipe.bind(this);
      this.swipeRight = this.swipeRight.bind(this);
      this.swipeLeft = this.swipeLeft.bind(this);

      this.sliderEl = createRef();

      const activeIndex =
        typeof props.activeIndex !== 'undefined'
          ? props.activeIndex
          : props.initialIndex || 0;

      const preloadCount =
        typeof props.preloadCount !== 'undefined'
          ? props.preloadCount
          : DEFAULT_PRELOAD_COUNT;

      this.state = {
        activeIndex,
        preloadCount,
        autoPlay: props.autoPlay,
        isIntersecting: false,
        isDirty: false,
      };

      if (props.slideDimensions.length < 1) {
        return;
      }
      this.keyMappingList = getKeyMappingList(
        props.slideDimensions.length,
        preloadCount * 2 + 1,
      );

      this.sliderItemsList = [
        ...new Array(props.slideDimensions.length).keys(),
      ];

      this.viewport = viewportRange(
        this.keyMappingList.length,
        activeIndex,
        preloadCount,
      );

      this.widthChange = false;
      this.intervalTimeElapsed = 0;

      this.positions = updatePositions(
        [],
        this.viewport.length,
        this.keyMappingList,
        props.sliderWidth,
        props.sliderGutter,
        preloadCount,
        activeIndex,
        0,
        props.dynamicWidthSlides,
        props.slideDimensions,
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
        props.slideAlignment,
      );
    }

    componentDidMount() {
      if (this.props.checkVisibility && !this.state.isIntersecting) {
        this.observer = new IntersectionObserver(
          this.onIntersection.bind(this),
          {
            rootMargin: '300px',
            threshold: 0,
          },
        );

        this.observer.observe(this.sliderEl.current);
      }

      if (this.state.autoPlay) {
        this.toggleAutoPlay(AUTOPLAY_START);
      }

      if (this.props.onPositionUpdate && this.keyMappingList) {
        this.props.onPositionUpdate(
          this.keyMappingList[this.state.activeIndex],
        );
      }
    }

    shouldComponentUpdate(
      nextProps: SliderPropsInner,
      nextState: SliderState,
    ): boolean {
      if (this.state.isIntersecting !== nextState.isIntersecting) {
        return true;
      }
      if (this.props.routePathname !== nextProps.routePathname) {
        // reset progressbar after any slider update
        if (
          this.props.showSliderProgressBar &&
          this.state.autoPlay &&
          this.intervalTimeElapsed !== 0
        ) {
          this.intervalTimeElapsed = 0;
          this.setActiveIndex(0);
        }
        return true;
      }
      if (
        this.props.children !== nextProps.children ||
        this.state.activeIndex !== nextState.activeIndex ||
        this.props.sliderWidth !== nextProps.sliderWidth ||
        this.props.sliderHeight !== nextProps.sliderHeight ||
        this.props.addClass !== nextProps.addClass ||
        (!this.props.routeScreenReady && nextProps.routeScreenReady)
      ) {
        this.updateSlider(nextProps, nextState);
        return true;
      }
      return false;
    }

    componentWillUnmount() {
      this.observer && this.observer.disconnect();
      this.toggleAutoPlay(AUTOPLAY_STOP);
    }

    updateSlider = (nextProps: SliderPropsInner, nextState: SliderState) => {
      this.keyMappingList = getKeyMappingList(
        nextProps.slideDimensions.length,
        nextState.preloadCount * 2 + 1,
      );

      this.viewport = viewportRange(
        this.keyMappingList.length,
        nextState.activeIndex,
        nextState.preloadCount,
      );

      this.widthChange = this.props.sliderWidth !== nextProps.sliderWidth;

      this.positions = updatePositions(
        this.positions,
        this.viewport.length,
        this.keyMappingList,
        nextProps.sliderWidth,
        nextProps.sliderGutter,
        nextState.preloadCount,
        nextState.activeIndex,
        0,
        nextProps.dynamicWidthSlides,
        nextProps.slideDimensions,
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
        nextProps.slideAlignment,
      );
    };

    setActiveIndex = (index: number, track = true, direction = '') => {
      if (track && this.props.onPositionUpdate) {
        this.props.onPositionUpdate(this.keyMappingList[index], direction);
      }

      if (direction) {
        this.setState({ isDirty: true });
      }

      this.setState({
        activeIndex: index,
      });
    };

    clearUpdateActiveIndex = (activeIndex: number, event: MouseEvent) => {
      event.preventDefault();

      if (this.state.activeIndex !== activeIndex) {
        this.disableAutoPlayOnUserAction();
        this.setActiveIndex(activeIndex, true, DIRECTION_ON_INDICATOR_CLICK);
      }
    };

    getNextIndex = (): number | null => {
      let indexNext: number = this.state.activeIndex + 1;
      const hasNext: boolean = this.props.loop
        ? indexNext < this.keyMappingList.length
        : indexNext < this.props.slideCount;

      if (!hasNext) {
        if (!this.props.loop) {
          return null;
        }
        indexNext = 0;
      }
      return indexNext;
    };

    nextSlide = (track = true) => {
      this.intervalTimeElapsed = 0;
      const indexNext = this.getNextIndex();
      if (indexNext !== null) {
        this.disableAutoPlayOnUserAction();
        this.setActiveIndex(indexNext, track, DIRECTION_FORWARDS);
      }
    };

    prevSlide = (track = true) => {
      let indexPrev: number = this.state.activeIndex - 1;
      const hasPrev: boolean = indexPrev >= 0;

      this.intervalTimeElapsed = 0;

      if (!hasPrev) {
        if (!this.props.loop) {
          return;
        }

        indexPrev = this.keyMappingList.length - 1;
      }
      this.disableAutoPlayOnUserAction();
      this.setActiveIndex(indexPrev, track, DIRECTION_BACKWARDS);
    };

    autoSlide = () => {
      this.intervalTimeElapsed += 0.5;
      if (
        this.state.autoPlay &&
        this.intervalTimeElapsed === this.props.slideInterval / 100
      ) {
        this.intervalTimeElapsed = 0;
        const indexNext = this.getNextIndex();
        if (indexNext !== null) {
          this.setActiveIndex(indexNext, false);
        }
      }
    };

    toggleAutoPlay(type: boolean) {
      if (this.state.autoPlay) {
        if (type === AUTOPLAY_START) {
          this.intervalId = setInterval(this.autoSlide, DEFAULT_SLIDE_INTERVAL);
        } else {
          clearInterval(this.intervalId);
        }
      }
    }

    autoPlayStart = () => {
      this.toggleAutoPlay(AUTOPLAY_START);
    };

    autoPlayStop = () => {
      this.toggleAutoPlay(AUTOPLAY_STOP);
    };

    /* @ts-ignore TODO: TS7031 ->  Binding element 'event' implicitly has an 'any' type. */
    swipe = ({ event }) => {
      this.autoPlayStop();
      event.stopPropagation();
    };

    /* @ts-ignore TODO: TS7031 ->  Binding element 'deltaX' implicitly has an 'any' type. */
    swipeRight = ({ deltaX }) => {
      swipeTo(this.prevSlide, deltaX);
    };

    /* @ts-ignore TODO: TS7031 ->  Binding element 'deltaX' implicitly has an 'any' type. */
    swipeLeft = ({ deltaX }) => {
      swipeTo(this.nextSlide, deltaX);
    };

    touchStart = (event: SyntheticEvent) => {
      event.stopPropagation();
      this.autoPlayStop();
      event.currentTarget.className += ' touch-move';
    };

    touchEnd = (event: SyntheticEvent) => {
      event.stopPropagation();
      this.autoPlayStart();
      const targetClasses: string = event.currentTarget.className;
      if (typeof targetClasses === 'string') {
        event.currentTarget.className = targetClasses.replace(
          ' touch-move',
          '',
        );
      }
    };

    disableAutoPlayOnUserAction = () => {
      if (
        this.state.autoPlay &&
        this.props.hasToStopAutoPlayOnUserInteraction
      ) {
        this.setState({
          autoPlay: false,
        });
      }
    };

    onIntersection = (entries: Array<any>) => {
      if (entries[0].isIntersecting) {
        // Destroy observer
        this.observer.disconnect();

        this.setState({ isIntersecting: true });
      }
    };

    render(): ReactElement | null {
      if (this.props.slideDimensions.length < 1) {
        return null;
      }

      const isLastSlide: boolean =
        this.state.activeIndex + 1 === this.props.slideCount;

      return (
        <div
          className={styles.OuterWrapper}
          onMouseEnter={this.autoPlayStop}
          onMouseLeave={this.autoPlayStart}
          onTouchStart={this.touchStart}
          onTouchEnd={this.touchEnd}
          ref={this.sliderEl}
        >
          {this.props.showInteractionButtons &&
            SwipeInteractionButton &&
            (indicatorElementNext || indicatorElementPrev) && (
              <div
                className={styles.InteractionButtonWrapper}
                style={{ height: this.props.sliderHeight }}
              >
                {!isLastSlide && indicatorElementNext && (
                  <SwipeInteractionButton
                    onClickHandler={this.nextSlide}
                    isHidden={this.state.isDirty}
                    direction="next"
                  >
                    {indicatorElementNext}
                  </SwipeInteractionButton>
                )}
                {(this.state.activeIndex > 0 || this.props.loop) &&
                  indicatorElementPrev && (
                    <SwipeInteractionButton
                      onClickHandler={this.prevSlide}
                      isHidden={this.state.isDirty}
                      direction="prev"
                    >
                      {indicatorElementPrev}
                    </SwipeInteractionButton>
                  )}
              </div>
            )}
          <div
            data-testid="slider-factory-wrapper"
            className={classNames(styles.Wrapper, this.props.addClass)}
            style={{
              overflow: this.props.hideGalleryOverflow ? 'hidden' : 'visible',
              width: this.props.sliderWidth || '100%',
              touchAction: 'pan-y',
              transform: 'translateZ(0)',
            }}
          >
            {(this.state.autoPlay &&
              this.props.slideInterval &&
              this.props.showSliderProgressBar &&
              SliderProgressBar && (
                <SliderProgressBar
                  activeIndex={this.state.activeIndex}
                  slideInterval={this.props.slideInterval}
                />
              )) ||
              null}
            <SlideBuffer
              activeIndex={this.state.activeIndex}
              animate={!this.widthChange}
              fadeInactive={this.props.fadeInactive}
              keyMappingList={
                this.props.loop ? this.keyMappingList : this.sliderItemsList
              }
              opacityInactive={this.props.opacityInactive}
              positions={this.positions}
              slideDimensions={this.props.slideDimensions}
              sliderHeight={this.props.sliderHeight}
              swipedHandlerLeft={this.swipeLeft}
              swipedHandlerRight={this.swipeRight}
              swipingHandler={this.swipe}
              syncParentHeight={this.props.syncParentHeight}
              viewport={this.viewport}
              loop={this.props.loop}
              isIntersecting={this.state.isIntersecting}
            >
              {this.props.children}
            </SlideBuffer>

            {(this.props.showSliderNavigation &&
              this.props.sliderNavigationOptions?.position ===
                SLIDER_NAVIGATION_POSITION_BOTTOM_IMAGE &&
              SliderNavigation && (
                <div className={this.props.addControlClass}>
                  <SliderNavigation
                    activeIndex={this.state.activeIndex}
                    totalSlides={this.props.slideCount}
                    nextImage={this.nextSlide}
                    prevImage={this.prevSlide}
                    /* @ts-ignore TODO: TS2322 ->  Type 'boolean | undefined' is not assignable to type 'boolean'. */
                    loop={this.props.loop}
                  />
                </div>
              )) ||
              null}
            {this.props.swipeIndicatorOptions?.position ===
              SWIPE_INDICATOR_POSITION_BOTTOM_IMAGE_CENTER &&
              this.props.slideCount !== 0 &&
              this.props.swipeIndicatorOptions &&
              SwipeIndicator && (
                <SwipeIndicator
                  totalWidth={this.props.slideCount * this.props.sliderWidth}
                  sliderWidth={this.props.sliderWidth}
                  slideCount={this.props.slideCount}
                  activeIndex={this.keyMappingList[this.state.activeIndex]}
                  clearUpdateActiveIndex={this.clearUpdateActiveIndex}
                  type={this.props.swipeIndicatorOptions.swipeIndicatorType}
                />
              )}
          </div>
          {this.props.swipeIndicatorOptions?.position ===
            SWIPE_INDICATOR_POSITION_BOTTOM &&
            this.props.slideCount !== 0 &&
            this.props.swipeIndicatorOptions &&
            SwipeIndicator && (
              <SwipeIndicator
                totalWidth={this.props.slideCount * this.props.sliderWidth}
                sliderWidth={this.props.sliderWidth}
                slideCount={this.props.slideCount}
                activeIndex={this.keyMappingList[this.state.activeIndex]}
                clearUpdateActiveIndex={this.clearUpdateActiveIndex}
                type={this.props.swipeIndicatorOptions.swipeIndicatorType}
              />
            )}

          <div className={this.props.addControlClass}>
            {(this.props.labels.length > 0 && SlideLabel && (
              <SlideLabel
                activeIndex={this.keyMappingList[this.state.activeIndex]}
                labels={this.props.labels}
                slideDimensions={this.props.slideDimensions}
              />
            )) ||
              null}
            {(this.props.showSliderNavigation &&
              this.props.sliderNavigationOptions?.position !==
                SLIDER_NAVIGATION_POSITION_BOTTOM_IMAGE &&
              SliderNavigation && (
                <SliderNavigation
                  activeIndex={this.state.activeIndex}
                  totalSlides={this.props.slideCount}
                  nextImage={this.nextSlide}
                  prevImage={this.prevSlide}
                  /* @ts-ignore TODO: TS2322 ->  Type 'boolean | undefined' is not assignable to type 'boolean'. */
                  loop={this.props.loop}
                />
              )) ||
              null}
          </div>
        </div>
      );
    }
  }

  const mapStateToProps = (state: ReduxState) => ({
    routeScreenReady: locationStateSelector(state).screenReady,
    routePathname: locationStateSelector(state).locationBeforeTransitions
      .pathname as String,
  });

  return compose<any, any>(
    connect(mapStateToProps, null, null, { forwardRef: true }),
  )(Slider);
};

export default SliderFactory;
