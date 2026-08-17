import { ComponentType, ReactElement } from 'react';

type CSSSlideChildrenProps = {
  height?: string;
  slide: number;
  isIntersecting: boolean;
};

export type CSSSlideProps = CSSSlideChildrenProps & {
  animate: boolean;
  children?: (props: CSSSlideChildrenProps) => ReactElement; // TODO: I got a error by typing Reacthild
  deltaX: number;
  fadeInactive?: boolean;
  index: number;
  key: string;
  isActive?: boolean;
  opacityInactive?: number;
  positions: Array<number>;
  slideWidth?: number;
  syncParentHeight: boolean;
  visible?: boolean;
};

export type CSSSlideFactoryOptions = {
  Slide?: any; //TODO: add Slide component typing here
  styles: {
    Wrapper: string;
  };
};

export type CSSSlideComponent = ComponentType<CSSSlideProps>;
