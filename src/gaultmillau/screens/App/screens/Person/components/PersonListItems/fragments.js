import { gql } from '@apollo/client';

export const personListItemsFragment = gql`
  fragment PersonListItemsFragment on PersonConnection {
    edges {
      node {
        id
        firstName
        lastName
        preferredUri
        teaserImage {
          id
          title
          image {
            id
            file {
              id
              alt
              relativeOriginPath
              focalPointX
              focalPointY
            }
          }
        }
      }
    }
  }
`;
