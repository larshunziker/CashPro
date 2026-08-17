import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../../PuzzlesOverview';
import { SUBSCRIPTION_TYPE_PUZZLES } from '../../../../../constants';

const states = {
  unsubscribed: {
    auth: {
      subscriptions: [],
    },
  },
  'subscribed-puzzles': {
    auth: {
      subscriptions: [SUBSCRIPTION_TYPE_PUZZLES],
    },
  },
};

describe('[Screen] PuzzlesOverview', () => {
  test('Should render teasers with badges', () => {
    const { getAllByTestId } = render(
      <ReduxProvider initialState={states['unsubscribed']}>
        <HelmetProvider>
          <Component />
        </HelmetProvider>
      </ReduxProvider>,
    );
    expect(getAllByTestId('teaser-puzzle-badge')).not.toBeNull();
  });

  test('Should render teasers w/o badges (puzzle subscription)', () => {
    const { queryByTestId } = render(
      <ReduxProvider initialState={states['subscribed-puzzles']}>
        <HelmetProvider>
          <Component />
        </HelmetProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('teaser-puzzle-badge')).toBeNull();
    expect(queryByTestId('teaser-puzzle-disabled')).toBeNull();
  });
});
