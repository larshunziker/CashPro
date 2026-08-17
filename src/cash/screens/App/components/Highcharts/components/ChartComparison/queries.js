import { gql } from '@apollo/client';

export const GET_CHART_COMPARISON_DATA = gql`
  query GetChartComparisonDataWithCredentials($listingKeys: String!) {
    quoteList(listingKeys: $listingKeys) {
      id
      quoteList {
        count
        edges {
          node {
            ... on Instrument {
              id
              name
              mName
              instrumentKey
              lvalDatetime
              type
              fullquoteUri
              currentPrice
              iNetVperprVPr
              perfPercentage1w
              perfPercentage4w
              perfPercentage52w
              perfPercentageYTD
              hi52w
              lo52w
              mCur
            }
          }
        }
      }
    }
  }
`;
