import React from 'react';
import { render } from '@testing-library/react';
import { authInitialState } from '../../../../../../../../shared/reducers/auth';
import SSRContextProvider from '../../../../../../../../common/components/SSRContext';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component, { HeaderInnerPropsInner } from '../index';

jest.mock('../../../../TopPromoBanner', () => ({
  __esModule: true,
  default: () => null,
}));

const initialState = { auth: { isAuthenticated: false } };

beforeEach(() => {
  initialState.auth = authInitialState;
});

const mockProps: HeaderInnerPropsInner = {
  contentType: 'string',
  routePathname: 'string',
  routeVertical: 'string',
  visibleNavigation: 'string',
  setNavigationVisible: () => null,
  authState: {
    isAuthenticated: false,
    username: '',
    givenName: 'Name',
    familyName: 'Family',
    email: 'test@test.com',
    hasSubscriptions: false,
    initialAuthRequest: false,
    registrationTimestamp: null,
    subscriptionTimestamp: null,
  },
  isCollapsed: false,
  params: { mock: 'mockParam' },
  pageMetadata: {
    publication: 'string',
    isNativeContent: false,
    pathname: 'string',
    publicationDate: 'string',
    restrictionStatus: 'string',
    section: 'string',
    tags: ['string'],
    contentType: 'string',
    isPrintArticle: false,
    gcid: 'string',
  },
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ArticleData'. */
  headerArticleData: null,
  headerContentType: 'string',
  scrollDirection: '',
};

describe('[Component] Header Inner', () => {
  it('Should show login button when not authenticated', () => {
    initialState.auth.isAuthenticated = false;
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <Component {...mockProps} />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    const loginButton = queryByTestId('headerinner-login-button');

    expect(loginButton).not.toBeNull();
  });

  it('Should show open user navigation button when authenticated', () => {
    initialState.auth.isAuthenticated = true;

    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        <SSRContextProvider>
          <Component {...mockProps} />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    const openMenuButton = queryByTestId(
      'headerinner-openusernavigation-button',
    );

    expect(openMenuButton).not.toBeNull();
  });
});
