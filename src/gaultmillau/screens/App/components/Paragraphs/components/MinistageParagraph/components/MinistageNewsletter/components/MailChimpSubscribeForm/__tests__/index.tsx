import React from 'react';
import { IntlProvider } from 'react-intl';
import { gql } from '@apollo/client';
import { render } from '@testing-library/react';
import { initialState as windowInitialState } from '../../../../../../../../../../../shared/reducers/window';
import ReduxProvider from '../../../../../../../../../../../shared/tests/components/ReduxProvider';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../index'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App/ */
import Component from '../index';
import MockedProvider from '../../../../../../../../../../../../shared/tests/components/MockedProvider';
import mockData from './mockData.json';

// Added this to avoid the "Missing Translation" error being logged
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});
afterAll(() => {
  // @ts-ignore
  console.error.mockRestore(); // eslint-disable-line
});

// TODO: This constants will have to be removed once possible to store reusable gql queries and mutations at common level.
const SUBMIT_MAILCHIMP_REQUEST = gql`
  mutation MailchimpListRequest(
    $action: MailchimpListAction!
    $email: String!
    $listId: String!
    $groupId: String
    $mailchimpAccountId: String!
  ) {
    mailchimpListRequest(
      input: {
        action: $action
        email: $email
        listId: $listId
        groupId: $groupId
        mailchimpAccountId: $mailchimpAccountId
      }
    )
  }
`;

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
  };
});

describe('[Component] MailchimpSubscribeForm', () => {
  it('Should render correctly', () => {
    const { queryByTestId } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: SUBMIT_MAILCHIMP_REQUEST,
              variables: {
                action: 'addToList',
                email: 'rasch123@trash-mail.com',
                /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
                listId: initialProps.ministageNewsletter.mailchimpList || '',
                groupId:
                  /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
                  initialProps.ministageNewsletter.mailchimpInterest || '',
                mailchimpAccountId:
                  /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
                  initialProps.ministageNewsletter.mailchimpAccountId || '',
              },
            },
            result: {
              data: {
                mailchimpListRequest: {},
              },
            },
          },
        ]}
      >
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */}
        <ReduxProvider initialState={initialState}>
          <IntlProvider locale="de-CH">
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </IntlProvider>
        </ReduxProvider>
      </MockedProvider>,
    );
    expect(queryByTestId('mailchimp-subscribe-form-form')).not.toBeNull();
    expect(
      queryByTestId('mailchimp-subscribe-form-button-wrapper'),
    ).not.toBeNull();
    expect(
      queryByTestId('mailchimp-subscribe-form-input-wrapper'),
    ).not.toBeNull();
    expect(
      queryByTestId('mailchimp-subscribe-form-success-wrapper'),
    ).toBeNull();
  });
});
