import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import mockData from './mockData.json';

const locationState = {
  locationBeforeTransitions: {
    pathname: '/',
    search: '',
    hash: '',
    action: 'POP',
    key: null,
    query: {},
  },
  vertical: 'vertical/home',
  screenReady: false,
};

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
const initialState = { route: locationState };
let initialProps = { sectionParagraphs: [], currentIndex: 0 };
const componentFactoryOptions = {
  /* @ts-ignore TODO: TS7031 ->  Binding element 'path' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
  Link: ({ path, children }) => <a href={path}>{children}</a>,
  styles: {
    Wrapper: 'WrapperClassName',
    WrapperRight: 'WrapperRightClassName',
    Title: 'TitleClassName',
    ItemWrapper: 'ItemWrapperClassName',
    ItemWrapperIsActive: 'ItemWrapperIsActiveClassName',
    Link: 'LinkClassName',
    LinkIsActive: 'LinkIsActiveClassName',
    ItemTitle: 'ItemTitleClassName',
    ItemText: 'ItemTextClassName',
    ItemTitleIsActive: 'ItemTitleIsActiveClassName',
    ItemTextIsActive: 'ItemTextIsActiveClassName',
    SectionPagerItem: 'SectionPagerItemClassName',
  },
};

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps = {
    ...JSON.parse(JSON.stringify(mockData)),
  };
});

describe('[Component] SectionPager', () => {
  test('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render nothing if there are no sectionParagrphs', () => {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'never[]'. */
    initialProps.sectionParagraphs = null;
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly and match the snapshot', () => {
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </Provider>
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with the current active link', () => {
    initialProps.currentIndex = 2;
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </Provider>
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
