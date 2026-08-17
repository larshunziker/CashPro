import { ComponentType, ReactElement } from 'react';

export type NavigationUserMenuFactoryOptions = {
  Icon: any; // TODO: add the correct IconComponent typing as soon as Icon is converted to ts
  MenuHeaderLogo?: (props: MenuHeaderLogoProps) => ReactElement;
  MenuListHeader?: (props: any) => ReactElement;
  MenuItem: (props: any) => ReactElement;
  closeNavigation: (props: any) => () => void;
  links: Array<UserCockpitMenuItem>;
  appWelcomeMessage?: string;
  appLogoutMessage?: string;
  appCloseMenuMessage?: string;
  closeOnOutsideClick?: boolean;
  styles: {
    Wrapper: string;
    MenuHeader: string;
    MenuHeaderContent: string;
    MenuBodyWrapper: string;
    UserInformationWrapper: string;
    UserName: string;
    UserCredentials: string;
    MenuWrapper: string;
    Container: string;
    MenuListWrapper?: string;
    MenuItem: string;
    MenuItemHiddenOnApp?: string;
    CloseButton: string;
    CloseIcon: string;
  };
};

export type NavigationUserMenuComponent =
  ComponentType<NavigationUserMenuProps>;

export type NavigationUserMenuProps = {};

export type UserCockpitMenuItem = {
  name: string;
  link: string;
  iconType: string;
  trackingClass: string;
  isHiddenOnHybridApp?: boolean;
  onClick?: () => void;
};

export type MenuHeaderLogoProps = {
  closeNavigation: () => void;
};
