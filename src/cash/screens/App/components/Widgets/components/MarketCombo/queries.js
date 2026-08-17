import { gql } from '@apollo/client';

export const GET_QUOTES_MARKET_WIDGET = gql`
  query GetQuotesMarketWidget($listingKeys: String!)
  @api(name: "graphql-service") {
    quoteList(listingKeys: $listingKeys) {
      id
      quoteList {
        count
        edges {
          node {
            ... on Instrument {
              id
              instrumentKey
              mName
              lval
              scGrouped
              currentPrice
              perfPercentage
              iNetVperprVPr
              fullquoteUri
            }
          }
        }
      }
    }
  }
`;

export const GET_QUOTES_WIDGET_WITH_CONSTITUENTS = gql`
  query GetQuotesMarketWidgetConstituents(
    $listingKeys: String!
    $constituents: Boolean
  ) @api(name: "graphql-service") {
    quoteList(listingKeys: $listingKeys, constituents: $constituents) {
      id
      quoteList {
        count
        edges {
          node {
            ... on Instrument {
              id
              mName
              lval
              scGrouped
              perfPercentage
              iNetVperprVPr
              fullquoteUri
            }
          }
        }
      }
    }
  }
`;
