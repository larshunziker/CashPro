/**
 * @file   keyword graphql fragments
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2019-06-21
 *
 */

import { gql } from '@apollo/client';
import { imageGalleryTeaserFragment } from 'Teaser/fragments';

export const keywordFragment = gql`
  fragment KeywordFragment on Keyword {
    id
    tid
    label
    preferredUri
    settings {
      channel {
        id
        title
      }
      mainChannel {
        id
        title
      }
      title
      lead
      seoTitle
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
    entities(
      limit: $overviewPageSize
      offset: $overviewPageOffset
      filter: [Article, ImageGallery, KeywordSettings, NativeAdvertising, Video]
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
          ... on Video {
            id
            title
            preferredUri
            shortTitle
            hasVideo
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
            id
            gcid
            title
            preferredUri
            shortTitle
            trackingTeaserClick
            trackingTeaserImpression
            subtypeValue: advertisingTypeValue
            advertisingTypeLabel
            lead
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
    activeMenuTrail {
      edges {
        node {
          id
          label
          link
        }
      }
    }
  }
  ${imageGalleryTeaserFragment}
`;
