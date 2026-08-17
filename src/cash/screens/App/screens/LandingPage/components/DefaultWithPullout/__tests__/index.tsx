import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render, screen } from '@testing-library/react';
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

    const logoClass = screen.getAllByAltText('logo')[0].className;

    expect(logoClass).toMatch(/SquareBanner/);
    expect(container).toMatchSnapshot();
  });

  it('Should render LandingPageDefault with landscapeSponsorLogo', () => {
    initialProps.landingPage.sponsor.teaserImage.format = 'landscape';
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    const logoClass = screen.getAllByAltText('logo')[0].className;

    expect(logoClass).toMatch(/LandscapeBanner/);
    expect(container).toMatchSnapshot();
  });

  it('Should render LandingPageDefault with portraitSponsorLogo', () => {
    initialProps.landingPage.sponsor.teaserImage.format = 'portrait';
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    const logoClass = screen.getAllByAltText('logo')[0].className;

    expect(logoClass).toMatch(/PortraitBanner/);
    expect(container).toMatchSnapshot();
  });

  it('Should render LandingPageDefault with defaultSponsorLogo', () => {
    initialProps.landingPage.sponsor.teaserImage.format = '';
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <HelmetProvider>
          <Component {...initialProps} />
        </HelmetProvider>
      </ReduxProvider>,
    );

    const logoClass = screen.getAllByAltText('logo')[0].className;

    expect(logoClass).not.toMatch(
      /(PortraitBanner|LandscapeBanner|SquareBanner)/,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render LandingPageDefault with channelTitel Anlegen', () => {
    initialProps.landingPage.channel = { title: 'Anlegen' };
    initialProps.landingPage.title = null;
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
