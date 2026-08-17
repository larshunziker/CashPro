import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import { SUBSCRIPTION_TYPE_PUZZLES } from '../../../../../constants';

const states = {
  unauthorized: {
    auth: {
      isAuthenticated: false,
      initialAuthRequest: true,
    },
  },
  authorized: {
    auth: {
      isAuthenticated: true,
      initialAuthRequest: true,
    },
  },
  unsubscribed: {
    auth: {
      isAuthenticated: true,
      initialAuthRequest: true,
      subscriptions: [],
    },
  },
  'subscribed-puzzles': {
    auth: {
      subscriptions: [SUBSCRIPTION_TYPE_PUZZLES],
    },
  },
};

describe('[Screen] PuzzlesListing', () => {
  test('Should render login button if user is not logged in', () => {
    const { getAllByTestId, queryByTestId } = render(
      <ReduxProvider initialState={states['unauthorized']}>
        <HelmetProvider>
          <Component
            puzzle="sudoku"
            location={{ pathname: '/puzzles' }}
            page={1}
          />
        </HelmetProvider>
      </ReduxProvider>,
    );
    expect(getAllByTestId('puzzles-freegame')).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('puzzles-freegame').innerHTML).toContain('Anmelden');
  });

  test('Should render free game link if user is logged in)', () => {
    const { getAllByTestId, queryByTestId } = render(
      <ReduxProvider initialState={states['authorized']}>
        <HelmetProvider>
          <Component
            puzzle="sudoku"
            location={{ pathname: '/puzzles' }}
            page={1}
          />
        </HelmetProvider>
      </ReduxProvider>,
    );
    expect(getAllByTestId('puzzles-freegame')).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('puzzles-freegame').innerHTML).toContain('Spielen');
  });

  test('Should render list items with subscription link if user is not subscribed', () => {
    const { queryByTestId, queryAllByTestId } = render(
      <ReduxProvider initialState={states['unsubscribed']}>
        <HelmetProvider>
          <Component
            puzzle="sudoku"
            location={{ pathname: '/puzzles' }}
            page={1}
          />
        </HelmetProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('puzzles-freegame')).not.toBeNull();
    expect(queryAllByTestId('puzzle-listing-gamelink')[0]).not.toBeNull();
  });

  test('Should render list items with real links if user is subscribed', () => {
    const { queryAllByTestId } = render(
      <ReduxProvider initialState={states['subscribed-puzzles']}>
        <HelmetProvider>
          <Component
            puzzle="sudoku"
            location={{ pathname: '/puzzles' }}
            page={1}
          />
        </HelmetProvider>
      </ReduxProvider>,
    );
    expect(queryAllByTestId('puzzle-listing-gamelink')[0]).not.toBeNull();
    expect(
      queryAllByTestId('puzzle-listing-gamelink')[0].innerHTML,
    ).not.toContain('puzzle-subscribe-button');
  });
});
