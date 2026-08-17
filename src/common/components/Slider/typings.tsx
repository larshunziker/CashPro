import React, { ComponentType, ReactElement, ReactNode } from 'react';
import { AspectRatioItem } from '../../../shared/helpers/@types/resizeByAspectRatio';
import { SlideLabelComponent } from './components/SlideLabel/typings';
import { SliderNavigationComponent } from './components/SliderNavigation/typings';
import { SliderProgressBarComponent } from './components/SliderProgressBar/typings';

export type SliderProps = {
  addClass?: string;
  hasToStopAutoPlayOnUserInteraction?: boolean;
  addControlClass?: string;
  alignArrowsOnTop?: boolean;
  autoPlay: boolean;
  dynamicWidthSlides: boolean;
  fadeInactive: boolean;
  hideGalleryOverflow: boolean;
  initialIndex: number;
  labelClass: string;
  loop?: boolean;
  onPositionUpdate?: (item: any, direction?: string) => void;
  opacityInactive?: number;
  preloadCount: number;
  showInteractionButtons?: boolean;
  showSlideLabel?: boolean;
  showSliderProgressBar?: boolean;
  showSliderNavigation?: boolean;
  slideAlignment?: string;
  swipeIndicatorOptions?: {
    position: string;
    swipeIndicatorType?: string;
  };
  sliderNavigationOptions?: {
    position: string;
  };
  slideCount: number;
  slideDimensions: Array<AspectRatioItem>;
  slideInterval: number;
  sliderGutter?: number;
  sliderHeight: string;
  sliderWidth: number;
  syncParentHeight: boolean;
  checkVisibility: boolean;
  children?: ReactNode;
  ref?: RefObject;
};

// TODO type components correctly
export type SliderFactoryOptions = {
  SlideBuffer: React.ComponentType<any>;
  SlideLabel?: SlideLabelComponent;
  SliderProgressBar?: SliderProgressBarComponent;
  SwipeInteractionButton?: React.ComponentType<any>;
  SliderNavigation?: SliderNavigationComponent;
  SwipeIndicator?: React.ComponentType<any>;
  indicatorElementNext?: ReactElement | null;
  indicatorElementPrev?: ReactElement | null;
  styles: {
    OuterWrapper?: string;
    Wrapper: string;
    InteractionButtonWrapper?: string;
  };
};

export type SliderComponent = ComponentType<any>; //TODO: replace <any> with <SliderProps>
