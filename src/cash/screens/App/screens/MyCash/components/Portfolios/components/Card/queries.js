import { gql } from '@apollo/client';

export const GET_PORTFOLIO_BY_KEY = gql`
  query portfolioWithCredentials(
    $publication: PublicationEnum!
    $limit: Int
    $offset: Int
    $portfolioKey: String!
  ) @api(name: "graphql-service") {
    portfolio(
      publication: $publication
      limit: $limit
      offset: $offset
      portfolioKey: $portfolioKey
    ) {
      ... on Portfolio {
        id
        name
        defaultPortfolio
        currency
        portfolioKey
        calculatedFields {
          totalPaidPrice
          totalActualPrice
          totalAccountPlusMinus
          totalAccountPercent
        }
      }
    }
  }
`;
