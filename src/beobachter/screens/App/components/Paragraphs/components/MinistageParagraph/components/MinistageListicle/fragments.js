/**
 *
 */

import { gql } from '@apollo/client';

export const ministageListicleFragment = gql`
  fragment MinistageListicleFragment on MinistageListicle {
    name
    headline
    image {
      id
      alt
      relativeOriginPath
    }
    callToActionLink {
      path
      label
      routed
    }
    links {
      edges {
        node {
          path
          label
          routed
        }
      }
    }
  }
`;
