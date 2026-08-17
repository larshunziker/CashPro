/**
 * @file   listing graphql fragments
 * @author Pascal Tan<pascal.tan@ringieraxelspringer.ch>
 * @date   2019-09-23 09:06:54
 *
 */

import { gql } from '@apollo/client';

export const personListingFragment = gql`
  fragment PersonListingFragment on RankingsConnection {
    edges {
      node {
        rankingPosition
        rankingValue
        rankingIndustry
        rankingState
        rankingTrend
        ranking {
          title
          year
          rankingType
          preferredUri
        }
      }
    }
  }
`;
