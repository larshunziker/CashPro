import React from 'react';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import { routeInitialState } from '../../../../cash/shared/reducers/route';
import { authInitialState } from '../../../../shared/reducers/auth';
import ReduxProvider from '../../../../cash/shared/tests/components/ReduxProvider';

let initialProps = {};
let initialState = {};

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
beforeEach(() => {
  initialProps = {
    ...initialProps,
  };

  initialState = {
    route: routeInitialState,
    auth: authInitialState,
  };
  Component = componentFactory({ ClientSideESI: null, EsiSkeleton: null });
});

describe('[Component] ComponentName', () => {
  it('Should render esi:include on server', () => {
    // @ts-ignore
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component esiSrc="http://example.com" />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('Should render esi:include on server', () => {
    // @ts-ignore
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component esiSrc="http://example.com" />
      </ReduxProvider>,
    );

    expect(container.innerHTML).toMatchSnapshot();
  });
});
