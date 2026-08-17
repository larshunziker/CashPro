import { gql } from '@apollo/client';

export const EDIT_DEFAULTS = gql`
  mutation EditDefaultsWithCredentials(
    $key: String!
    $view: String!
    $grouping: String!
    $settingsType: String!
  ) {
    editDefaultView(
      portfolioKey: $key
      portfolioView: $view
      portfolioGrouping: $grouping
      settingsType: $settingsType
    ) {
      status
      message
      error
    }
  }
`;
