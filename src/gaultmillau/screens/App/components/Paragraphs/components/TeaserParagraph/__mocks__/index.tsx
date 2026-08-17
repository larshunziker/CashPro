import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedTeaserParagraph = ({ children }) => (
  <div data-testid="mocked-teaser-paragraph">{children}</div>
);

export default MockedTeaserParagraph;
