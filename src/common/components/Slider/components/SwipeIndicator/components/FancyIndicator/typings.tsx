import { ComponentType } from 'react';

export type SwipeIndicatorProps = {
  totalWidth: number;
  sliderWidth: number;
  slideCount: number;
  activeIndex: number;
};

export type SwipeIndicatorFactoryOptionsStyles = {
  Wrapper: string;
  SwipeIndicator: string;
};

export type SwipeIndicatorFactoryOptionsStylesByProps<T> = (
  props: T,
) => SwipeIndicatorFactoryOptionsStyles;

export type SwipeIndicatorFactoryOptions<T> = {
  styles:
    | SwipeIndicatorFactoryOptionsStyles
    | SwipeIndicatorFactoryOptionsStylesByProps<T>;
};

export type SwipeIndicatorComponent = ComponentType<SwipeIndicatorProps>;
