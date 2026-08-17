import React, { ReactElement } from 'react';

/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/decorators/componentSwitch'. '/Users/bhs/code */
import createComponentSwitch from '../../../../../../../shared/decorators/componentSwitch';
import NavigationUserMenuDefault from './components/NavigationUserMenuDefault';
import NavigationUserMenuModal from './components/NavigationUserMenuModal';
import {
  TYPE_NAVIGATION_USER_MENU_DEFAULT,
  TYPE_NAVIGATION_USER_MENU_MODAL,
} from './constants';

const Switch = createComponentSwitch({
  [TYPE_NAVIGATION_USER_MENU_DEFAULT]: NavigationUserMenuDefault,
  [TYPE_NAVIGATION_USER_MENU_MODAL]: NavigationUserMenuModal,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const NavigationUserMenu = (props): ReactElement => {
  return (
    <Switch
      component={props.component || TYPE_NAVIGATION_USER_MENU_DEFAULT}
      {...props}
    />
  );
};

export default NavigationUserMenu;
