import React from 'react';

/* @ts-ignore TODO: TS7031 ->  Binding element 'component' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'activeState' implicitly has an 'any' type. */
const MockedHighcharts = ({ component, activeState }) => (
  <div
    data-component={component}
    data-state={activeState}
    data-testid="mocked-highcharts"
  ></div>
);

export default MockedHighcharts;
