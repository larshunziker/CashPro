import { ComponentType, MouseEvent } from 'react';

export type SwipeIndicatorProps = {
  slideCount: number;
  activeIndex: number;
  clearUpdateActiveIndex: (activeIndex: number, event: MouseEvent) => void;
};

export type SwipeIndicatorFactoryOptionsStyles = {
  Active: string;
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
