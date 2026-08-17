import React from 'react';
import { render } from '@testing-library/react';
import Component, { formatValue } from '../index';
import mockData from './mockData.json';
import { AlertListData } from '../../../../Alerts/typings';
import { ExtendedInstrument } from '../typings';

jest.mock('react-router', () => {
  return {
    useNavigationType: jest.fn(() => 'PUSH'),
    useInRouterContext: jest.fn(() => true),
    useMatch: jest.fn(() => true),
    useParams: jest.fn(() => ({
      query: 'test',
    })),
    useNavigate: jest.fn(() => jest.fn()),
    useLocation: jest.fn(() => {
      return {
        pathname: '/suche/*',
        search: '',
      };
    }),
  };
});

jest.mock('../../headerMapping');
jest.mock('../../../../InstrumentDropdown');

const initialProps: any = {
  instrument: mockData.instrument,
  activeIndex: 1,
  data: mockData.data,
  index: 1,
  toggleActions: jest.fn(),
  tableFieldHeaders: ['mName', 'lastToggleItem'],
  type: 'portfolio',
  location: {},
};

describe('[Component] TableRow', () => {
  it('Should render TableRow with type "portfolio" ', async () => {
    // @ts-ignore
    const { container } = render(<Component {...initialProps}></Component>);

    expect(container).toMatchSnapshot();
  });

  it('Should render with TableRow with type "watchlist" ', async () => {
    initialProps.type = 'watchlist';

    // @ts-ignore
    const { container } = render(<Component {...initialProps}></Component>);

    expect(container).toMatchSnapshot();
  });
});

describe('[Function] formatValue', () => {
  test.each([
    {
      input: {
        headerKey: 'mName',
        settings: {},
        instrument: initialProps.instrument as ExtendedInstrument,
        data: initialProps.data as Portfolio & Watchlist & AlertListData,
        navigate: () => null,
        rowType: 'portfolio',
        fallBackValue: 'bbbb',
      },
      expected: 'ams-OSRAM I',
    },
    {
      input: {
        headerKey: 'lval',
        settings: {},
        instrument: initialProps.instrument as ExtendedInstrument,
        data: initialProps.data as Portfolio & Watchlist & AlertListData,
        navigate: () => null,
        rowType: 'portfolio',
        fallBackValue: 'bbbb',
      },
      expected: '6.836',
    },
    {
      input: {
        headerKey: 'lastDividend',
        settings: {},
        instrument: initialProps.instrument as ExtendedInstrument,
        data: initialProps.data as Portfolio & Watchlist & AlertListData,
        navigate: () => null,
        rowType: 'portfolio',
        fallBackValue: 'bbbb',
      },
      expected: 'bbbb',
    },
    {
      input: {
        headerKey: 'lastDividend',
        settings: { formatter: () => 'xxxx' },
        instrument: initialProps.instrument as ExtendedInstrument,
        data: initialProps.data as Portfolio & Watchlist & AlertListData,
        navigate: () => null,
        rowType: 'portfolio',
        fallBackValue: 'bbbb',
      },
      expected: 'xxxx',
    },
    {
      input: {
        headerKey: 'lastDividend',
        settings: { formatter: () => 'NaN' },
        instrument: initialProps.instrument as ExtendedInstrument,
        data: initialProps.data as Portfolio & Watchlist & AlertListData,
        navigate: () => null,
        rowType: 'portfolio',
        fallBackValue: 'bbbb',
      },
      expected: 'bbbb',
    },
    {
      input: {
        headerKey: 'paidPrice',
        settings: { formatter: () => 'undefined' },
        instrument: initialProps.instrument as ExtendedInstrument,
        data: initialProps.data as Portfolio & Watchlist & AlertListData,
        navigate: () => null,
        rowType: 'portfolio',
        fallBackValue: 'bbbb',
      },
      expected: 'bbbb',
    },
  ])('Should return formatted text', ({ input, expected }) => {
    const value = formatValue(
      input.headerKey,
      input.settings,
      input.instrument,
      input.data,
      input.navigate,
      input.rowType,
      input.fallBackValue,
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'Partial<RaschRouterLocation>'. */
      null,
      0,
    );
    expect(value).toBe(expected);
  });
});
