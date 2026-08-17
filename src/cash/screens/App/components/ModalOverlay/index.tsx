import React, { ReactElement } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/decorators/componentSwitch'. '/Users/bhs/code/work/ */
import createComponentSwitch from '../../../../../shared/decorators/componentSwitch';
import DefaultModalOverlay from './components/DefaultModalOverlay';
import FlyoutModalOverlay from './components/FlyoutNavigationModalOverlay';
import NavigationModalOverlay from './components/NavigationModalOverlay';
import { ModalOverlayType } from '../../../../shared/constants/enums';

const Switch = createComponentSwitch({
  [ModalOverlayType.DEFAULT]: DefaultModalOverlay,
  [ModalOverlayType.NAVIGATION]: NavigationModalOverlay,
  [ModalOverlayType.SEARCH]: DefaultModalOverlay,
  [ModalOverlayType.FLYOUT_NAVI_MENU]: FlyoutModalOverlay,
});

const ModalOverlay = ({ component, ...props }: any): ReactElement => (
  <Switch component={component} {...props} />
);

export default ModalOverlay;
