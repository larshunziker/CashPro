import { ComponentType } from 'react';
import { AspectRatioItem } from '../../../../../shared/helpers/@types/resizeByAspectRatio';
import { CSSSlideComponent } from '../CSSSlide/typings';

export type SliderBufferProps = {
  activeIndex: number;
  animate: boolean;
  children?: any;
  deltaX: number;
  fadeInactive: boolean;
  keyMappingList: Array<number>;
  loop: boolean;
  opacityInactive?: number;
  positions: Array<number>;
  setDeltaX: Function;
  swipedHandler: (props: any) => void;
  swipedHandlerLeft: (props: any) => void;
  swipedHandlerRight: (props: any) => void;
  swipingHandler: (props: any) => void;
  slideDimensions: Array<AspectRatioItem>;
  sliderHeight: string;
  syncParentHeight: boolean;
  viewport: Array<number>;
  isIntersecting: boolean;
};

export type SlideBufferFactoryOptions = {
  Slide: CSSSlideComponent;
};

export type SlideBufferComponent = ComponentType<SliderBufferProps>;
