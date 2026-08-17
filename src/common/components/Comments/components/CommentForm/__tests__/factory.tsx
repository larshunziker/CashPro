import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import { authInitialState } from '../../../../../../shared/reducers/auth';
import MockedProvider from '../../../../../../shared/tests/components/MockedProvider';
import mockData from './mockData.json';
import {
  CommentFormComponent,
  CommentFormFactoryOptions,
  CommentFormProps,
} from '../typings';

let initialProps: CommentFormProps = {
  articleId: '',
  gcid: '',
  type: '',
};
let initialState: Record<string, any> = {};
let Component: CommentFormComponent;

const componentFactoryOptions: CommentFormFactoryOptions = {
  InputField: () => <textarea />,
  CommentLoginForm: () => null,
  CommentSetUsernameForm: () => null,
  styles: {
    Button: 'Button',
    InputField: 'InputField',
    Label: 'Label',
    LabelAbove: 'LabelAbove',
    SuccessMessage: 'SuccessMessage',
  },
};

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps = JSON.parse(JSON.stringify(mockData));

  initialState = {
    auth: authInitialState,
  };
});

describe('[Component] CommentForm', () => {
  it('Should render CommentLoginForm if not authenticated', () => {
    initialState.auth.isAuthenticated = false;
    const store = createStore((state) => state, initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        <MockedProvider>
          <Component {...initialProps} />
        </MockedProvider>
      </Provider>,
    );

    expect(queryByTestId('commentform-loginform-wrapper')).not.toBeNull();
  });

  //@TODO: comment back in as soon as mocked username has been removed from commentForm file

  // it('Should render CommentSetUsernameForm if user is authenticated, but has no username', () => {
  //   initialState.auth.isAuthenticated = true;
  //   initialState.auth.username = null;

  //   const store = createStore((state) => state, initialState);

  //   const { queryByTestId } = render(
  //     <Provider store={store}>
  //       <MockedProvider>
  //         <Component {...initialProps} />
  //       </MockedProvider>
  //     </Provider>,
  //   );

  //   expect(queryByTestId('commentform-setusernameform-wrapper')).not.toBeNull();
  // });

  it('Should render Comment Textfield if user is autenticated and has a username', () => {
    initialState.auth.isAuthenticated = true;
    initialState.auth.username = 'peter';

    const store = createStore((state) => state, initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        <MockedProvider>
          <Component {...initialProps} />
        </MockedProvider>
      </Provider>,
    );

    expect(queryByTestId('commentform-comment-wrapper')).not.toBeNull();
  });
});
