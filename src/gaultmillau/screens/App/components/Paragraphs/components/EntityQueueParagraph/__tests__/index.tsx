import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { IntlProvider } from 'react-intl';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

const initialState = {
  route: {
    vertical: 'vertical/home',
    pathname: '/',
    locationBeforeTransitions: { pathname: '/camindada' },
  },
};

jest.mock('../../../../TeaserGrid');
jest.mock('../../../../Pager');
jest.mock('../../../../Helmet');

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(mockData));
});

describe('[Components] Paragraphs - EntityQueueParagraph', () => {
  it('Should render correctly', () => {
    const store = createStore((state) => state, initialState);

    const { queryByTestId } = render(
      <ReduxProvider store={store}>
        <IntlProvider defaultLocale="de-CH" locale={'de'} key={'de'}>
          <HelmetProvider>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </HelmetProvider>
        </IntlProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('entity-queue-paragraph-wrapper')).not.toBeNull();
  });

  it('Should render nothing if there are no items ', () => {
    const store = createStore((state) => state, initialState);
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.entityQueue.entityQueue.items.edges = [];
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.entityQueue.entityQueue.items.count = 0;
    const { queryByTestId } = render(
      <ReduxProvider store={store}>
        <IntlProvider defaultLocale="de-CH" locale={'de'} key={'de'}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </IntlProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('entity-queue-paragraph-wrapper')).toBeNull();
  });
});
