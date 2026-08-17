import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { fireEvent, render } from '@testing-library/react';
import componentFactory from '../factory';
import { windowInitialState } from '../../../../../../shared/reducers/window';

let factoryOptions;
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  factoryOptions = {
    StyleguideComponents: () => (
      <>
        <div data-testid="default-item" className="component-Webform">
          Styleguide Components
        </div>
        <div data-testid="default-item" className="component-EntityQueue">
          Styleguide Components
        </div>
      </>
    ),
    title: 'Styleguide',
    styles: {
      Wrapper: 'wrapper-classname',
      Title: 'title-classname',
      ContentWrapper: 'content-wrapper-classname',
    },
  };
  initialState = {
    window: windowInitialState,
  };
  Component = componentFactory(factoryOptions);
});

describe('[Component] Styleguide - Default', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const store = createStore((state) => state, initialState);
    const { queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component />
      </Provider>,
    );
    expect(queryByTestId('styleguide-default-wrapper')).not.toBeNull();
  });

  it('Should filter items correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const store = createStore((state) => state, initialState);
    const { queryByTestId, queryAllByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component />
      </Provider>,
    );

    const searchField = queryByTestId('search-field');
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.change(searchField, { target: { value: 'Webform' } });
    expect(queryAllByTestId('default-item').length).toEqual(2);
  });
});
