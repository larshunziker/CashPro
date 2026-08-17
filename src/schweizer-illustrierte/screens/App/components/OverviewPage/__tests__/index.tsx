import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import { settingsInitialState } from '../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

let location = {};
const initialState = {
  route: null,
};

beforeEach(() => {
  location = {
    action: 'POP',
    hash: '',
    key: null,
    pathname: '/dossier/royals',
    query: {
      page: 1,
    },
    search: '',
  };

  /* @ts-ignore TODO: TS2322 ->  Type 'LocationState' is not assignable to type 'null'. */
  initialState.route = routeInitialState;
});

describe('[Component] OverviewPage', () => {
  test('Should not render component if no routeObject has passed', () => {
    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          <Component location={location} settingsState={settingsInitialState} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('overviewpage-container')).toBeNull();
  });

  test('Should render component with hero teaser', () => {
    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          <Component
            location={location}
            routeObject={mockData}
            settingsState={settingsInitialState}
          />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('overviewpage-container')).not.toBeNull();
    expect(queryByTestId('overviewpage-heroteaser-container')).not.toBeNull();
  });

  test('Should render component without hero teaser', () => {
    mockData.settings.hasHeroTeaser = false;

    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          <Component
            location={location}
            routeObject={mockData}
            settingsState={settingsInitialState}
          />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('overviewpage-container')).not.toBeNull();
    expect(queryByTestId('overviewpage-heroteaser-container')).toBeNull();
  });
});
