import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'props' implicitly has an 'any' type. */
const MockedTableOfContents = ({ props }) => (
  <div data-testid="table-of-contents-wrapper" {...props} />
);

export default MockedTableOfContents;
