import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedParagraphRenderer = ({ children }) => (
  <div data-testid="mocked-paragraph-renderer">{children}</div>
);

export default MockedParagraphRenderer;
