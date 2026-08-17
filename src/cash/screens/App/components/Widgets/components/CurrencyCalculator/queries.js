import { gql } from '@apollo/client';

export const GET_CURRENCY_CALCULATOR_DATA = gql`
  query GetCurrencyCalculator($listingKeys: String!)
  @api(name: "graphql-service") {
    quoteList(listingKeys: $listingKeys) {
      id
      quoteList {
        count
        edges {
          node {
            ... on Instrument {
              id
              mName
              lval
              lvalDatetime
              pricingamt
              instrumentKey
              fullquoteUri
            }
          }
        }
      }
    }
  }
`;

export const GET_CURRENCY_CALCULATOR_CHARTS_DATA = gql`
  query GetChartHikuWithCredentials(
    $listingKey: String!
    $from: String
    $to: String
    $max: String
  ) @api(name: "graphql-service") {
    integration {
      id
      solid {
        id
        chart(listingKey: $listingKey, from: $from, to: $to, max: $max) {
          id
          hiku {
            prices {
              date
              last
            }
          }
        }
      }
    }
  }
`;
