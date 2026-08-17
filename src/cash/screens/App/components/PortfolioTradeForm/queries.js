import { gql } from '@apollo/client';

export const GET_TRANSACTION = gql`
  query GetTransactionWithCredentials(
    $portfolioKey: String!
    $instrumentKey: String!
    $transactionKey: String!
    $isOtherAsset: Boolean!
  ) {
    getTransaction(
      portfolioKey: $portfolioKey
      instrumentKey: $instrumentKey
      transactionKey: $transactionKey
      isOtherAsset: $isOtherAsset
    ) {
      comment
      transactionKey
      date
      fees
      feesExtra
      price
      quantity
      rate
      type
      error
    }
  }
`;

export const GET_TRANSACTION_INFO = gql`
  query GetTransactionInfoWithCredentials(
    $portfolioKey: String!
    $instrumentKey: String!
    $portfolioCurrency: String!
    $isOtherAsset: Boolean!
  ) {
    getTransactionInfo(
      portfolioKey: $portfolioKey
      instrumentKey: $instrumentKey
      portfolioCurrency: $portfolioCurrency
      isOtherAsset: $isOtherAsset
    ) {
      instrumentKey
      instrumentCurrency
      portfolioCurrency
      price
      rate
      type
      error
      name
    }
  }
`;

export const ADD_TRANSACTION = gql`
  mutation AddTransactionWithCredentials(
    $portfolioKey: String!
    $instrumentKey: String!
    $date: String!
    $comment: String
    $type: String!
    $quantity: String!
    $fees: String
    $extraFees: String
    $paid: String!
    $rate: String
    $isOtherAsset: Boolean!
  ) {
    addTransaction(
      portfolioKey: $portfolioKey
      instrumentKey: $instrumentKey
      date: $date
      comment: $comment
      type: $type
      quantity: $quantity
      fees: $fees
      extraFees: $extraFees
      paid: $paid
      rate: $rate
      isOtherAsset: $isOtherAsset
    ) {
      transactionKey
      type
      date
      comment
      fees
      rate
      error
      quantity
    }
  }
`;

export const EDIT_TRANSACTION = gql`
  mutation EditTransactionWithCredentials(
    $portfolioKey: String!
    $instrumentKey: String!
    $transactionKey: String!
    $date: String!
    $comment: String
    $type: String!
    $quantity: String!
    $fees: String
    $extraFees: String
    $paid: String!
    $rate: String
    $isOtherAsset: Boolean!
  ) {
    editTransaction(
      portfolioKey: $portfolioKey
      instrumentKey: $instrumentKey
      transactionKey: $transactionKey
      date: $date
      comment: $comment
      type: $type
      quantity: $quantity
      fees: $fees
      extraFees: $extraFees
      paid: $paid
      rate: $rate
      isOtherAsset: $isOtherAsset
    ) {
      transactionKey
      type
      date
      comment
      fees
      rate
      error
      quantity
    }
  }
`;
