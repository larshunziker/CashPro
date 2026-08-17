/**
 *
 */

import { gql } from '@apollo/client';

export const ministageAuthorFragment = gql`
  fragment MinistageAuthorFragment on MinistageAuthor {
    authors(limit: 18) {
      edges {
        node {
          id
          aid
          preferredUri
          name
          headline
          hasProfilePage
          imageParagraph {
            id
            image {
              id
              file(style: "large") {
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
    link {
      path
      label
    }
    title
  }
`;
