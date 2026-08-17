import { gql } from '@apollo/client';

export const GET_CHART_INTRADAY = gql`
  query GetChartIntradayWithCredentials($id: String!, $frequency: String)
  @api(name: "graphql-service") {
    integration {
      id
      solid {
        id
        chart(listingKey: $id, frequency: $frequency) {
          intraday {
            id
            listingKey
            name
            isin
            companyName
            digits
            bcOpen
            bcClose
            timeZone
            scGrouped
            prices {
              id
              close
              open
              volume
              high
              low
              date
            }
          }
        }
      }
    }
  }
`;

export const GET_CHART_TIMESERIE = gql`
  query GetChartTimeserieWithCredentials(
    $id: String!
    $frequency: String
    $from: String
    $to: String
    $max: String
  ) @api(name: "graphql-service") {
    integration {
      id
      solid {
        id
        chart(
          listingKey: $id
          frequency: $frequency
          from: $from
          to: $to
          max: $max
        ) {
          timeserie {
            id
            listingKey
            name
            isin
            companyName
            digits
            bcOpen
            bcClose
            scGrouped
            timeZone
            prices {
              id
              close
              open
              volume
              high
              low
              date
            }
          }
        }
      }
    }
  }
`;

export const GET_CHART_AUTOUPDATE = gql`
  query GetChartAutoupdateWithCredentials($id: String!, $from: String)
  @api(name: "graphql-service") {
    integration {
      id
      solid {
        id
        chart(listingKey: $id, from: $from) {
          autoupdate {
            id
            close
            volume
            timestamp
            date
          }
        }
      }
    }
  }
`;
