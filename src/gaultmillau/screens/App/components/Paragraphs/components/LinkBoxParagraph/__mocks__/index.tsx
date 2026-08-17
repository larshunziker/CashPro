import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedLinkBoxParagraph = ({ children }) => (
  <div data-testid="mocked-link-box-paragraph">{children}</div>
);

export default MockedLinkBoxParagraph;
