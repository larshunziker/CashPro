// @TODO: The connection to the redux store does not work this way.
// The props mapped from the initialState will always be null in the factory.
// Therefore we can't test the submitted values.

import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import componentFactory, { SponsorImagePropsInner } from '../factory';
import { routeInitialState } from '../../../../beobachter/shared/reducers/route';
import ReduxProvider from '../../../../beobachter/shared/tests/components/ReduxProvider';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;
let Component: (props: SponsorImagePropsInner) => ReactElement;
const windowStateSelector = () => null;

const windowState = { viewport: { label: 'SAMPLE_VconstPORT_XL' } };

const componentFactoryOptions = {
  windowStateSelector,
  styles: {
    Wrapper: 'Wrapper',
    Image: 'Image',
  },
};

beforeEach(() => {
  /* @ts-ignore TODO: TS2322 ->  Type '({ sponsor, } */
  Component = componentFactory(componentFactoryOptions);
  initialProps = {
    sponsor: { ...mockData },
    windowState,
  };
  initialState = {
    route: routeInitialState,
    window: {
      height: 886,
      scrollTop: 0,
      viewport: {
        label: 'viewport/xl',
        from: 960,
        to: 1599,
      },
      width: 1038,
    },
  };
});

describe('[Common] SponsorImage', () => {
  it('Should not render factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.sponsor = null;

    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render factory correctly', () => {
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).not.toBeNull();
  });
});
