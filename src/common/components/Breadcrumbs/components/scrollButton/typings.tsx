import { ReactElement } from 'react';
import { IconComponent } from '../../../Icon/typings';

export type ScrollButtonProps = {
  container?: RefObject;
  styles?: ScrollButtonFactoryOptionsStyles;
  IconRight?: IconComponent;
  IconLeft?: IconComponent;
};

export type ScrollButtonFactoryOptionsStyles = {
  Wrapper?: string;
  Left?: string;
  ScrollButton?: string;
  GradiantLeftToRight?: string;
  GradiantRightToLeft?: string;
};

export type ScrollButtonFactoryOptions = {
  container?: RefObject;
  styles?: ScrollButtonFactoryOptionsStyles;
  IconRight?: ReactElement;
  IconLeft?: ReactElement;
};

export type ScrollButtonComponent = (props: ScrollButtonProps) => ReactElement;
