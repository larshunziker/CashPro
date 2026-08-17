import { gql } from '@apollo/client';

export const MAILCHIMP_LIST_REQUEST = gql`
  mutation MailchimpListRequest(
    $action: MailchimpListAction!
    $email: String!
    $listId: String!
    $groupId: String
  ) {
    mailchimpListRequest(
      input: {
        action: $action
        email: $email
        listId: $listId
        groupId: $groupId
      }
    )
  }
`;
