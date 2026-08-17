import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import adZoneFactory from '../factory';

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
const initialState = {
  route: {
    screenReady: true,
    vertical: 'vertical/home',
    pathname: '/',
    locationBeforeTransitions: { pathname: '/camindada' },
  },
};

const AppNexus = jest.fn((props) => (
  <div data-testid="appnexus-wrapper">{JSON.stringify(props, null, 2)}</div>
));

const factoryOptions = {
  AppNexus,
  styles: {
    Wrapper: 'WrapperClassName',
    InnerWrapper: 'InnerWrapperClassName',
  },
};

Component = adZoneFactory(factoryOptions);

describe('[Common] AdZone', () => {
  it('Should render correctly', () => {
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
