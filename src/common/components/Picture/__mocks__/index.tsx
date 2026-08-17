import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'relativeOrigin' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'alt' implicitly has an 'any' type. */
const MockedPicture = ({ relativeOrigin, alt }) => (
  <img data-testid="mocked-picture" src={relativeOrigin} alt={alt} />
);

export default MockedPicture;
