import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import { settingsInitialState } from '../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockKeyword from './mockData.json';

const location = {
  action: 'POP',
  hash: '',
  key: null,
  pathname: '/dossier/royals',
  query: {},
  search: '',
};
const page = 1;

// @ts-ignore
routeInitialState.locationBeforeTransitions = {};

describe('[Screen] Keyword', () => {
  test('Should render keyword screen', () => {
    const { queryByTestId } = render(
      <ReduxProvider state={routeInitialState}>
        <HelmetProvider>
          <Component
            keyword={mockKeyword}
            location={location}
            page={page}
            settingsState={settingsInitialState}
          />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('keyword-container')).not.toBeNull();
  });
});
