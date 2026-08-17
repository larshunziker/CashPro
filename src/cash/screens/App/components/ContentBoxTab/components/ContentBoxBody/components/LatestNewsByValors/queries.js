import { gql } from '@apollo/client';

export const LATEST_NEWS_BY_VALOR_QUERY = gql`
  query LatestNewsByValor(
    $query: String!
    $sort: SearchOrderByField
    $contentTypes: [ContentTypeEnum]
    $limit: Int!
    $publication: PublicationEnum
    $valors: [String]
  ) @api(name: cms) {
    environment(publication: $publication) {
      globalSearch(
        search: $query
        limit: $limit
        sort: $sort
        content_types: $contentTypes
        valors: $valors
      ) {
        count
        edges {
          node {
            ... on Article {
              id
              preferredUri
              title
              publicationDate
              useAutoHyphens
            }
          }
        }
      }
    }
  }
`;
