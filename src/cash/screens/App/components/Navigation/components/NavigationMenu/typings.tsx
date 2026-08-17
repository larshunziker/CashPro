import { ComponentType } from 'react';

export type NavigationMenuProps = {
  primaryMenuLinks: MenuTreeItemEdge[];
  secondaryMenuLinks: MenuTreeItemEdge[];
};

export type NavigationMenuComponent = ComponentType<NavigationMenuProps>;

export type NavigationMenuQueryComponent = {
  loading?: boolean;
  error?: string;
  data: Query & {
    loading: boolean;
    environment: { routeByPath: { object: LandingPage } };
  };
};
