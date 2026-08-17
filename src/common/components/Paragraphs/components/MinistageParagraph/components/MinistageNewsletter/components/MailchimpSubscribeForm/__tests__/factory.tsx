import React from 'react';
import { gql } from '@apollo/client';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import MockedProvider from '../../../../../../../../../../shared/tests/components/MockedProvider';
import mockData from './../../../__tests__/mockData.json';

// TODO: This constants will have to be removed once possible to store reusable gql queries and mutations at common level.
const SUBMIT_MAILCHIMP_REQUEST = gql`
  mutation MailchimpListRequest(
    $action: MailchimpListAction!
    $email: String!
    $listId: String!
    $groupId: String
    $mailchimpAccountId: String!
  ) @api(name: cms) {
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

const componentFactoryOptions = {
  styles: {
    Form: 'FormClassName',
    Row: 'RowClassName',
    InputWrapper: 'InputWrapperClassName',
    EmailWrapper: 'EmailWrapperClassName',
    SuccessWrapper: 'SuccessWrapperClassName',
    SuccessTick: 'SuccessTickClassName',
    SuccessSubmission: 'SuccessSubmissionClassName',
    ButtonWrapper: 'ButtonWrapperClassName',
    Button: 'ButtonClassName',
    ButtonActivated: 'ButtonActivatedClassName',
    ButtonDeactivated: 'ButtonDeactivatedClassName',
  },
  mutationQuery: SUBMIT_MAILCHIMP_REQUEST,
  InputField: () => <div className="InputFieldMock"></div>,
};

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);

  initialProps = {
    ministageNewsletter: JSON.parse(JSON.stringify(mockData)),
  };
});

describe('[Component] MailchimpSubscribeForm', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

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
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
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
