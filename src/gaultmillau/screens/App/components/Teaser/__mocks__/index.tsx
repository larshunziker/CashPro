import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedTeaser = ({ children, ...props }) => (
  <div data-testid="mocked-teaser" {...props}>
    {children}
  </div>
);

export default MockedTeaser;
