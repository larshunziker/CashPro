/**
 * @file   Comments queries
 * @author Andrea Reber <andrea.reber@ringieraxelspringer.ch>
 * @date   2019-05-24
 *
 */

import { gql } from '@apollo/client';

export const GET_COMMENTS = gql`
  query Comment($limit: Int, $id: String!, $offset: Int, $sort: SortOrderEnum) {
    commentsById(limit: $limit, id: $id, offset: $offset, sort: $sort) {
      count
      totalCount
      edges {
        node {
          id
          name
          createDate
          body
          commentReplies(limit: 999) {
            edges {
              node {
                id
                name
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
