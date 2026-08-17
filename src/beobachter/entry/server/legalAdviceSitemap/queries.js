import { gql } from '@apollo/client';

export const GET_LEGAL_ADVICE_SITEMAP_DATA = gql`
  query GetLegalAdviceSitemapData(
    $path: String!
    $query: String
    $limit: Int
    $offset: Int
    $types: String
    $hasKMUAccess: Boolean
  ) @api(name: "graphql-service") {
    legalAdvice: legalAdvice(
      path: $path
      query: $query
      limit: $limit
      offset: $offset
      types: $types
      hasKMUAccess: $hasKMUAccess
    ) {
      articlesSearchResults {
        articles {
          id
          fileName
          filePath
          lastModified
        }
        resultsNav {
          totalResults
          resultsEnd
        }
      }
    }
  }
`;
