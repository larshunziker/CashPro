import { ComponentType, KeyboardEvent, MouseEvent } from 'react';

export type SwipeIndicatorProps = {
  totalWidth: number;
  sliderWidth: number;
  slideCount: number;
  activeIndex: number;
  clearUpdateActiveIndex: (
    activeIndex: number,
    event: MouseEvent | KeyboardEvent,
  ) => void;
  position: string;
};

export type SwipeIndicatorFactoryOptionsStyles = {
  Wrapper: string;
  Active: string;
  SwipeIndicator: string;
};

export type SwipeIndicatorFactoryOptionsStylesByProps<T> = (
  props: T,
) => SwipeIndicatorFactoryOptionsStyles;

export type SwipeIndicatorFactoryOptions<T> = {
  styles:
    | SwipeIndicatorFactoryOptionsStyles
    | SwipeIndicatorFactoryOptionsStylesByProps<T>;
  appAriaLabel?: string;
};

export type SwipeIndicatorComponent = ComponentType<SwipeIndicatorProps>;
