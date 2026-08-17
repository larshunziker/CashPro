import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedPageScreen = ({ children }) => (
  <div data-testid="mocked-page-screen">{children}</div>
);

export default MockedPageScreen;
