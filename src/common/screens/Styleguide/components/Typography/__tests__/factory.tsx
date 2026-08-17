import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { fireEvent, render } from '@testing-library/react';
import componentFactory from '../factory';
import { windowInitialState } from '../../../../../../shared/reducers/window';
import mockData from './mockData.json';
import SSRContextProvider from '../../../../../components/SSRContext';

let factoryOptions;
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  factoryOptions = {
    typography: JSON.parse(JSON.stringify(mockData)),
    styles: {
      Wrapper: 'wrapper-classname',
      Title: 'title-classname',
      /* @ts-ignore TODO: TS2345 ->  Argument of type '{ typography */
      ContentWrapper: 'content-wrapper-classname',
    },
  };
  initialState = {
    window: windowInitialState,
  };
  Component = componentFactory(factoryOptions);
});

describe('[Component] Styleguide - Typography', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const store = createStore((state) => state, initialState);
    const { queryByTestId, queryAllByTestId } = render(
      <Provider store={store}>
        <SSRContextProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          <Component />
        </SSRContextProvider>
      </Provider>,
    );
    expect(queryByTestId('styleguide-typography-wrapper')).not.toBeNull();
    expect(queryAllByTestId('typography-item').length).toEqual(133);
  });

  it('Should filter typography items correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const store = createStore((state) => state, initialState);
    const { queryByTestId, queryAllByTestId } = render(
      <Provider store={store}>
        <SSRContextProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          <Component />
        </SSRContextProvider>
      </Provider>,
    );

    expect(queryAllByTestId('typography-item').length).toEqual(133);
    const searchField = queryByTestId('search-field');
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.change(searchField, { target: { value: 'Header' } });
    expect(queryAllByTestId('typography-item').length).toEqual(3);
  });
});
