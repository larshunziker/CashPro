import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedLandingPage = ({ children }) => (
  <div data-testid="mocked-landing-page">{children}</div>
);

export default MockedLandingPage;
