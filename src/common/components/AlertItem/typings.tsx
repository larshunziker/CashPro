import { ReactElement, ReactNode } from 'react';

export type AlertItemFactoryOptionStyles = {
  AlertItemImageWrapper?: string;
  AlertItemImage?: string;
  AlertItemWrapper: string;
  Text: string;
  ChildWrapper: string;
};

type getStylesByProps = (props: AlertItemProps) => AlertItemFactoryOptionStyles;

export type AlertItemFactoryOptions = {
  styles: AlertItemFactoryOptionStyles | getStylesByProps;
};

export type AlertItemComponent = (props: AlertItemProps) => ReactElement | null;

export type AlertItemProps = {
  children?: ReactNode;
  label: string;
  url: string;
  relativeOriginPath?: string;
  focalPointX?: number;
  focalPointY?: number;
  imageStyles?: ImageStylesObject;
  theme?: 'light' | 'default';
};
