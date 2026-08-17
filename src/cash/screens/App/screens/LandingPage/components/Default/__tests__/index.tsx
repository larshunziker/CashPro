import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

jest.mock('../../../../MyCash/components/Musterportfolio/MusterportfolioTable');

const initialProps = { ...JSON.parse(JSON.stringify(mockData)), page: 1 };
const initialState = {};

describe('[Screen] LandingPage', () => {
  it('Should render LandingPageDefault with squareSponsorLogo', () => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render LandingPageDefault with channelTitel Anlegen', () => {
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

  it('Should render LandingPageDefault without landingPage ', () => {
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
