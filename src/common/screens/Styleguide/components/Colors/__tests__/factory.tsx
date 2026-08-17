import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import { windowInitialState } from '../../../../../../shared/reducers/window';
import SSRContextProvider from '../../../../../components/SSRContext';

let factoryOptions;
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  factoryOptions = {
    /* @ts-ignore TODO: TS2345 ->  Argument of type '{ StyleguideComponents */
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
      ColorPreviewWrapper: 'ColorPreviewWrapper-classname',
      ColorItem: 'ColorItem-classname',
      Title: 'title-classname',
    },
    colors: ['red', 'blue'],
  };
  initialState = {
    window: windowInitialState,
  };

  Component = componentFactory(factoryOptions);
});

describe('[Component] Styleguide - Colors', () => {
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
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          <Component />
        </SSRContextProvider>
      </Provider>,
    );
    expect(queryByTestId('styleguide-default-wrapper')).not.toBeNull();
  });
});
