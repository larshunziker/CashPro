import { ComponentType, ReactNode } from 'react';

export type IconProps = {
  children?: ReactNode;
  type: string;
  addClass?: string;
  iconsOverride?: any;
  onClick?: () => void;
};

export type IconComponent = ComponentType<IconProps>;

export type IconFactoryOptions = {
  iconFont: any; //TODO: Clarify w/ the team on how to type such situations (iconFont has different contents on each publication.)
};
