import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedStatusPage = ({ children }) => (
  <div data-testid="mocked-status-page">{children}</div>
);

export default MockedStatusPage;
