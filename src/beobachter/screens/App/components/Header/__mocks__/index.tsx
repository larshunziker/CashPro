import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'hasStickiness' implicitly has an 'any' type. */
const MockedHeader = ({ hasStickiness }) => (
  <div data-testid="mocked-header" data-has-stickiness={hasStickiness} />
);

export default MockedHeader;
