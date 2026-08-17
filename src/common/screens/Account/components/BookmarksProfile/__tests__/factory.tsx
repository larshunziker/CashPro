import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { cleanup, render } from '@testing-library/react';
// @ts-ignore
import { authInitialState } from 'reducers/auth';
// @ts-ignore
import { bookmarkListInitialState } from 'reducers/bookmarkList';
import BookmarksProfileFactory from '../factory';
import { BookmarksProfileFactoryOptions } from '../typings';

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
let initialState: any = {};

const factoryOptions: BookmarksProfileFactoryOptions = {
  styles: {
    BookmarksProfileWrapper: 'BookmarksProfileWrapperClassName',
    LoginWrapper: 'LoginWrapperClassName',
    Title: 'TitleClassName',
  },
  grid: {
    Container: 'containerClassName',
  },
  LoginForm: () => <form data-testid="login-form"></form>,
  NoBookmarks: () => <div data-testid="no-bookmarks">No bookmarks found</div>,
  LoadingSpinner: () => <div data-testid="loading">loading...</div>,
  BookmarkList: () => <ul data-testid="bookmarks-list">bookmarks list here</ul>,
  Helmet: () => null,
};

beforeEach(() => {
  Component = BookmarksProfileFactory(factoryOptions);
  initialState = {
    auth: authInitialState,
    bookmarkList: bookmarkListInitialState,
  };

  jest.clearAllMocks();
  cleanup();
});

describe('[Common] BookmarksProfile', () => {
  it('Should match snapshot and display the login form', async () => {
    initialState.auth.initialAuthRequest = true;
    const store = createStore((state) => state, initialState);

    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component location={{ pathname: '/' }} />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should match snapshot if isAuthenticated is true', async () => {
    initialState.auth.isAuthenticated = true;
    initialState.auth.initialAuthRequest = true;
    const store = createStore((state) => state, initialState);

    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component location={{ pathname: '/' }} />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
