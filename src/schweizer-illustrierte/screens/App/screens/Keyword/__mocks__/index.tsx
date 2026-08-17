import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedKeywordPage = ({ children }) => (
  <div data-testid="mocked-keyword-page">{children}</div>
);

export default MockedKeywordPage;
