/**
 * @file   video blog landing page graphql queries
 * @author Karol Stępień <karol.stepien@dreamlab.pl>
 * @date   2019-03-01 15:16:06
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
  ) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        canonical
        preferred
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
