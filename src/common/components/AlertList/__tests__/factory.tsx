import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import alertListFactory from '../factory';
import { ensureAlertListInterface, getName } from '../helper';
import mockData from './mockData.json';
import { AlertListProps } from '../typings';

let initialProps: AlertListProps = {
  items: [],
  isLongRead: false,
};
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
const factoryOptions = {
  styles: {
    AlertListWrapper: 'AlertListWrapperClassName',
    AlertListInner: 'AlertListInnerClassName',
    AlertListItem: 'AlertListItemClassName',
  },
  /* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'url' implicitly has an 'any' type. */
  AlertItem: ({ children, label, url }) => (
    <div data-testid="alert-item-mock">
      <div data-url={url}>{label}</div>
      {children}
    </div>
  ),
  /* @ts-ignore TODO: TS7031 ->  Binding element 'id' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'type' implicitly has an 'any' type. */
  SubscribeButton: ({ id, type }) => (
    <div data-testid={`subscribe-button-mock ${id} ${type}`} />
  ),
  /* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
  ExpansionPanel: ({ children }) => (
    <div data-testid="expansionpanel-mock">{children}</div>
  ),
};

const initialState = {
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

const store = createStore((state) => state, initialState);

beforeEach(() => {
  initialProps = {
    ...initialProps,
    ...JSON.parse(JSON.stringify(mockData)),
  };
  // @ts-ignore
  Component = alertListFactory(factoryOptions);
});

describe('[Common] AlertList', () => {
  it('Should render nothing if there are no items', () => {
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component items={ensureAlertListInterface([])} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component items={ensureAlertListInterface(initialProps.items)} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly and display max 2 items', () => {
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component
          items={ensureAlertListInterface(initialProps.items)}
          maxItemDisplayCount={2}
        />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  test.each`
    firstName  | lastName    | resultName
    ${'Peter'} | ${'Tester'} | ${'Peter Tester'}
    ${'Peter'} | ${''}       | ${'Peter'}
    ${''}      | ${'Mayr'}   | ${'Mayr'}
    ${''}      | ${''}       | ${' '}
  `(
    'Should render name of $firstName $lastName properly',
    ({ firstName, lastName, resultName }) => {
      const name = getName({ firstName, lastName });
      expect(name).toBe(resultName);
    },
  );
});
