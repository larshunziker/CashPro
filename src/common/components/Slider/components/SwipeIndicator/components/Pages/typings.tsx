import { ComponentType } from 'react';

export type SwipeIndicatorProps = {
  slideCount: number;
  activeIndex: number;
};

export type SwipeIndicatorFactoryOptionsStyles = {
  Indicator: string;
  Active: string;
  Separator: string;
  Highlight: string;
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
