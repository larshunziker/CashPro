import { gql } from '@apollo/client';

export const GET_CASH_ITEMS = gql`
  query CashItemsWithCredentials($portfolioKey: String!)
  @api(name: "graphql-service") {
    getCashItems(portfolioKey: $portfolioKey) {
      total
      cashItems {
        count
        edges {
          node {
            ... on CashItem {
              id
              date
              comment
              amount
              instrumentTitle
              cashItemKey
            }
          }
        }
      }
    }
  }
`;

export const ADD_CASH_ITEM = gql`
  mutation AddCashItemWithCredentials(
    $portfolioKey: String!
    $date: String!
    $amount: String!
    $comment: String
  ) {
    addCashItem(
      portfolioKey: $portfolioKey
      amount: $amount
      date: $date
      comment: $comment
    ) {
      cashItemKey
    }
  }
`;

export const EDIT_CASH_ITEM = gql`
  mutation EditCashItemWithCredentials(
    $portfolioKey: String!
    $cashItemKey: String!
    $date: String!
    $amount: String!
    $comment: String
  ) {
    editCashItem(
      portfolioKey: $portfolioKey
      cashItemKey: $cashItemKey
      amount: $amount
      date: $date
      comment: $comment
    ) {
      cashItemKey
    }
  }
`;

export const DELETE_CASH_ITEM = gql`
  mutation DeleteCashItemWithCredentials(
    $portfolioKey: String!
    $cashItemKey: String!
  ) {
    deleteCashItem(portfolioKey: $portfolioKey, cashItemKey: $cashItemKey) {
      message
      error
    }
  }
`;
