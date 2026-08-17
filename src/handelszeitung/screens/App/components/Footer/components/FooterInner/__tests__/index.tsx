import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { authInitialState } from '../../../../../../../../shared/reducers/auth';
import SSRContextProvider from '../../../../../../../../common/components/SSRContext';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

const mockLogin = jest.fn();
jest.mock('../../../../../../../../common/components/Auth0Provider', () => ({
  Auth0: class {
    /* @ts-ignore TODO: TS7006 ->  Parameter 'params' implicitly has an 'any' type. */
    static login(params) {
      mockLogin(params);
    }
  },
}));

/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */
jest.mock('Link', () => ({ label }) => <>{label}</>);

const initialState = { auth: authInitialState };
const initialProps = JSON.parse(JSON.stringify(mockData));

describe('[Component] FooterInner', () => {
  it('Should render nothing', () => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          {/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Menu'. */}
          <Component footerPrimaryMenu={null} />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render footer items correctly when not authenticated', () => {
    const { container, queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <Component footerPrimaryMenu={initialProps} />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('footer-inner-ringier-connect-item')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should render footer items correctly when authenticated', () => {
    initialState.auth.isAuthenticated = true;
    const { container, queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <Component footerPrimaryMenu={initialProps} />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('footer-inner-ringier-connect-item')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should not render auth link in menus other than Services', () => {
    initialProps.links.edges[0].node.link.label = 'Kontakt';
    const { container, queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <Component footerPrimaryMenu={initialProps} />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(queryByTestId('footer-inner-ringier-connect-item')).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should not render subtree items without label', () => {
    initialProps.links.edges[0].node.link.label = '';
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <Component footerPrimaryMenu={initialProps} />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should call auth service when clicking on login button', () => {
    initialProps.links.edges[0].node.link.label = 'Services';
    initialState.auth.isAuthenticated = false;

    const { queryByTestId, container } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <Component footerPrimaryMenu={initialProps} />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    const loginButton = queryByTestId('footer-inner-auth-button');
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.click(loginButton);

    expect(container).toMatchSnapshot();
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
});
