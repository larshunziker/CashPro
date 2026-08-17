import { gql } from '@apollo/client';

export const ministageLogoBoxFragment = gql`
  fragment MinistageLogoBoxFragment on MinistageLogoBox {
    name
    headline
    subhead
    items {
      edges {
        node {
          id
          ... on Person {
            id
            lead: function
            teaserImage {
              id
              image {
                id
                file {
                  id
                  relativeOriginPath
                  focalPointX
                  focalPointY
                  alt
                }
              }
            }
          }
          ... on Sponsor {
            id
            title
            preferredUri
            teaserImage {
              id
              image {
                id
                file {
                  id
                  relativeOriginPath
                  alt
                  focalPointX
                  focalPointY
                }
              }
            }
          }
        }
      }
    }
  }
`;
