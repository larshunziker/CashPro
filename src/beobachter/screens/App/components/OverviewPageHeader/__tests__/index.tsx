import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from '../../Teaser/__tests__/mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialProps = {
    node: mockData.node,
  };
  initialState = {};
});

describe('[Component] OverviewPageHeader', () => {
  it('Should render nothing', () => {
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component title={null} lead={initialProps.node.lead} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correct', () => {
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <Component
          /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
          title={initialProps.node.title}
          /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
          lead={initialProps.node.lead}
        />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render without lead', () => {
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | undefined'. */}
        <Component title={initialProps.node.title} lead={null} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
