import React from 'react';
import { render } from '@testing-library/react';
import headerFactory from '../factory';
import ReduxProvider from '../../../../cash/shared/tests/components/ReduxProvider';
import SSRContextProvider from '../../SSRContext';
import { HeaderFactoryOptions, HeaderProps } from '../typings';

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

let factoryOptions: HeaderFactoryOptions<any> = {
  HeaderInner: () => <div>HeaderInner Mock</div>,
  PartnerClaim: () => <div>PartnerClaim Mock</div>,
  observerConfigs: [{}, {}],
  placeholderId: '123',
  styles: {
    Wrapper: 'Wrapper',
    IsSticky: 'IsSticky',
    Header: 'Header',
    Placeholder: 'Placeholder',
  },
};

let initialState = {};
let initialProps: HeaderProps = {};

beforeEach(() => {
  factoryOptions = { ...factoryOptions };
  Component = headerFactory(factoryOptions);

  initialProps = {
    hasStickiness: true,
    subtypeValue: 'origin',
    publication: 'BEO',
    isHome: true,
    ...initialProps,
  };

  initialState = {
    ...initialState,
  };
});
describe('[Common] Header Factory', () => {
  it('Should return Component from Factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render sticky HeaderInner', () => {
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </SSRContextProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('header-inner-sticky-wrapper')).not.toBeNull();
    expect(queryByTestId('header-inner-wrapper')).toBeNull();
  });

  it('Should render non-sticky HeaderInner', () => {
    initialProps.hasStickiness = false;

    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('header-inner-wrapper')).not.toBeNull();
  });
});
