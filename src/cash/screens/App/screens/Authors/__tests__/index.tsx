import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render, waitFor } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import Component from '..';
import SSRContextProvider from '../../../../../../common/components/SSRContext';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import { webSiteSchemaForOrganisation } from '../../../../../shared/tests/schemaData';
import mockData from './mockData.json';
import { ROUTE_AUTHORS } from '../../../constants';

let initialProps;
let initialState;

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'mockedData' implicitly has an 'any' type. */
const mockedComponent = (mockedData, loading = false) => {
  initialState = {
    route: {
      ...routeInitialState,
      locationBeforeTransitions: {
        ...routeInitialState.locationBeforeTransitions,
        pathname: ROUTE_AUTHORS,
      },
    },
    loading: loading,
  };

  initialProps = {
    data: mockedData.data,
  };

  return (
    <ReduxProvider state={initialState}>
      <SSRContextProvider>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </SSRContextProvider>
    </ReduxProvider>
  );
};

beforeEach(() => {
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.locationOrigin = 'https://www.cash.ch';
});

test('should render website schema on the Authors page', async () => {
  render(mockedComponent(mockData));
  await waitFor(() => {
    const scriptTag = document.head.querySelector(
      'script[type="application/ld+json"]',
    );

    expect(scriptTag).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    const schemaData = JSON.parse(scriptTag.innerHTML);
    expect(schemaData['@graph']).toEqual(
      expect.arrayContaining([
        expect.objectContaining(webSiteSchemaForOrganisation),
      ]),
    );
  });
});
