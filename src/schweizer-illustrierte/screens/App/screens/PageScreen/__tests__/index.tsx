import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import { settingsInitialState } from '../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockPageScreen from './mockData.json';

jest.mock('../../../components/Paragraphs');
jest.mock('../../../components/Breadcrumbs');
jest.mock('../../../components/EditButtons');

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialProps = {
    settingsState: settingsInitialState,
    pageScreen: JSON.parse(JSON.stringify(mockPageScreen)),
    location: {
      pathname: '/test',
    },
  };

  initialState = {
    route: routeInitialState,
  };
});

describe('[Screen] PageScreen', () => {
  it('Should render nothing', () => {
    initialProps = {
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      ...initialProps,
      pageScreen: {},
    };

    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('page-container')).not.toBeNull();
    //@ts-ignore
    expect(queryByTestId('page-container')).toHaveTextContent('');
  });

  test('Should render page screen', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('page-container')).not.toBeNull();
    expect(queryByTestId('page-head-container')).not.toBeNull();
  });
});
