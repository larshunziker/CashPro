import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { Store, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import classNames from 'classnames';
import bookmarkButtonFactory from '../factory';
import { authInitialState } from '../../../../shared/reducers/auth';
import { bookmarkListInitialState } from '../../../../shared/reducers/bookmarkList';
import { BookmarkButtonFactoryOptions, BookmarkButtonProps } from '../typings';

let initialState: Record<string, any> = {};
let initialProps: BookmarkButtonProps = {
  id: '123',
  isBottom: false,
  subtypeValue: '',
};
/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Function'. */
let Component: React.ComponentType<any> = null;

const factoryOptions: BookmarkButtonFactoryOptions = {
  styles: {
    BookmarkButtonWrapper: 'BookmarkButtonWrapperClassName',
    Text: 'TextClassName',
    Icon: 'IconClassName',
    Animating: 'AnimatingClassName',
  },
  addToBookmarksText: 'Bookmark',
  removeFromBookmarksText: 'Unbookmark',
  bookmarkIconTypeInactive: 'IconBookmark',
  bookmarkIconTypeActive: 'IconBookmarkSolid',
  Icon: ({ children, addClass, type }) => (
    <i className={classNames(type, addClass)}>{children}</i>
  ),
  ToastService: {
    displayDefaultSuccessToast: jest.fn(),
    displayDefaultErrorToast: jest.fn(),
    displayAuthenticationErrorToast: jest.fn(),
    displayLimitExceededToast: jest.fn(),
    displayAuthenticationInfoToast: jest.fn(),
    displayRemoveSuccessToast: jest.fn(),
  },
};

beforeEach(() => {
  Component = bookmarkButtonFactory(factoryOptions);

  initialState = {
    auth: authInitialState,
    bookmarkList: bookmarkListInitialState,
  };

  initialProps = {
    id: '123',
    isBottom: false,
    subtypeValue: '',
  };
});

describe('[Common] BookmarkButton', () => {
  it('Should render correctly', () => {
    const store: Store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render fire authentication toast when not authenticated', async () => {
    initialState.auth.isAuthenticated = false;

    const spy = jest.spyOn(global.history, 'replaceState');

    const store: Store = createStore(
      (state) => state,
      initialState,
      applyMiddleware(thunk),
    );
    const { container, getByText } = render(
      <Provider store={store}>
        <Component {...initialProps} />
      </Provider>,
    );

    fireEvent.click(getByText('Bookmark'));

    expect(
      factoryOptions.ToastService.displayAuthenticationInfoToast,
    ).toHaveBeenCalledTimes(1);
    expect(container).toMatchSnapshot();

    spy.mockReset();
  });
});
