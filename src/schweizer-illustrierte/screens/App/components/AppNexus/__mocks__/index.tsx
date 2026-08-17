import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedAppNexus = ({ children }) => (
  <div data-testid="mocked-appnexus">{children}</div>
);

export default MockedAppNexus;
