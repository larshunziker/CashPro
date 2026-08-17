import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'type' implicitly has an 'any' type. */
const MockedLogo = ({ type }) => <div data-testid="mocked-logo">{type}</div>;

export default MockedLogo;
