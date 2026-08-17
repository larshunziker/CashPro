import { gql } from '@apollo/client';
import { imageGalleryTeaserFragment } from 'Teaser/fragments';

export const GET_SPECIAL_ENTITIES = gql`
  query LandingPageSpecialsRouteByPath(
    $path: String!
    $overviewPageSize: Int!
    $overviewPageOffset: Int!
    $filter: [ContentTypeEnum]
  ) {
    environment(publication: SI) {
      routeByPath(path: $path) {
        canonical
        preferred
        statusCode
        object {
          ... on LandingPage {
            id
            title
            nid
            gcid
            shortTitle
            metaCanonicalUrl
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
            channel {
              id
              channelType
              sponsor {
                id
                title
                colorCode
                teaserImage {
                  id
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
              }
              partners {
                edges {
                  node {
                    ... on Sponsor {
                      id
                      title
                    }
                  }
                }
              }
              special {
                id
                title
                logo {
                  source
                }
                colorCode
                format
              }
              settings {
                channel {
                  id
                  title
                }
                hierarchy {
                  count
                  edges {
                    node {
                      id
                      title
                      tid
                    }
                  }
                }
                title
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
              }
              entities(
                filter: $filter
                limit: $overviewPageSize
                offset: $overviewPageOffset
              ) {
                count
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
                      title
                      preferredUri
                      shortTitle
                      badgeLabel
                      badgeColor
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
                    ...ImageGalleryTeaserFragment
                    ... on NativeAdvertising {
                      gcid
                      id
                      title
                      shortTitle
                      lead
                      hasVideo
                      preferredUri
                      trackingTeaserClick
                      trackingTeaserImpression
                      subtypeValue: advertisingTypeValue
                      advertisingTypeLabel
                      channel {
                        id
                        title
                        sponsors {
                          edges {
                            node {
                              id
                              title
                            }
                          }
                        }
                        settings {
                          mainChannel {
                            id
                            title
                          }
                          hierarchy {
                            count
                            edges {
                              node {
                                id
                                title
                                tid
                              }
                            }
                          }
                        }
                      }
                      link {
                        path
                        label
                      }
                      sponsor {
                        id
                        title
                      }
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
  ${imageGalleryTeaserFragment}
`;

export const GET_VIDEO_BLOG_ENTITIES = gql`
  query LandingPageVideoBlogsRouteByPath(
    $path: String!
    $overviewPageSize: Int!
    $overviewPageOffset: Int!
    $filter: [ContentTypeEnum]
  ) {
    environment(publication: SI) {
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
                hierarchy {
                  count
                  edges {
                    node {
                      id
                      title
                      tid
                    }
                  }
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

export const GET_BLOG_ENTITIES = gql`
  query LandingPageBlogsRouteByPath(
    $path: String!
    $overviewPageSize: Int!
    $overviewPageOffset: Int!
    $filter: [ContentTypeEnum]
  ) {
    environment(publication: SI) {
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
                hierarchy {
                  count
                  edges {
                    node {
                      id
                      title
                      tid
                    }
                  }
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
                    ... on Article {
                      gcid
                      id
                      title
                      preferredUri
                      shortTitle
                      badgeLabel
                      badgeColor
                      hasVideo
                      sponsor {
                        id
                        title
                      }
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
