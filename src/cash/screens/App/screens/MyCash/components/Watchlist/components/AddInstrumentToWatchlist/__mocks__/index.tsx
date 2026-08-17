import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const MockedAddInstrumentToWatchlist = ({ children, ...props }) => (
  <div data-testid="mocked-add-instrument-to-watchlist" {...props}>
    {children}
  </div>
);

export default MockedAddInstrumentToWatchlist;
