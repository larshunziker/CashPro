import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';
// @ts-ignore
import mockData from './mockData.json';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';

let initialProps: any = {};
const initialState = {};

beforeEach(() => {
  initialProps = {
    portfolio: JSON.parse(JSON.stringify(mockData)),
    depotPrice: '25.00',
  };
});

describe('[Component] PortfolioSummary', () => {
  it('Should not render PortfolioSummary if portfolio prop is missing', async () => {
    // @ts-ignore
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Portfolio'. */}
        <Component portfolio={null} depotPrice={'25.00'}></Component>
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });
  it('Should render PortfolioSummary and rerender correctly after props changed', async () => {
    // @ts-ignore
    const { container, rerender } = render(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps}></Component>
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();

    initialProps.portfolio.currency = 'USD';
    initialProps.portfolio.calculatedFields.totalPaidPrice = 1000;
    initialProps.portfolio.calculatedFields.totalActualPrice = 999;
    initialProps.portfolio.calculatedFields.totalAccountPlusMinus = 888;
    initialProps.portfolio.calculatedFields.totalAccountPercent = 12;
    rerender(
      <ReduxProvider initialState={initialState}>
        <Component {...initialProps}></Component>
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
