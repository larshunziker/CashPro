import { ReactElement } from 'react';
import { NavigationStateAction } from '../../../../../../../shared/actions/navigation';

export type NavigationDefaultProps = {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  handleNavigationToggle: (event) => void;
  navigationPrimaryMenu?: Menu;
  navigationPrimaryMenuFr?: Menu;
  navigationSecondaryMenu?: Menu;
  navigationToggle: (toggle: boolean) => NavigationStateAction<{}>;
  renderNavigationOverlay: (el: Menu, el2: Menu, el3: Menu) => ReactElement;
  language: string;
  isNavigationVisible: string;
};
