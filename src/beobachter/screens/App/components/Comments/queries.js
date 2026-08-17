/**
 *
 */

import { gql } from '@apollo/client';

export const GET_COMMENTS = gql`
  query Comment($limit: Int, $id: String!, $offset: Int, $sort: SortOrderEnum)
  @api(name: cms) {
    commentsById(limit: $limit, id: $id, offset: $offset, sort: $sort) {
      count
      totalCount
      edges {
        node {
          id
          displayName
          createDate
          body
          commentReplies(limit: 999) {
            edges {
              node {
                id
                displayName
                createDate
                body
              }
            }
          }
        }
      }
    }
  }
`;
