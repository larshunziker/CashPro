import { gql } from '@apollo/client';

export const GET_PORTFOLIO_TRANSACTIONS = gql`
  query portfolioTransactionsWithCredentials(
    $publication: PublicationEnum!
    $portfolioKey: String!
  ) @api(name: "graphql-service") {
    portfolio(publication: $publication, portfolioKey: $portfolioKey) {
      ... on Portfolio {
        id
        name
        currency
        portfolioKey
        defaultPortfolio
        calculatedFields {
          instruments {
            ... on Instrument {
              id
              type
              currency
              instrumentKey
              name
              mName
              fullquoteUri
              otherAsset
              scGrouped
              transactions {
                ... on Transaction {
                  id
                  transactionKey
                  date
                  comment
                  type
                  account
                  quantity
                  rate
                  fees
                  price
                  actualPrice
                  accountPercent
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransactionWithCredentials(
    $portfolioKey: String!
    $instrumentKey: String!
    $transactionKey: String!
    $isOtherAsset: Boolean!
  ) {
    deleteTransaction(
      portfolioKey: $portfolioKey
      instrumentKey: $instrumentKey
      transactionKey: $transactionKey
      isOtherAsset: $isOtherAsset
    ) {
      message
      error
    }
  }
`;
