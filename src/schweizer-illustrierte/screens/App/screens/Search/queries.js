import { gql } from '@apollo/client';
import { searchResultFragment } from './fragments';

export const GET_SEARCH_PAGE = gql`
  query Search(
    $query: String!
    $limit: Int
    $offset: Int
    $sort: SearchOrderByField
    $contentTypes: [ContentTypeEnum]
  ) {
    globalSearch(
      search: $query
      limit: $limit
      offset: $offset
      sort: $sort
      content_types: $contentTypes
    ) {
      count
      ...SearchResultFragment
    }
  }

  ${searchResultFragment}
`;
