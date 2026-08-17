import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedImageParagraph = ({ children }) => (
  <div data-testid="mocked-image-paragraph">{children}</div>
);

export default MockedImageParagraph;
