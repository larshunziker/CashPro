import { gql } from '@apollo/client';

export const GET_MINI_PORTFOLIO = gql`
  query miniPortfolioWithCredentials(
    $publication: PublicationEnum!
    $portfolioKey: String!
  ) @api(name: "graphql-service") {
    portfolio(publication: $publication, portfolioKey: $portfolioKey) {
      ... on Portfolio {
        id
        name
        defaultPortfolio
        currency
        portfolioKey
        instrumentCount
        calculatedFields {
          totalAccountPercent
          totalAccountPercentFees
          totalAccountPlusMinus
          totalAccountPlusMinusFees
          totalActualPrice
          totalPaidFees
          totalPaidPrice
          totalQuantity
          cash
          cashAccountTotal
        }
      }
    }
  }
`;
