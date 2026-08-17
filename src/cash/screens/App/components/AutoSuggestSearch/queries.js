/**
 *
 */

import { gql } from '@apollo/client';

export const GET_AUTO_SUGGEST_SEARCH_ENTITIES = gql`
  query SearchChartComparisonWithCredentialsExternalContent(
    $query: String!
    $limit: Int
  ) @api(name: "graphql-service") {
    textSearch(publication: CASH, search: $query, limit: $limit) {
      index {
        count
        items {
          ... on Index {
            type
            name
            mName
            currency
            price
            priceTimestamp
            market
            marketId
            marketDescription
            mIsin
            valor
            link
            listingId
          }
        }
      }
      equity {
        count
        items {
          ... on Equity {
            type
            name
            mName
            currency
            price
            priceTimestamp
            market
            marketId
            marketDescription
            mIsin
            valor
            link
            listingId
          }
        }
      }
      fund {
        count
        items {
          ... on Fund {
            type
            name
            mName
            currency
            price
            priceTimestamp
            market
            marketId
            marketDescription
            mIsin
            valor
            link
            listingId
          }
        }
      }
      derivative {
        count
        items {
          ... on Derivative {
            type
            name
            mName
            currency
            price
            priceTimestamp
            market
            marketId
            marketDescription
            mIsin
            symbol
            link
            listingId
            termsheet
          }
        }
      }
      cryptoCurrency {
        count
        items {
          ... on CryptoCurrency {
            link
            name
            mName
            valor
            marketId
            marketDescription
            mIsin
            type
            currency
            price
            priceTimestamp
            market
            listingId
          }
        }
      }
      diverse {
        count
        items {
          ... on Diverse {
            type
            name
            mName
            currency
            price
            priceTimestamp
            market
            marketId
            marketDescription
            mIsin
            valor
            link
            listingId
          }
        }
      }
      bond {
        count
        items {
          ... on Bond {
            type
            name
            mName
            currency
            price
            priceTimestamp
            market
            marketId
            marketDescription
            mIsin
            valor
            link
            listingId
          }
        }
      }
    }
  }
`;
