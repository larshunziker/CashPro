import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const ModalOverviewPageHeader = ({ children }) => (
  <div data-testid="mocked-overview-pageheader">{children}</div>
);

export default ModalOverviewPageHeader;
