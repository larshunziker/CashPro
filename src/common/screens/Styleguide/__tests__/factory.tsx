import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import componentFactory from '../factory';
import SSRContextProvider from '../../../components/SSRContext';

let factoryOptions;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;

beforeEach(() => {
  factoryOptions = {
    StyleguideComponents: () => <div>Styleguide Components</div>,
    StatusPage: () => <div>Statuspage</div>,
    title: 'Styleguide',
    breadcrumbs: <div>breadcrumbs</div>,
    styles: {
      Wrapper: 'wrapper-classname',
      Title: 'title-classname',
      ContentWrapper: 'content-wrapper-classname',
    },
  };
  initialState = {
    window: {
      viewport: {
        label: 'viewport/xl',
      },
    },
  };
  Component = componentFactory(factoryOptions);
});

describe('[Screen] Styleguide', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const store = createStore((state) => state, initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        <SSRContextProvider>
          <HelmetProvider>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
            <Component />
          </HelmetProvider>
        </SSRContextProvider>
      </Provider>,
    );
    expect(queryByTestId('styleguide-wrapper')).not.toBeNull();
  });
});
