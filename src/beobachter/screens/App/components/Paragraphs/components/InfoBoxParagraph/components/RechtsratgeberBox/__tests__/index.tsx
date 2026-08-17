import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Component from '../index';
import mockInfoBoxData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'mockData' implicitly has type 'any' in some locations where its type cannot be determined. */
let mockData;
const initialState = {
  window: {
    viewport: {
      label: 'viewport/xl',
    },
  },
  header: {
    noHeader: false,
  },
};

jest.mock('Link');
beforeEach(() => {
  mockData = JSON.parse(JSON.stringify(mockInfoBoxData));
});

describe('[Component] InfoBoxPargraph - RechtsratgeberBox', () => {
  it('Should render nothing', () => {
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        <Component infoBoxParagraph={{}} />
      </Provider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render correctly', () => {
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'mockData' implicitly has an 'any' type. */}
        <Component infoBoxParagraph={mockData} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
