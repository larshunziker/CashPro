import { gql } from '@apollo/client';

export const ministageListicleFragment = gql`
  fragment MinistageListicleFragment on MinistageListicle {
    headline
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
