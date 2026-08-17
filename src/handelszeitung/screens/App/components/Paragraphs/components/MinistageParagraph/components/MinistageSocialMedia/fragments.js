//

import { gql } from '@apollo/client';

export const ministageSocialMediaFragment = gql`
  fragment MinistageSocialMediaFragment on MinistageSocialMedia {
    headline
    subhead
  }
`;
