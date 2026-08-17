import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedUtilityBar = ({ children }) => (
  <div data-testid="mocked-utilitybar">{children}</div>
);

export default MockedUtilityBar;
