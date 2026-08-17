import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedMultiColumnParagraph = ({ children }) => (
  <div data-testid="mocked-multi-column-paragraph">{children}</div>
);

export default MockedMultiColumnParagraph;
