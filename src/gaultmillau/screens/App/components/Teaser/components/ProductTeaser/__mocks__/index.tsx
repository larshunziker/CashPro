import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedProductTeaser = ({ children, ...props }) => (
  <div data-testid="mocked-product-teaser" {...props}>
    {children}
  </div>
);

export default MockedProductTeaser;
