import { gql } from '@apollo/client';

export const MAILCHIMP_LIST_REQUEST = gql`
  mutation MailchimpListRequest(
    $action: MailchimpListAction!
    $email: String!
    $salutation: SalutationEnum!
    $firstName: String!
    $lastName: String!
    $listId: String!
    $groupId: String!
    $source: String!
    $mailchimpAccountId: String!
  ) {
    mailchimpListRequest(
      input: {
        action: $action
        email: $email
        salutation: $salutation
        firstName: $firstName
        lastName: $lastName
        listId: $listId
        groupId: $groupId
        source: $source
        mailchimpAccountId: $mailchimpAccountId
      }
    )
  }
`;
