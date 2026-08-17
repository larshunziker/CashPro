import { gql } from '@apollo/client';

const query = gql`
  query Autocomplete(
    $char: String!
    $pageSize: Int!
    $contentTypes: [ContentTypeEnum]
  ) @api(name: cms) {
    globalSearch(
      search: $char
      limit: $pageSize
      content_types: $contentTypes
    ) {
      edges {
        node {
          ... on Article {
            id
            title
            preferredUri
          }
          ... on NativeAdvertising {
            id
            title
            preferredUri
          }
          ... on ExplainingArticle {
            id
            title
            preferredUri
          }
        }
      }
    }
  }
`;

export default query;
