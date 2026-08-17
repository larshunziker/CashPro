//

import { gql } from '@apollo/client';

export const GET_SPONSORS = gql`
  query SponsorsRouteByPath(
    $path: String!
    $publication: PublicationEnum
    $additionalPublications: [PublicationEnum]
  ) {
    environment(
      publication: $publication
      additionalPublications: $additionalPublications
    ) {
      routeByPath(path: $path) {
        preferred
        canonical
        object {
          ... on LandingPage {
            id
            nid
            title
            lead
            shortTitle
            preferredUri
            metaCanonicalUrl
            metaTitle
            metaOgTitle
            metaDescription
            metaOgDescription
            activeMenuTrail {
              edges {
                node {
                  label
                  link
                }
              }
            }
            teaserImage {
              id
              caption
              image {
                id
                credit
                file(style: "16x9_700", calculateDimensions: true) {
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
          }
        }
      }
      sponsors(additionalPublications: []) {
        edges {
          node {
            ... on Sponsor {
              id
              title
              description
              preferredUri
              teaserImage {
                id
                title
                image {
                  id
                  file(style: "large", calculateDimensions: true) {
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
            }
          }
        }
      }
    }
  }
`;
