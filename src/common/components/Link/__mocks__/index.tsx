import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'path' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'className' implicitly has an 'any' type. */
const MockedLink = ({ label, path, children, className }) => (
  <a href={path} className={className} data-testid="mocked-link">
    {children || label}
  </a>
);

export default MockedLink;
