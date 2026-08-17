import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import { authInitialState } from '../../../../shared/reducers/auth';
import { PIANO_ACCOUNT_ROOT_ID } from './../contants';

const initialState = { auth: authInitialState };

beforeEach(() => {
  initialState.auth = authInitialState;
});

const componentFactoryOptions = {
  styles: {
    AccountPanel: 'AccountPanelClassName',
    AccountWrapper: 'AccountWrapperClassName',
    Background: 'BackgroundClassName',
    Title: 'TitleClassName',
    Wrapper: 'WrapperClassName',
  },
  Helmet: () => null,
  title: 'mock-account-title',
};

const Component = componentFactory(componentFactoryOptions);

describe('[Common] Account screen', () => {
  it('Should render anything', () => {
    const store = createStore((state) => state, initialState);
    const { queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore */}
        <Component location={{ pathname: '/' }} />
      </Provider>,
    );

    const background = queryByTestId('background');
    const wrapper = queryByTestId('wrapper');
    const accountWrapper = queryByTestId('account-wrapper');
    const accountPanel = queryByTestId('account-panel');
    const title = queryByTestId('title');
    const pianoRoot = queryByTestId('piano-root');

    expect(background).not.toBeNull();
    // @ts-ignore
    expect(background).toHaveClass(componentFactoryOptions.styles.Background);

    expect(wrapper).not.toBeNull();
    // @ts-ignore
    expect(wrapper).toHaveClass(componentFactoryOptions.styles.Wrapper);

    expect(accountWrapper).not.toBeNull();
    // @ts-ignore
    expect(accountWrapper).toHaveClass(
      componentFactoryOptions.styles.AccountWrapper,
    );

    expect(accountPanel).not.toBeNull();
    // @ts-ignore
    expect(accountPanel).toHaveClass(
      componentFactoryOptions.styles.AccountPanel,
    );

    expect(title).not.toBeNull();
    // @ts-ignore
    expect(title).toHaveClass(componentFactoryOptions.styles.Title);
    // @ts-ignore
    expect(title).toHaveTextContent(componentFactoryOptions.title);

    expect(pianoRoot).not.toBeNull();
    // @ts-ignore
    expect(pianoRoot).toHaveAttribute('id', PIANO_ACCOUNT_ROOT_ID);

    expect(queryByTestId('helmet-wrapper')).not.toBeNull();
  });
});
