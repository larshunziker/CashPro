import React from 'react';
import { render } from '@testing-library/react';
import { routeInitialState } from '../../../../../../../shared/reducers/route';
import { DEFAULT } from '../../../../../../../shared/actions/route';
import SSRContextProvider from '../../../../../../../../common/components/SSRContext';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import { PAGE_TYPE_MARKETING } from '../../../../../../../../shared/constants/content';

jest.mock('../../HeaderUserLogin');

/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialState = {
    route: routeInitialState,
  };
  initialProps = {
    subtypeValue: '',
  };
  initialState.route.vertical = DEFAULT;
});

describe('[Component] Header - HeaderInner', () => {
  it('Should render correctly', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider state={initialState}>
        <SSRContextProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('header-inner-wrapper')).not.toBeNull();
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('header-inner-wrapper').classList.contains('MarketingPage'),
    ).not.toBeTruthy();
  });

  it('Should render Header for MarketingPages correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.subtypeValue = PAGE_TYPE_MARKETING;
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider state={initialState}>
        <SSRContextProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </SSRContextProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('header-inner-wrapper')).not.toBeNull();
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('header-inner-wrapper').classList.contains('MarketingPage'),
    ).toBeTruthy();
  });
});
