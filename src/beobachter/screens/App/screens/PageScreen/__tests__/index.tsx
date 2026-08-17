import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockPageScreen from './mockData.json';

jest.mock('../../../components/Paragraphs');
jest.mock('../../../components/Breadcrumbs');

let initialProps = {};
let initialState = {};

beforeEach(() => {
  initialProps = {
    pageScreen: JSON.parse(JSON.stringify(mockPageScreen)),
  };

  initialState = {
    route: routeInitialState,
  };
});

describe('[Screen] PageScreen', () => {
  it('Should render nothing', () => {
    initialProps = {
      pageScreen: {},
    };

    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('page-container')).not.toBeNull();
    expect(queryByTestId('page-container')).toHaveTextContent('');
  });

  test('Should render page screen without title and without lead', () => {
    // @ts-ignore
    initialProps.pageScreen.title = null;
    // @ts-ignore
    initialProps.pageScreen.lead = null;

    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('page-container')).not.toBeNull();
    expect(queryByTestId('head-container')).toBeNull();
    expect(queryByTestId('paragraphs-container')).not.toBeNull();
  });

  test('Should render page screen with title and without lead', () => {
    // @ts-ignore
    initialProps.pageScreen.lead = null;

    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('page-container')).not.toBeNull();
    expect(queryByTestId('head-container')).not.toBeNull();
    expect(queryByTestId('title-container')).not.toBeNull();
    expect(queryByTestId('lead-container')).toBeNull();
    expect(queryByTestId('paragraphs-container')).not.toBeNull();
  });

  test('Should render page screen with title and lead', () => {
    const { queryByTestId } = render(
      <ReduxProvider state={initialState}>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('page-container')).not.toBeNull();
    expect(queryByTestId('head-container')).not.toBeNull();
    expect(queryByTestId('title-container')).not.toBeNull();
    expect(queryByTestId('lead-container')).not.toBeNull();
    expect(queryByTestId('paragraphs-container')).not.toBeNull();
  });
});
