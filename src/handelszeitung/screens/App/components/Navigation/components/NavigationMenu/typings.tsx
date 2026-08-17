import { NavigationProps } from '../../typings';

export type NavigationMenuProps = NavigationProps & {
  navigationMenuHZ: Menu | null;
  navigationMenuBIL: Menu | null;
  navigationMenuSV: Menu | null;
  navigationMenuHZB: Menu | null;
  navigationState: NavigationState;
};
