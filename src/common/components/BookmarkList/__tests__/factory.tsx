import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Store, createStore } from 'redux';
import { render } from '@testing-library/react';
import bookmarkListFactory from '../factory';
import { authInitialState } from '../../../../shared/reducers/auth';
import { windowInitialState } from '../../../../shared/reducers/window';
import { ensureBookmarkListInterface } from '../helper';
import mockData from './mockData.json';
import { BookmarkListFactoryOptions, BookmarkListProps } from '../typings';

let initialState: Record<string, any> = {};
let initialProps: BookmarkListProps = {
  ...JSON.parse(JSON.stringify(mockData)),
};
/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Function'. */
let Component: React.ComponentType<any> = null;
const factoryOptions: BookmarkListFactoryOptions = {
  styles: {
    BookmarkListWrapper: 'BookmarkListWrapperClassName',
  },
  /* @ts-ignore TODO: TS2322 ->  Type '() => null' is not assignable to type 'getDynamicGridOptionsType'. */
  getDynamicGridOptions: () => null,
  teaserType: 'teaser-type',
  itemsPerRow: 4,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'items' implicitly has an 'any' type. */
  TeaserGrid: ({ items }) => (
    <div data-testid="bookmark-list-factory-teasergrid">
      {/* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */}
      {/* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */}
      {items.map(({ node }, index) => (
        <div key={index} data-testid="bookmark-list-factory-teaser-item">
          {node.title}
        </div>
      ))}
    </div>
  ),
};

beforeEach(() => {
  initialProps = {
    ...initialProps,
    ...JSON.parse(JSON.stringify(mockData)),
  };

  initialState = {
    auth: authInitialState,
    window: windowInitialState,
  };

  Component = bookmarkListFactory(factoryOptions);
});

describe('[Common] BookmarkList', () => {
  it('Should render nothing if there are no items', () => {
    const store: Store = createStore((state) => state, initialState);

    const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Component items={ensureBookmarkListInterface([])} />
        </Provider>
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly', () => {
    const store: Store = createStore((state) => state, initialState);

    const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Component items={ensureBookmarkListInterface(initialProps.items)} />
        </Provider>
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
