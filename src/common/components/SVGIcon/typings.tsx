import { ReactElement } from 'react';

export type SVGIconProps = {
  type: string;
  className?: string;
  alt?: string;
};

export type SVGIconFactoryOptions = {
  iconConfig: Record<string, ReactElement>;
  type?: string;
  styles: {
    Wrapper: string;
  };
};

export type SVGIconComponent = (props: SVGIconProps) => ReactElement;
