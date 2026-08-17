import { gql } from '@apollo/client';

export const GET_TREND_RADAR_OVERVIEW = gql`
  query GetTrendRadarOverview($mIsin: [String!], $limit: Float!)
  @api(name: "graphql-service") {
    integration {
      solvians {
        trendRadar(mIsin: $mIsin, limit: $limit) {
          id
          fullquoteUri
          patternType {
            name
          }
          timeSort
          breakout {
            direction
          }
          instrument {
            name
          }
        }
      }
    }
  }
`;
