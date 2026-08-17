import { ComponentType } from 'react';
import { ActiveMainChannel } from '../../../../../../shared/types';

export type NavigationProps = {
  menuLinks: Array<MenuTreeItemEdge>;
  hasStickiness?: boolean;
};

export type MainLinksProps = {
  menuLinks: Array<MenuTreeItemEdge>;
  activeMainChannel: ActiveMainChannel;
  hasStickiness: boolean;
};

export type NavigationBarComponent = ComponentType<NavigationProps>;
