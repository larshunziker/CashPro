import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedVideoPage = ({ children }) => (
  <div data-testid="mocked-video-page">{children}</div>
);

export default MockedVideoPage;
