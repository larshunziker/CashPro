import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedBadge = ({ children }) => (
  <div data-testid="mocked-badge">{children}</div>
);

export default MockedBadge;
