import { gql } from '@apollo/client';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const GET_SUBSCRIPTIONS = gql`
  query SubscriptionsRouteByPath(
    $path: String!
    $publication: PublicationEnum
  ) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        canonical
        preferred
        object {
          ... on Page {
            nid
            id
            title
            shortTitle
            metaTitle
            metaOgTitle
            metaDescription
            metaOgDescription
            metaCanonicalUrl
            canonicalUri
            channel {
              id
              suppressAds
            }
            editContentUri
            editRelationUri
            publication
            preferredUri
            restrictionStatus
            teaserImage {
              id
              caption
              image {
                id
                credit
                file(style: "16x9_560", calculateDimensions: true) {
                  id
                  alt
                  relativeOriginPath
                  focalPointX
                  focalPointY
                  width
                  height
                }
              }
            }
            body {
              ...ParagraphsFragment
            }
          }
        }
      }
    }
  }
  ${paragraphsFragment}
`;
