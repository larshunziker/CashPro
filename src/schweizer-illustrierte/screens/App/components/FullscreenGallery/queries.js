/**
 * @file   fullscreengallery query
 *
 */

import { gql } from '@apollo/client';
import { keywordsFragment } from 'Keywords/fragments';

export const FULLSCREEN_GALLERY_QUERY = gql`
  query FullscreenRouteByPath($path: String!, $publication: PublicationEnum) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        preferred
        canonical
        object {
          ... on Article {
            id
            nid
            title
            shortTitle
            changeDate
            createDate
            publicationDate
            preferredUri
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
              }
            }
            keywords(limit: 100) {
              ...KeywordsFragment
            }
            authors(limit: 1) {
              edges {
                node {
                  id
                  name
                }
              }
            }
            media(types: [Image]) {
              count
              edges {
                node {
                  ... on ImageParagraph {
                    id
                    format
                    caption
                    suppressSource
                    image {
                      id
                      credit
                      showOriginal
                      file(style: "large") {
                        id
                        alt
                        relativeOriginPath
                        focalPointX
                        focalPointY
                        origin
                      }
                    }
                  }
                }
              }
            }
            useAutoHyphens
          }

          ... on NativeAdvertising {
            id
            nid
            title
            shortTitle
            changeDate
            createDate
            publicationDate
            preferredUri
            subtypeValue: advertisingTypeValue
            advertisingTypeLabel
            link {
              path
              label
            }
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
            keywords(limit: 100) {
              edges {
                node {
                  id
                  tid
                  label
                }
              }
            }
            authors(limit: 1) {
              edges {
                node {
                  id
                  name
                }
              }
            }
            media(types: [Image]) {
              count
              edges {
                node {
                  ... on ImageParagraph {
                    id
                    format
                    caption
                    suppressSource
                    image {
                      id
                      credit
                      showOriginal
                      file(style: "large") {
                        id
                        alt
                        relativeOriginPath
                        focalPointX
                        focalPointY
                        origin
                      }
                    }
                  }
                }
              }
            }
            useAutoHyphens
          }

          ... on LandingPage {
            id
            nid
            title
            shortTitle
            preferredUri
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
              }
            }
            createDate
            media(types: [Image]) {
              count
              edges {
                node {
                  ... on ImageParagraph {
                    id
                    format
                    caption
                    suppressSource
                    image {
                      id
                      credit
                      showOriginal
                      file(style: "large") {
                        id
                        alt
                        relativeOriginPath
                        focalPointX
                        focalPointY
                        origin
                      }
                    }
                  }
                }
              }
            }
            useAutoHyphens
          }

          ... on Page {
            id
            nid
            title
            shortTitle
            preferredUri
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
              }
            }
            createDate
            media(types: [Image]) {
              count
              edges {
                node {
                  ... on ImageParagraph {
                    id
                    format
                    caption
                    suppressSource
                    image {
                      id
                      credit
                      showOriginal
                      file(style: "large") {
                        id
                        alt
                        relativeOriginPath
                        focalPointX
                        focalPointY
                        origin
                      }
                    }
                  }
                }
              }
            }
            useAutoHyphens
          }

          ... on ImageGallery {
            id
            nid
            title
            shortTitle
            seoTitle
            changeDate
            createDate
            publicationDate
            preferredUri
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
              }
            }
            keywords(limit: 100) {
              edges {
                node {
                  id
                  label
                }
              }
            }
            authors(limit: 1) {
              edges {
                node {
                  id
                  name
                }
              }
            }
            media(types: [Image]) {
              count
              edges {
                node {
                  ... on ImageParagraph {
                    id
                    format
                    caption
                    suppressSource
                    image {
                      id
                      credit
                      showOriginal
                      file(style: "large") {
                        id
                        alt
                        relativeOriginPath
                        focalPointX
                        focalPointY
                        origin
                      }
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
  }
  ${keywordsFragment}
`;
