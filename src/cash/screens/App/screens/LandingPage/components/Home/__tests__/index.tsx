import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

jest.mock('../../../../MyCash/components/Musterportfolio/MusterportfolioTable');

const initialProps = JSON.parse(JSON.stringify(mockData));
const initialState = {};

describe('[Screen] LandingPage', () => {
  it('Should render LandingPageHome with channelTitel Anlegen', () => {
    initialProps.landingPage.channel = { title: 'Anlegen' };
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render LandingPageHome without landingPage ', () => {
    initialProps.landingPage = null;
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
