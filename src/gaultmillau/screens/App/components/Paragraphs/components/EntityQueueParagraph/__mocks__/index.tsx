import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedEntityQueueParagraph = ({ children }) => (
  <div data-testid="mocked-entity-queue-paragraph">{children}</div>
);

export default MockedEntityQueueParagraph;
