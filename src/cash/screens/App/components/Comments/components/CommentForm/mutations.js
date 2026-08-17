import { gql } from '@apollo/client';

export const SUBMIT_COMMENT = gql`
  mutation SubmitComment(
    $body: String!
    $parentEntityId: ID!
    $parentCommentId: ID
  ) @api(name: cms) {
    submitComment(
      publication: CASH
      input: {
        body: $body
        parentEntityId: $parentEntityId
        parentCommentId: $parentCommentId
      }
    ) {
      count
    }
  }
`;
