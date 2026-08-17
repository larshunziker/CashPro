import { ReactNode } from 'react';

export type BadgeProps = {
  label?: string;
  color?: string;
  isSmall?: boolean;
  origin?: string;
  children?: ReactNode;
};

export type BadgeFactoryOptionsStyles = {
  Wrapper: string;
  Content: string;
};

type GetStylesByProps<T> = (props: T) => BadgeFactoryOptionsStyles;

export type BadgeFactoryOptions<T> = {
  styles: GetStylesByProps<T> | BadgeFactoryOptionsStyles;
};
