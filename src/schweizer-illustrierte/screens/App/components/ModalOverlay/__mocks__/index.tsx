import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const ModalOverlay = ({ children }) => (
  <div data-testid="mocked-modaloverlay">{children}</div>
);

export default ModalOverlay;
