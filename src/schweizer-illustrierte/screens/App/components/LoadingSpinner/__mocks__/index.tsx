import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const Loadingspinner = ({ children }) => (
  <div data-testid="mocked-loadingspinner">{children}</div>
);

export default Loadingspinner;
