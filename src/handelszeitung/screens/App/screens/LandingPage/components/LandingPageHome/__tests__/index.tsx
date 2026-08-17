import React from 'react';
import { cleanup } from '@testing-library/react';
import Component from '../index';
import { render } from '../../../../../../../shared/customRenderer';
import MockedProvider from '../../../../../../../../shared/tests/components/MockedProvider';
import mockData from './mockData.json';
import { ROUTE_HOME_HZ } from '../../../../../../../../shared/constants/publications';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

jest.mock('Link');
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
  // 2016-11-24T09:03:38+01:00
  Date.now = jest.fn(() => 1479974618000);
});

afterAll(() => {
  // @ts-ignore
  console.error.mockRestore(); // eslint-disable-line

  // @ts-ignore
  Date.now = new Date();
});

beforeEach(() => {
  initialProps = {
    landingPage: JSON.parse(JSON.stringify(mockData)),
    page: 1,
    location: {
      pathname: `/${ROUTE_HOME_HZ}`,
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

describe('[Screen] LandingPageHome', () => {
  it('Should render nothing when no data is given ', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.landingPage = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(mockedComponent(initialProps));
    expect(container.innerHTML).toBe('');
  });

  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(mockedComponent(initialProps));
    expect(container).toMatchSnapshot();
  });
});
