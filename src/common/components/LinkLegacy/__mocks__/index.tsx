import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedLink = ({ children }) => (
  <div data-testid="mocked-link">{children}</div>
);

export default MockedLink;
