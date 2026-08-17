import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedImageGalleryArticle = ({ children }) => (
  <div data-testid="mocked-image-gallery-article">{children}</div>
);

export default MockedImageGalleryArticle;
