import { ComponentType } from 'react';
import { NavigationMenuType } from '../../../../../../shared/constants/enums';

export type NavigationBarProps = {
  menuLinks: Array<MenuTreeItemEdge>;
  toggleNavigation?: (type: NavigationMenuType, node: MenuTreeItem) => void;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'args' implicitly has an 'any' type. */
  closeFlyoutMenuDebounced?: ((args) => void) & {
    cancel?: () => void;
  };
  focusLink?: string;
};

export type NavigationBarComponent = ComponentType<NavigationBarProps>;
