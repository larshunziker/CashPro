/**
 *
 */

import { gql } from '@apollo/client';

export const GET_VIDEO_BLOG_ENTITIES = gql`
  query LandingPageVideoBlogsRouteByPath(
    $path: String!
    $publication: PublicationEnum
    $overviewPageSize: Int!
    $overviewPageOffset: Int!
    $filter: [ContentTypeEnum]
  ) @api(name: cms) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        canonical
        preferred
        statusCode
        object {
          ... on LandingPage {
            id
            nid
            channel {
              id
              channelType
              settings {
                channel {
                  id
                  title
                }
                title
                lead
                headerLayout
                headerImage {
                  id
                  file(style: "large") {
                    id
                    alt
                    relativeOriginPath
                    focalPointX
                    focalPointY
                  }
                }
                teaserGridLayout
                hasHeroTeaser
              }
              authors(limit: 1) {
                edges {
                  node {
                    id
                    name
                    description
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
              entities(
                filter: $filter
                limit: $overviewPageSize
                offset: $overviewPageOffset
              ) {
                count
                edges {
                  node {
                    ... on Video {
                      id
                      preferredUri
                      shortTitle
                      title
                      brightcoveId
                      publicationDate
                      changeDate
                      caption
                      credit
                      teaserImage {
                        id
                        image {
                          id
                          file(style: "large") {
                            id
                            relativeOriginPath
                            focalPointX
                            focalPointY
                          }
                        }
                      }
                      useAutoHyphens
                    }
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
