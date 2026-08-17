import React, { ReactElement } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/decorators/componentSwitch'. '/Users/bhs/code/work/ */
import createComponentSwitch from '../../../../../shared/decorators/componentSwitch';
import DefaultModalOverlay from './components/DefaultModalOverlay';
import SlideInModalOverlay from './components/SlideInModalOverlay';
import { DEFAULT_MODAL_OVERLAY, SLIDE_IN_MODAL_OVERLAY } from './constants';
import { ModalOverlayProps } from './typings';

const Switch = createComponentSwitch({
  [DEFAULT_MODAL_OVERLAY]: DefaultModalOverlay,
  [SLIDE_IN_MODAL_OVERLAY]: SlideInModalOverlay,
});

const ModalOverlay = ({
  component,
  ...props
}: ModalOverlayProps): ReactElement => (
  <Switch component={component} {...props} />
);

export default ModalOverlay;
