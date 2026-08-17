import { gql } from '@apollo/client';

export const EDIT_USER_SETTINGS = gql`
  mutation EditCustomViewWithCredentials(
    $key: String!
    $value: String!
    $settingsType: String!
  ) {
    editCustomView(
      portfolioKey: $key
      customView: $value
      settingsType: $settingsType
    ) {
      status
      message
      error
    }
  }
`;

export const EDIT_USER_CUSTOM_ORDER_SETTINGS = gql`
  mutation EditCustomOrderWithCredentials(
    $key: String!
    $value: String!
    $settingsType: String!
  ) {
    editCustomOrder(
      portfolioKey: $key
      customOrder: $value
      settingsType: $settingsType
    ) {
      status
      message
      error
    }
  }
`;

export const EDIT_USER_CUSTOM_PORTFOLIOS_ORDER_SETTINGS = gql`
  mutation EditCustomOrderWithCredentials($value: String!) {
    editCustomPortfoliosOrder(customOrder: $value) {
      status
      message
      error
    }
  }
`;
