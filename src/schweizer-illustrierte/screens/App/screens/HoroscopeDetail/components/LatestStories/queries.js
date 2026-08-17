/**
 * @file   latest stories on horoscope graphql queries
 * @author Damian Bucki <damian.bucki@dreamlab.pl>
 * @date   2019-04-05
 *
 */

import { gql } from '@apollo/client';

export const GET_LATEST_STORIES = gql`
  query GetLatestStories(
    $contentTypes: [ContentTypeEnum]
    $limit: Int
    $publication: PublicationEnum
    $sort: SearchOrderByField
  ) {
    environment(publication: $publication) {
      latestStories: globalSearch(
        content_types: $contentTypes
        limit: $limit
        search: "*"
        sort: $sort
      ) {
        edges {
          node {
            ... on Article {
              id
              title
              preferredUri
              shortTitle
              badgeLabel
              badgeColor
              hasVideo
              channel {
                id
                title
                channelType
                authors(limit: 1) {
                  edges {
                    node {
                      id
                      name
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
              }
              authors(limit: 1) {
                edges {
                  node {
                    id
                    name
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
              teaserImage {
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
              useAutoHyphens
            }
            ... on ImageGallery {
              id
              preferredUri
              title
              shortTitle
              openInFullscreen
              teaserImage {
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
              body(limit: 1) {
                ... on ImageParagraph {
                  id
                  suppressSource
                }
              }
              useAutoHyphens
            }
            ... on Video {
              preferredUri
              id
              title
              shortTitle
              teaserImage {
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
              useAutoHyphens
            }
          }
        }
      }
    }
  }
`;
