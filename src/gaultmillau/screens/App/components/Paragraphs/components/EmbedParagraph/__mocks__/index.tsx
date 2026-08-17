import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedEmbedParagraph = ({ children }) => (
  <div data-testid="mocked-embed-paragraph">{children}</div>
);

export default MockedEmbedParagraph;
