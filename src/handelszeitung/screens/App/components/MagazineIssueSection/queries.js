/**
 *
 */

import { gql } from '@apollo/client';

export const GET_ISSUE = gql`
  query IssueGetContentById($id: String!, $publication: PublicationEnum) {
    environment(publication: $publication) {
      contentById(id: $id) {
        ... on Issue {
          id
          title
          magazine {
            articleBoxText
            isSpecialOffer
            specialOfferText
            link {
              path
              label
            }
          }
          link {
            path
          }
          image {
            id
            file(style: "scalew_140") {
              id
              alt
              relativeOriginPath
              focalPointX
              focalPointY
            }
          }
          useAutoHyphens
        }
      }
    }
  }
`;
