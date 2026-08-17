import { gql } from '@apollo/client';

export const ADD_OTHER_ASSET_INSTRUMENT = gql`
  mutation AddOtherAssetInstrumentWithCredentials(
    $portfolioKey: String!
    $title: String!
    $currency: String!
    $value: String!
    $marketType: String!
    $date: String!
    $comment: String
    $type: String!
    $quantity: String!
    $fees: String
    $extraFees: String
    $paid: String!
    $rate: String
  ) {
    addOtherAssetInstrument(
      title: $title
      currency: $currency
      value: $value
      marketType: $marketType
      portfolioKey: $portfolioKey
      date: $date
      comment: $comment
      type: $type
      quantity: $quantity
      fees: $fees
      extraFees: $extraFees
      paid: $paid
      rate: $rate
    ) {
      transactionKey
      type
      date
      comment
      fees
      rate
      error
    }
  }
`;

export const GET_RATE_BY_CURRENCY = gql`
  query GetRateByCurrencyWithCredentials(
    $portfolioCurrency: String!
    $currency: String!
  ) {
    getRateByCurrency(
      portfolioCurrency: $portfolioCurrency
      currency: $currency
    ) {
      id
      rate
      error
    }
  }
`;
