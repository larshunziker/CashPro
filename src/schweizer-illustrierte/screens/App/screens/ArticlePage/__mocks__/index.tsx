import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedArticlePage = ({ children }) => (
  <div data-testid="mocked-article-page">{children}</div>
);

export default MockedArticlePage;
