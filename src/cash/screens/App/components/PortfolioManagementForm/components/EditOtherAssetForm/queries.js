import { gql } from '@apollo/client';

export const EDIT_OTHER_ASSET_INSTRUMENT = gql`
  mutation EditOtherAssetInstrumentWithCredentials(
    $portfolioKey: String!
    $instrumentKey: String!
    $title: String!
    $currency: String!
    $value: String!
    $marketType: String!
  ) {
    editOtherAssetInstrument(
      portfolioKey: $portfolioKey
      instrumentKey: $instrumentKey
      title: $title
      value: $value
      currency: $currency
      marketType: $marketType
    ) {
      title
      error
    }
  }
`;
