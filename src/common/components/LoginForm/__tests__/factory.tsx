/**
 * @file   Comment Login Form Test
 * @author Alexandra Geier <alexandra.geier@ringieraxelspringer.ch>
 * @author Andrea Reber <andrea.reber@ringieraxelspringer.ch>
 * @date   2019-05-24
 */

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
// @ts-ignore
import { authInitialState } from 'reducers/auth';
import componentFactory from '../factory';

const componentFactoryOptions = {
  styles: {
    Button: 'Button',
    Message: 'Message',
  },
};

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
let initialProps: any = {};
let initialState: any = {};

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps = {};
  initialState = {
    auth: authInitialState,
    piano: {
      pageMetadata: {
        publication: 'publication',
        isNativeContent: false,
        pathname: 'pathname',
        publicationDate: 'publicationDate',
        restrictionStatus: 'restrictionStatus',
        section: 'section',
        tags: ['string'],
        contentType: 'contentType',
        isPrintArticle: false,
        gcid: 'gcid',
      },
    },
  };
});

describe('[Component] LoginForm', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    initialProps.message = 'This is a test message';
    const store = createStore((state) => state, initialState);

    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render with default message', () => {
    const store = createStore((state) => state, initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    const loginForm = queryByTestId('loginform-message');

    expect(loginForm).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(loginForm.innerHTML).toBe('Bitte melden Sie sich an.');
  });
  it('Should render and contain text "Anmelden"', () => {
    const store = createStore((state) => state, initialState);

    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );

    expect(container.innerHTML).toContain('Anmelden');
  });
  it('Should render and contain text "Profil bearbeiten"', () => {
    initialState.auth.isAuthenticated = true;
    const store = createStore((state) => state, initialState);

    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );

    expect(container.innerHTML).toContain('Profil bearbeiten');
  });

  it('Should render correctly with button from factoryOptions', () => {
    const ComponentWithButton = componentFactory({
      ...componentFactoryOptions,
      Button: ({ clickHandler, text }) => (
        <button id="button-from-factory-options" onClick={clickHandler}>
          {text}
        </button>
      ),
    });
    const store = createStore((state) => state, initialState);
    initialState.auth.isAuthenticated = false;

    const { container, rerender } = render(
      <Provider store={store}>
        <ComponentWithButton {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();

    initialState.auth.isAuthenticated = true;
    const newStore = createStore((state) => state, initialState);

    rerender(
      <Provider store={newStore}>
        <ComponentWithButton {...initialProps} />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly even if a corrupt button from factoryOptions is provided', () => {
    const ComponentWithButton = componentFactory({
      ...componentFactoryOptions,
      /* @ts-ignore TODO: TS2322 ->  Type '() => null' is not assignable to type '({ clickHandler, text, } */
      Button: () => null,
    });
    const store = createStore((state) => state, initialState);
    initialState.auth.isAuthenticated = false;

    const { container } = render(
      <Provider store={store}>
        <ComponentWithButton {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
