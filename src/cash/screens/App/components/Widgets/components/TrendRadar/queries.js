import { gql } from '@apollo/client';

export const GET_TREND_RADAR = gql`
  query SolviansTrendingRadar($mIsin: [String!], $limit: Float!)
  @api(name: "graphql-service") {
    integration {
      solvians {
        trendRadar(mIsin: $mIsin, limit: $limit) {
          id
          fullquoteUri
          mValor
          mSymb
          timeHorizon
          image
          timeSort
          patternType {
            id
            name
          }
          breakout {
            id
            type
            direction
            quotePotential {
              distPercentBreakoutFrom
              type
            }
          }
          instrument {
            name
          }
        }
      }
    }
  }
`;
