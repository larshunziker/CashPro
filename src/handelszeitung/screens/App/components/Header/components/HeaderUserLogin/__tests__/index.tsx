import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { authInitialState } from '../../../../../../../../shared/reducers/auth';
import SSRContextProvider from '../../../../../../../../common/components/SSRContext';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../../HeaderUserLogin';

const mockLogin = jest.fn();
jest.mock('../../../../../../../../common/components/Auth0Provider', () => ({
  Auth0: class {
    /* @ts-ignore TODO: TS7006 ->  Parameter 'params' implicitly has an 'any' type. */
    static login(params) {
      mockLogin(params);
    }
  },
}));

/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialState = {
    auth: authInitialState,
  };

  jest.clearAllMocks();
});

describe('[Component] HeaderUserLogin', () => {
  it('Should render login button when not authenticated', async () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <Component />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('header-user-login')).not.toBeNull();
    expect(queryByTestId('header-user-logout')).toBeNull();
  });

  it('Should render logout button when user is authenticated', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.auth.isAuthenticated = true;
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <Component />
        </SSRContextProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('header-user-login')).toBeNull();
    expect(queryByTestId('header-user-logout')).not.toBeNull();
  });

  it('Should call auth service when clicking on login button', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.auth.isAuthenticated = false;

    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <Component />
        </SSRContextProvider>
      </ReduxProvider>,
    );

    const loginButton = queryByTestId('header-user-login');
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
});
