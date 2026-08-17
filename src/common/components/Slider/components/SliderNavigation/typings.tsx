import { ComponentType } from 'react';

export type SliderNavigationProps = {
  activeIndex: number;
  nextImage: Function;
  prevImage: Function;
  totalSlides: number;
  loop: boolean;
};

export type SliderNavigationFactoryOptionsStyles = {
  DisabledButton?: string;
  Icon: string;
  NextButton: string;
  PrevButton: string;
  TopArrows?: string;
  Wrapper: string;
};

export type SliderNavigationFactoryOptionsStylesByProps<T> = (
  props: T,
) => SliderNavigationFactoryOptionsStyles;

export type SliderNavigationFactoryOptions<T> = {
  styles:
    | SliderNavigationFactoryOptionsStyles
    | SliderNavigationFactoryOptionsStylesByProps<T>;
};

export type SliderNavigationComponent = ComponentType<SliderNavigationProps>;
