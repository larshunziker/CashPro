import { gql } from '@apollo/client';

export const GET_LEGAL_ADVICE_DATA = gql`
  query GetLegalAdviceData(
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
      args {
        query
      }
      category {
        descriptionLong
        title
        count
        id
        level
        slug
        sortKey
        parentId
        path
        children {
          descriptionLong
          title
          count
          id
          level
          slug
          sortKey
          parentId
          path
        }
        parent {
          descriptionLong
          title
          count
          id
          level
          slug
          sortKey
          parent {
            descriptionLong
            title
            count
            id
            level
            slug
            sortKey
            parentId
            path
          }
          parentId
          path
        }
      }
      articlesSearchResults {
        articles {
          title
          typeCode
          id
          summary
          specialInterest
        }
        resultsNav {
          totalResults
          resultsEnd
        }
      }
      articleTypes {
        id
        title
        numberOfArticles
      }
    }
  }
`;
