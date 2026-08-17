import { gql } from '@apollo/client';

export const INTEGRATION_THE_SCREENER = gql`
  query theScreener($type: String!, $id: String!, $mCur: String)
  @api(name: "graphql-service") {
    integration(type: $type, id: $id, mCur: $mCur) {
      object {
        ... on TheScreener {
          keyPoints {
            id
            analysisDate
            keyPointPos1
            keyPointPos2
            keyPointPos3
            keyPointNeg1
            keyPointNeg2
            keyPointNeg3
          }
        }
      }
    }
  }
`;
