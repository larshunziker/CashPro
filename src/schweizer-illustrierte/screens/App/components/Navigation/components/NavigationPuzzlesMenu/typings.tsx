import { ComponentType } from 'react';

export type NavigationMenuProps = {
  menuLinks: Array<MenuTreeItemEdge>;
  isVisible: boolean;
};

export type NavigationMenuComponent = ComponentType<NavigationMenuProps>;
