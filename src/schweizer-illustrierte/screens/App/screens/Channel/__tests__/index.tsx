import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render, waitFor } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import { settingsInitialState } from '../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import MockedProvider from '../../../../../../shared/tests/components/MockedProvider';
import mockChannel from './mockData.json';

jest.mock('../../../components/Breadcrumbs');
jest.mock('../../../components/EditButtons');
jest.mock('../../../components/OverviewPage');
jest.mock('../../../components/PartnerBanner');

const location = {
  action: 'POP',
  hash: '',
  key: null,
  pathname: '/dossier/royals',
  query: {},
  search: '',
};
const page = 1;

beforeEach(() => {
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.__GRAPHQL_HOST__ = 'https://api.preview.si.com/';
});

describe('[Screen] Channel', () => {
  test('Should not render channel screen', async () => {
    const { queryByTestId } = render(
      <MockedProvider>
        <ReduxProvider state={routeInitialState}>
          <HelmetProvider>
            <Component
              channel={null}
              location={location}
              page={page}
              settingsState={settingsInitialState}
            />
          </HelmetProvider>
        </ReduxProvider>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(queryByTestId('channel-container')).toBeNull();
      expect(queryByTestId('channel-partnerbanner-wrapper')).toBeNull();
      expect(queryByTestId('channel-breadcrumb-wrapper')).toBeNull();
    });
  });

  test('Should render channel screen correctly', () => {
    const { queryByTestId } = render(
      <ReduxProvider state={routeInitialState}>
        <HelmetProvider>
          <Component
            channel={mockChannel}
            location={location}
            page={page}
            settingsState={settingsInitialState}
          />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('channel-container')).not.toBeNull();
    expect(queryByTestId('channel-partnerbanner-wrapper')).not.toBeNull();
    expect(queryByTestId('channel-breadcrumb-wrapper')).not.toBeNull();
  });
});
