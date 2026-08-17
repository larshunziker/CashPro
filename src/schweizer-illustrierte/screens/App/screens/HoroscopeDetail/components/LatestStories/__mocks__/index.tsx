import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedLatestStories = ({ children }) => (
  <div data-testid="mocked-latest-stories">{children}</div>
);

export default MockedLatestStories;
