import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedChannelPage = ({ children }) => (
  <div data-testid="mocked-channel-page">{children}</div>
);

export default MockedChannelPage;
