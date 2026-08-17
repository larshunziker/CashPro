import { gql } from '@apollo/client';

export const GET_LATEST_PORTFOLIONEWS_BY_VALORNUMBER = gql`
  query GetLatestPortfolioNewsByValorNumber(
    $query: String!
    $sort: SearchOrderByField
    $contentTypes: [ContentTypeEnum]
    $limit: Int!
    $offset: Int!
    $valors: [String]
  ) @api(name: cms) {
    environment(publication: CASH) {
      globalSearch(
        search: $query
        limit: $limit
        offset: $offset
        sort: $sort
        content_types: $contentTypes
        valors: $valors
      ) {
        count
        edges {
          node {
            ... on Article {
              id
              title
              restrictionStatus
              shortTitle
              changeDate
              showUpdated
              preferredUri
              publication
              publicationDate
              subtypeValue: articleType
              useNativeAdvertising
              channel {
                id
                title
              }
              hasVideo
              teaserImage {
                id
                caption
                image {
                  id
                  file(style: "large") {
                    id
                    alt
                    relativeOriginPath
                    focalPointX
                    focalPointY
                  }
                }
              }
              useAutoHyphens
              valors {
                items {
                  id
                  shortName
                  valorName
                  valorNumber
                  valorStockExchange {
                    id
                    originalId
                    __typename
                  }
                  valorCurrency {
                    id
                    originalId
                    __typename
                  }
                  __typename
                }
                __typename
              }
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;
