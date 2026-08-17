import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedAddToPortfolioButton = ({ children, ...props }) => (
  <div data-testid="mocked-add-to-portfolio-button" {...props}>
    {children}
  </div>
);

export default MockedAddToPortfolioButton;
