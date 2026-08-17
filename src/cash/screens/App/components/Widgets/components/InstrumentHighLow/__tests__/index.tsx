import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import InstrumentHighLow from '../index';

const mockUseWidgetParagraphQuery = jest.fn();

jest.mock('../../../helpers', () => ({
  getSearchParams: jest.fn(() => ({})),
  useWidgetParagraphQuery: (...args: unknown[]) =>
    mockUseWidgetParagraphQuery(...args),
}));

jest.mock('../components/ChunkProgressBar');

const widgetParagraph = { link: { path: '/?listingKey=1-2-3' } } as any;

const baseInstrument = {
  cash52wLow: '70',
  cash52wHigh: '130',
  lval: '100',
  low: '90',
  high: '110',
  prevYearLow: '80',
  prevYearHigh: '120',
  yLo: '85',
  yHi: '115',
};

const lastYear = (new Date().getFullYear() - 1).toString();
const currentYear = new Date().getFullYear().toString();

describe('[Component] InstrumentHighLow', () => {
  beforeEach(() => {
    mockUseWidgetParagraphQuery.mockReset();
  });

  it('should render progress bar when both low and high are not present', () => {
    mockUseWidgetParagraphQuery.mockReturnValue({
      loading: false,
      error: undefined,
      instrument: {
        ...baseInstrument,
        high: null,
        low: null,
        cash52wHigh: null,
      },
    });

    render(<InstrumentHighLow widgetParagraph={widgetParagraph} />);

    expect(screen.getByTestId('mocked-progress-bar')).toHaveAttribute(
      'data-max',
      baseInstrument.lval,
    );
  });

  it('renders all tabs when both low and high bound are present', () => {
    mockUseWidgetParagraphQuery.mockReturnValue({
      loading: false,
      error: undefined,
      instrument: baseInstrument,
    });

    render(<InstrumentHighLow widgetParagraph={widgetParagraph} />);

    expect(screen.getByRole('button', { name: '1D' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '52W' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: lastYear })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: currentYear }),
    ).toBeInTheDocument();
  });

  it.each([
    { name: '1D', overrides: { low: null, high: null }, absentTab: '1D' },
    {
      name: '52W',
      overrides: { cash52wLow: null, cash52wHigh: null },
      absentTab: '52W',
    },
    {
      name: 'last year',
      overrides: { prevYearLow: null, prevYearHigh: null },
      absentTab: lastYear,
    },
    {
      name: 'current year',
      overrides: { yLo: null, yHi: null },
      absentTab: currentYear,
    },
  ])(
    'does not render the $name tab when required data is missing',
    ({ overrides, absentTab }) => {
      mockUseWidgetParagraphQuery.mockReturnValue({
        loading: false,
        error: undefined,
        instrument: { ...baseInstrument, ...overrides },
      });

      render(<InstrumentHighLow widgetParagraph={widgetParagraph} />);

      expect(
        screen.queryByRole('button', { name: absentTab }),
      ).not.toBeInTheDocument();
    },
  );

  it.each([
    {
      name: '1D',
      overrides: { high: null },
      tabToClick: null as string | null,
    },
    { name: '52W', overrides: { cash52wHigh: null }, tabToClick: '52W' },
    {
      name: 'last year',
      overrides: { prevYearHigh: null },
      tabToClick: lastYear,
    },
    {
      name: 'current year',
      overrides: { yHi: null },
      tabToClick: currentYear,
    },
  ])(
    'uses lval as max for $name when the high bound is null',
    ({ overrides, tabToClick }) => {
      mockUseWidgetParagraphQuery.mockReturnValue({
        loading: false,
        error: undefined,
        instrument: { ...baseInstrument, ...overrides },
      });

      render(<InstrumentHighLow widgetParagraph={widgetParagraph} />);

      if (tabToClick) {
        fireEvent.click(screen.getByRole('button', { name: tabToClick }));
      }
    },
  );
});
