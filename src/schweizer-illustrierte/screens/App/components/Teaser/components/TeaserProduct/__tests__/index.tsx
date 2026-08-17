import { render } from '@testing-library/react';
import React from 'react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import { routeInitialState } from '../../../../../../../shared/reducers/route';
import { settingsInitialState } from '../../../../../../../shared/reducers/settings';
import Component from '../index';
import mockGraphQlData from './mockGraphQlData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
let initialState = {};

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(mockGraphQlData));

  initialState = {
    settings: settingsInitialState,
    route: routeInitialState,
  };
});

describe('[Component] TeaserProduct', () => {
  it('Should render nothing', () => {
    initialProps = {};

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(container.innerHTML).toBe('');
  });

  it('Should render nothing if no link is provided', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.link = null;

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(container.innerHTML).toBe('');
  });

  it('Should render the product teaser', () => {
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('teaserproduct-container').innerHTML).not.toBe('');
  });

  test.each([
    [{ price: 19, prefix: null, expected: 'CHF 19.—' }],
    [{ price: 19.5, prefix: null, expected: 'CHF 19.50' }],
    [{ price: 19.95, prefix: null, expected: 'CHF 19.95' }],
    [{ price: 19.1234, prefix: null, expected: 'CHF 19.12' }],
    [{ price: 19, prefix: 'ca.', expected: 'ca. CHF 19.—' }],
    [{ price: 19.5, prefix: 'ab', expected: 'ab CHF 19.50' }],
  ])('Should format the price correctly', (config) => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.price = config.price;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.pricePrefix = config.prefix;

    const { queryByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('teaserproduct-price').textContent).toEqual(
      config.expected,
    );
  });
});
