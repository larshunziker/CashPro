import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedUtilityOverlay = ({ children }) => (
  <div data-testid="mocked-utilityoverlay">{children}</div>
);

export default MockedUtilityOverlay;
