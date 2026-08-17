import { ComponentType, ReactElement } from 'react';

export type SocialMediaBarProps = {
  origin?: string;
  publication?: string;
  isDark?: boolean;
};

export type SocialMediaBarFactoryOptionsStyles = {
  Wrapper: string;
  LinkItem?: string;
};

export type SocialMediaBarFactoryOptionsStylesByProps<T> = (
  props: T,
) => SocialMediaBarFactoryOptionsStyles;

export type SocialMediaItemsByProps<T> = (
  props: T,
) => SocialMediaBarIconProps[];

export type SocialMediaBarFactoryOptions<T> = {
  socialMediaItems: SocialMediaBarIconProps[] | SocialMediaItemsByProps<T>;
  SocialMediaBarIcon: (props: SocialMediaBarIconProps) => ReactElement;
  styles:
    | SocialMediaBarFactoryOptionsStyles
    | SocialMediaBarFactoryOptionsStylesByProps<T>;
};

export type SocialMediaBarIconProps = {
  type: string;
  link: string;
  component?: ReactElement;
  isDark?: boolean;
};

export type SocialMediaBarComponent = ComponentType<SocialMediaBarProps>;
