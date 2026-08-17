import React, { ReactElement } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/decorators/componentSwitch'. '/Users/bhs/code/work/ */
import createComponentSwitch from '../../../../../shared/decorators/componentSwitch';
import DefaultModalOverlay from './components/DefaultModalOverlay';
import HoroscopeModalOverlay from './components/HoroscopeModalOverlay';
import NavigationModalOverlay from './components/NavigationModalOverlay';
import {
  DEFAULT_MODAL_OVERLAY,
  HOROSCOPE_OVERLAY,
  NAVIGATION_MODAL_OVERLAY,
} from './constants';

const Switch = createComponentSwitch({
  [DEFAULT_MODAL_OVERLAY]: DefaultModalOverlay,
  [HOROSCOPE_OVERLAY]: HoroscopeModalOverlay,
  [NAVIGATION_MODAL_OVERLAY]: NavigationModalOverlay,
});

const ModalOverlay = ({ component, ...props }: any): ReactElement => (
  <Switch component={component} {...props} />
);

export default ModalOverlay;
