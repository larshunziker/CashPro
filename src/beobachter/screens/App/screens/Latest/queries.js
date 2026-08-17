//

import { gql } from '@apollo/client';

export const LATEST_QUERY = gql`
  query LatestSearch(
    $query: String!
    $sort: SearchOrderByField
    $contentTypes: [ContentTypeEnum]
    $pageSize: Int
    $offset: Int
    $path: String!
    $publication: PublicationEnum
  ) @api(name: cms) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        canonical
        preferred
        object {
          ... on LandingPage {
            id
            nid
            title
            metaTitle
            metaDescription
            metaOgTitle
            metaOgDescription
            metaCanonicalUrl
            lead
            preferredUri
            channel {
              id
              title
            }
            createDate
            metaKeywords
          }
        }
      }
      globalSearch(
        search: $query
        limit: $pageSize
        offset: $offset
        sort: $sort
        content_types: $contentTypes
      ) {
        count
        edges {
          node {
            ... on Article {
              id
              preferredUri
              lead
              title
              shortTitle
              hasVideo
              publicationDate
              restrictionStatus
              channel {
                id
                title
                preferredUri
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
              authors(first: 10) {
                edges {
                  node {
                    ... on Author {
                      id
                      name
                      headline
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
            }
            ... on ImageGallery {
              preferredUri
              id
              title
              shortTitle
              openInFullscreen
              lead
              restrictionStatus
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
              publicationDate
              channel {
                id
                title
                preferredUri
              }
              useAutoHyphens
            }
            ... on Video {
              preferredUri
              id
              title
              shortTitle
              lead
              restrictionStatus
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
              publicationDate
              channel {
                id
                title
                preferredUri
              }
              useAutoHyphens
            }
          }
        }
      }
    }
  }
`;
