import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import Component from '../index';

const initialState = {};

describe('[Component] Empty Result', () => {
  it('Should render correctly', () => {
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        <Component />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
