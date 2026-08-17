/**
 *
 */

import { gql } from '@apollo/client';
import { paragraphsFragment } from 'Paragraphs/fragments';

// TODO: revert this again when activemenutrail has a ID field
export const landingPageHomeFragment = gql`
  fragment LandingPageHomeFragment on LandingPage {
    id
    nid
    paragraphsSubsetSize
    title
    metaTitle
    metaDescription
    metaOgTitle
    metaOgDescription
    metaCanonicalUrl
    editContentUri
    editRelationUri
    cloneContentUri
    lead
    preferredUri
    channel {
      id
      channelType
      settings {
        mainChannel {
          id
          title
        }
      }
      sponsors {
        edges {
          node {
            ... on Sponsor {
              id
              title
              teaserImage {
                id
                caption
                link {
                  path
                }
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
              backgroundImage {
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
    }
    teaserImage {
      id
      image {
        id
        file(style: "16x9_1130") {
          id
          relativeOriginPath
          focalPointX
          focalPointY
        }
      }
    }
    grid(limit: $landingPageGridSize, offset: $landingPageGridOffset) {
      count
      edges {
        node {
          ... on LandingPage {
            id
            title
            lead
            shortTitle
            preferredUri
            teaserImage {
              id
              caption
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
            channel {
              id
              sponsor {
                id
                title
                colorCode
                teaserImage {
                  id
                  caption
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
              channelType
              special {
                id
                title
                colorCode
                logo {
                  source
                }
              }
              partners(limit: 3) {
                edges {
                  node {
                    ... on Sponsor {
                      id
                      title
                    }
                  }
                }
              }
            }
            useAutoHyphens
          }
        }
      }
    }
    body {
      ...ParagraphsFragment
    }
  }

  ${paragraphsFragment}
`;

export const HOME_ROUTE_BY_PATH_QUERY = gql`
  query HomeRouteByPath(
    $path: String!
    $publication: PublicationEnum # $overviewPageSize: Int! # $overviewPageOffset: Int!
    $landingPageGridSize: Int!
    $landingPageGridOffset: Int!
    $entityQueueLimit: Int!
  ) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        canonical
        preferred
        statusCode
        object {
          ...LandingPageHomeFragment
        }
      }
    }
  }

  ${landingPageHomeFragment}
`;
