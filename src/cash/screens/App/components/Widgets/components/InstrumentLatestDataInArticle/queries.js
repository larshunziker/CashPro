import { gql } from '@apollo/client';

export const GET_FULLQUOTEURL_FROM_ARTICLE = gql`
  query GetFullquoteUrlByPath($path: String!) @api(name: "cms") {
    environment(publication: CASH) {
      routeByPath(publication: CASH, path: $path) {
        id
        object {
          ... on Article {
            valors {
              edges {
                node {
                  id
                  fullquoteUrl
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_FULLQUOTE_PAGE_FOR_LATEST_DATA = gql`
  query GetGullquotePageForLatestData(
    $publication: PublicationEnum!
    $path: String!
  ) @api(name: "graphql-service") {
    getFullquotePage(publication: $publication, path: $path) {
      mName
      hrefBuy
      listingId
      tradeType
    }
  }
`;
