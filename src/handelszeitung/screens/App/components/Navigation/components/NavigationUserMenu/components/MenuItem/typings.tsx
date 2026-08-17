import { ReactElement } from 'react';

export type MenuItemProps = {
  name: string;
  iconType: string;
  trackingClass: string;
  link?: string;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  onClick?: (event) => void;
};

export type MenuItemComponent = (props: MenuItemProps) => ReactElement;
