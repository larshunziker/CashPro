import { gql } from '@apollo/client';

export const GET_CRYPTO_LOGOS = gql`
  query getCryptoLogos($symbols: String) @api(name: "graphql-service") {
    integration {
      crypto {
        logos(symbols: $symbols) {
          symbol
          logo
        }
      }
    }
  }
`;

export const GET_CRYPTO_MARKETCAPS = gql`
  query getCryptoMarketCaps($limit: Int) @api(name: "graphql-service") {
    integration {
      crypto {
        marketCaps(limit: $limit) {
          listingKey
          marketCap
        }
      }
    }
  }
`;

export const GET_CRYPTO_LOGOS_AND_MARKETCAPS = gql`
  query getCryptoLogosAndMarketCaps($symbols: String)
  @api(name: "graphql-service") {
    integration {
      crypto {
        logos(symbols: $symbols) {
          symbol
          logo
        }
        marketCaps {
          listingKey
          marketCap
        }
      }
    }
  }
`;
