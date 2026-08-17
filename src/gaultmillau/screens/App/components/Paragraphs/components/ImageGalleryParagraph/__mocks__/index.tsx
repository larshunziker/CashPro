import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedImageGalleryParagraph = ({ children }) => (
  <div data-testid="mocked-image-gallery-paragraph">{children}</div>
);

export default MockedImageGalleryParagraph;
