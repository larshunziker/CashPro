import React from 'react';
import { cleanup } from '@testing-library/react';
import Component from '../index';
import { render } from '../../../../../../../shared/customRenderer';
import MockedProvider from '../../../../../../../../shared/tests/components/MockedProvider';
import mockData from './mockData.json';
import { PUBLICATION_BIL } from '../../../../../../../../shared/constants/publications';
import {
  LANDING_PAGE_BILANZ_HOME,
  LANDING_PAGE_SV_HOME,
} from '../../../constants';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = {
    landingPage: JSON.parse(JSON.stringify(mockData)),
    page: 1,

    location: {
      pathname: LANDING_PAGE_SV_HOME,
    },
    windowState: {
      height: 720,
      imageBreakpoint: { label: '960', from: 960, to: 1679 },
      scrollTop: 0,
      viewport: { label: 'viewport/md', from: 960, to: 1199 },
      width: 1051,
    },
  };
});
afterEach(cleanup);

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const mockedComponent = (props) => (
  <MockedProvider>
    <Component {...props} />
  </MockedProvider>
);

describe('[Screen] LandingPageOtherPublications', () => {
  it('Should render nothing when no data is given ', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.landingPage = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(mockedComponent(initialProps));
    expect(queryByTestId('notfound-wrapper')).not.toBeNull();
  });

  it('Should render SV Home correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container, queryByTestId } = render(mockedComponent(initialProps));
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.location.pathname = LANDING_PAGE_SV_HOME;
    // @ts-ignore
    expect(container.firstChild.classList).toContain(
      'landing-page-schweizer-versicherung',
    );

    expect(queryByTestId('landing-page-sponsor-banner-wrapper')).not.toBeNull();
    expect(queryByTestId('page-content-wrapper')).not.toBeNull();
    expect(queryByTestId('grid-wrapper')).not.toBeNull();
    expect(queryByTestId('teaser-grid-title-wrapper')).not.toBeNull();
    expect(queryByTestId('teaser-grid-title-wrapper')).toMatchSnapshot();

    expect(queryByTestId('notfound-wrapper')).toBeNull();
    expect(queryByTestId('overview-page-header-wrapper')).toBeNull();
  });

  it('Should render Other SV LandingPages correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.location.pathname = '/insurance/asda/asda';
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container, queryByTestId } = render(mockedComponent(initialProps));

    // @ts-ignore
    expect(container.firstChild.classList).toContain(
      'landing-page-schweizer-versicherung',
    );

    expect(queryByTestId('overview-page-header-wrapper')).not.toBeNull();
    expect(queryByTestId('landing-page-sponsor-banner-wrapper')).not.toBeNull();
    expect(queryByTestId('page-content-wrapper')).not.toBeNull();
    expect(queryByTestId('grid-wrapper')).not.toBeNull();

    expect(queryByTestId('notfound-wrapper')).toBeNull();
    expect(queryByTestId('teaser-grid-title-wrapper')).toBeNull();
  });

  it('Should render LandingPages with incomplete data correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.location.pathname = '/insurance/asda/asda';
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.landingPage = JSON.parse(JSON.stringify(mockData));
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.landingPage.grid = null;

    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container, queryByTestId } = render(mockedComponent(initialProps));

    // @ts-ignore
    expect(container.firstChild.classList).toContain(
      'landing-page-schweizer-versicherung',
    );

    expect(queryByTestId('overview-page-header-wrapper')).not.toBeNull();
    expect(queryByTestId('page-content-wrapper')).not.toBeNull();

    expect(queryByTestId('grid-wrapper')).toBeNull();
    expect(queryByTestId('notfound-wrapper')).toBeNull();
    expect(queryByTestId('teaser-grid-title-wrapper')).toBeNull();
  });

  it('Should render BILANZ Home correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.location.pathname = LANDING_PAGE_BILANZ_HOME;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.landingPage = JSON.parse(JSON.stringify(mockData));
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.landingPage.publication = PUBLICATION_BIL;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.landingPage.grid = mockData.grid;

    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container, queryByTestId } = render(mockedComponent(initialProps));

    // @ts-ignore
    expect(container.firstChild.classList).toContain('landing-page-bilanz');

    expect(queryByTestId('landing-page-sponsor-banner-wrapper')).not.toBeNull();
    expect(queryByTestId('page-content-wrapper')).not.toBeNull();
    expect(queryByTestId('grid-wrapper')).not.toBeNull();

    expect(queryByTestId('teaser-grid-title-wrapper')).toBeNull();
    expect(queryByTestId('overview-page-header-wrapper')).toBeNull();
  });

  it('Should render Other BILANZ LandingPages correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.location.pathname = '/bilanz/some-landingpage';
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.landingPage = JSON.parse(JSON.stringify(mockData));
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.landingPage.publication = PUBLICATION_BIL;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.landingPage.grid = mockData.grid;

    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container, queryByTestId } = render(mockedComponent(initialProps));

    // @ts-ignore
    expect(container.firstChild.classList).toContain('landing-page-bilanz');

    expect(queryByTestId('page-content-wrapper')).not.toBeNull();
    expect(queryByTestId('grid-wrapper')).not.toBeNull();
    expect(queryByTestId('overview-page-header-wrapper')).not.toBeNull();
    expect(queryByTestId('landing-page-sponsor-banner-wrapper')).not.toBeNull();

    expect(queryByTestId('teaser-grid-title-wrapper')).toBeNull();
  });

  it('Should not render sponsor banner if no sponsor given', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.landingPage = JSON.parse(JSON.stringify(mockData));
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.landingPage.sponsor = null;

    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(mockedComponent(initialProps));

    expect(queryByTestId('landing-page-sponsor-banner-wrapper')).toBeNull();
  });
});
