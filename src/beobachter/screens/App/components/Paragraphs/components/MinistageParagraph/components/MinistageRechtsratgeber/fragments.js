/**
 *
 */

import { gql } from '@apollo/client';

export const ministageGuiderFragment = gql`
  fragment MinistageGuiderFragment on MinistageGuider {
    links(limit: 6) {
      edges {
        node {
          label
          path
          routed
        }
      }
    }
  }
`;
