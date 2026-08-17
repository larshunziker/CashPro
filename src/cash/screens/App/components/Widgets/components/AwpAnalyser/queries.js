import { gql } from '@apollo/client';

export const GET_AWP_ANALYSER = gql`
  query AWPAnalyserData($isin: String!) @api(name: "graphql-service") {
    integration {
      awp {
        ratings(isin: $isin) {
          id
          count
          items {
            id
            date
            ratingSource
            title
            text
            table
            priceTarget
            status
          }
        }
      }
    }
  }
`;
