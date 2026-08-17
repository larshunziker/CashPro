import { ComponentType } from 'react';

export type MenuItemProps = {
  name: string;
  iconType: string;
  trackingClass: string;
  link?: string;
  onClick?: () => void;
};

export type MenuItemComponent = ComponentType<MenuItemProps>;
