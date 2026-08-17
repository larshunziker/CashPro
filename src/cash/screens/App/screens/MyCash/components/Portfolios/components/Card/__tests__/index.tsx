import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import Card from '../../Card/index';
import { portfolioByKeyApolloConfig } from '../apolloConfig';
import mockData from './mockData.json';

let props = null;
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

beforeEach(() => {
  props = { portfolio: { portfolioKey: 'obWDNLgKY4', name: 'Grosses' } };
  Component = (
    <ReduxProvider>
      <MockedProvider
        mocks={[
          {
            request: {
              ...portfolioByKeyApolloConfig.options({
                location: {},
                params: { portfolioKey: 'obWDNLgKY4' },
              }),
            },
            result: JSON.parse(JSON.stringify(mockData)),
          },
        ]}
      >
        {/* @ts-ignore TODO: TS2322 ->  Type '{ portfolio */}
        <Card {...props} />
      </MockedProvider>
    </ReduxProvider>
  );
});

describe('Card', () => {
  it('should render the portfolio name', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { getByTestId } = render(Component);
    expect(getByTestId('name').innerHTML).toContain('Grosses');
  });

  it('should render the total actual price', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { getByTestId } = render(Component);

    await waitFor(() => {
      expect(getByTestId('name').innerHTML).not.toContain('...');
    }).then(() => {
      expect(getByTestId('actual-price').innerHTML).toBe(
        '<span class="">767\'581</span> CHF',
      );
    });
  });

  it('should render the total paid price', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { getByTestId } = render(Component);

    await waitFor(() => {
      expect(getByTestId('name').innerHTML).not.toContain('...');
    }).then(() => {
      expect(getByTestId('total-paid-price').innerHTML).toBe(
        '<span class="">794\'186</span> CHF',
      );
    });
  });

  it('should render the total account plus minus', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { getByTestId } = render(Component);

    await waitFor(() => {
      expect(getByTestId('name').innerHTML).not.toContain('...');
    }).then(() => {
      expect(getByTestId('account-plus-minus').innerHTML).toBe(
        '<span class="Negative">-26\'605.34</span>',
      );
    });
  });

  it('should render the total account percent', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { getByTestId } = render(Component);

    await waitFor(() => {
      expect(getByTestId('name').innerHTML).not.toContain('...');
    }).then(() => {
      expect(getByTestId('account-percent').innerHTML).toBe(
        '<span class="Negative">-3.35%</span>',
      );
    });
  });
});
