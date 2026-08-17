import { gql } from '@apollo/client';

export const GET_QUOTES_MARKET_OVERVIEW = gql`
  query GetQuotesMarketOverview($listingKeys: String!)
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
              perfPercentage
              scGrouped
              currentPrice
              iNetVperprVPr
              fullquoteUri
            }
          }
        }
      }
    }
  }
`;
