import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import componentFactory from '../factory';
import { authInitialState } from '../../../../../../shared/reducers/auth';
import mockData from './mockData.json';
import {
  CommentingComponent,
  CommentingFactoryOptions,
  CommentingProps,
} from '../typings';

const Icon = () => null;
const CommentForm = () => null;

const componentFactoryOptions: CommentingFactoryOptions = {
  Icon,
  CommentForm,
  styles: {
    Icon: 'IconDefaultClass',
    IconChevronUpActive: 'IconChevronUpActiveDefaultClass',
    Logout: 'LogoutDefaultClass',
    Status: 'StatusDefaultClass',
    StatusWrapper: 'StatusWrapperDefaultClass',
    Title: 'TitleDefaultClass',
    Wrapper: 'WrapperDefaultClass',
  },
};

let Component: CommentingComponent;
let initialProps: CommentingProps = {
  articleId: '',
  gcid: '',
};
let initialState: Record<string, any> = {};

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps = JSON.parse(JSON.stringify(mockData));

  initialState = {
    auth: authInitialState,
  };
});

describe('[Component] Commenting', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    const store = createStore((state) => state, initialState);
    const { queryByTestId } = render(
      <Provider store={store}>
        <Component {...initialProps} />
      </Provider>,
    );

    expect(queryByTestId('commenting-wrapper')).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('commenting-wrapper').firstChild).toMatchSnapshot();
  });

  it('Should not render Logout button if user is not authenticated', () => {
    initialState.auth.isAuthenticated = false;
    const store = createStore((state) => state, initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        <Component {...initialProps} />
      </Provider>,
    );

    expect(queryByTestId('commenting-logoutbutton-wrapper')).toBeNull();
  });
});
