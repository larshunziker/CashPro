import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedArticleHeader = ({ children }) => (
  <div data-testid="mocked-article-header">{children}</div>
);

export default MockedArticleHeader;
