import React from 'react';
import { IntlProvider } from 'react-intl';
import { ApolloProvider } from '@apollo/client';
import { render } from '@testing-library/react';
import { routeInitialState } from '../../../../../../../../../../../shared/reducers/route';
import { initialState as windowInitialState } from '../../../../../../../../../../../shared/reducers/window';
import ReduxProvider from '../../../../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import apolloClient from '../../../../../../../../../../../../shared/configureApolloClient';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = {
    ministageNewsletter: JSON.parse(JSON.stringify(mockData)),
  };
  initialState = {
    window: windowInitialState,
    route: {
      ...routeInitialState,
      clientUrl: 'https://develop.publication.ch',
    },
  };
});

jest.mock('../../MailChimpSubscribeForm', () => {
  return () => {
    return null;
  };
});

describe('[Component] MinistageNewsletterSignup', () => {
  it('Should render desktop correctly', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        <IntlProvider locale="de-CH">
          <ApolloProvider client={apolloClient}>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </ApolloProvider>
        </IntlProvider>
      </ReduxProvider>,
    );

    expect(queryByTestId('ministage-newsletter-signup-wrapper')).not.toBeNull();
    expect(queryByTestId('ministage-newsletter-signup-image')).not.toBeNull();
  });
});
