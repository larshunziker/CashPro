import { gql } from '@apollo/client';

export const GET_PORTFOLIOS_CALCULATED = gql`
  query portfoliosCalculatedWithCredentials(
    $publication: PublicationEnum!
    $limit: Int
    $offset: Int
  ) @api(name: "graphql-service") {
    portfolios(publication: $publication, limit: $limit, offset: $offset) {
      count
      items {
        ... on Portfolio {
          id
          portfolioKey
          name
          currency
          defaultPortfolio
          portfolioSettings {
            id
            portfolioKey
            view
            grouping
            customView
            customOrder
          }
          calculatedFields {
            totalPaidPrice
            totalActualPrice
            totalAccountPlusMinus
            totalAccountPercent
          }
        }
      }
    }
  }
`;

export const GET_PORTFOLIOS = gql`
  query portfoliosWithCredentials(
    $publication: PublicationEnum!
    $limit: Int
    $offset: Int
  ) @api(name: "graphql-service") {
    portfolios(publication: $publication, limit: $limit, offset: $offset) {
      items {
        ... on Portfolio {
          id
          name
          portfolioKey
        }
      }
    }
  }
`;
