import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'type' implicitly has an 'any' type. */
const MockedIcon = ({ type }) => <div data-testid="mocked-icon">{type}</div>;

export default MockedIcon;
