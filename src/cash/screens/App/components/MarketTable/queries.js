import { gql } from '@apollo/client';

export const GET_MARKET_TABLE_DATA = gql`
  query GetMarketTableDataWithCredentials($listingKeys: String!) {
    quoteList(listingKeys: $listingKeys) {
      id
      quoteList {
        count
        edges {
          node {
            __typename
            ... on Instrument {
              id
              isMarketOpen
              mName
              instrumentKey
              currentPrice
              lvalDatetime
              perfPercentage
              iNetVperprV
              fullquoteUri
              market
              mCur
            }
          }
        }
      }
    }
  }
`;
