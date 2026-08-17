import React, { ReactElement } from 'react';
import createComponentSwitch from '../../../../shared/decorators/componentSwitch';
import DefaultModalOverlay from './components/DefaultModalOverlay';
import SearchModalOverlay from './components/SearchModalOverlay';
import { DEFAULT_MODAL_OVERLAY, SEARCH_MODAL_OVERLAY } from './constants';
import { ModalOverlayProps } from './typings';

const Switch = createComponentSwitch({
  [DEFAULT_MODAL_OVERLAY]: DefaultModalOverlay,
  [SEARCH_MODAL_OVERLAY]: SearchModalOverlay,
});

const ModalOverlay = ({
  component,
  ...props
}: ModalOverlayProps): ReactElement => (
  <Switch component={component} {...props} />
);

export default ModalOverlay;
