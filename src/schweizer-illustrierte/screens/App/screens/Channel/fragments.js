/**
 *
 */

import { gql } from '@apollo/client';
import { imageGalleryTeaserFragment } from 'Teaser/fragments';

export const channelFragment = gql`
  fragment ChannelFragment on Channel {
    id
    tid
    suppressAds
    canonicalUri
    preferredUri
    editContentUri
    settings {
      channel {
        id
        title
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
      mainChannel {
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
    landingPage {
      id
      title
      metaTitle
      metaDescription
      metaOgTitle
      metaOgDescription
      metaCanonicalUrl
      lead
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
      preferredUri
      activeMenuTrail {
        edges {
          node {
            id
            link
            label
          }
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
    entities(
      filter: [Article, ImageGallery, NativeAdvertising]
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
                file(style: "16x9_560") {
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
          ... on NativeAdvertising {
            id
            gcid
            title
            lead
            shortTitle
            hasVideo
            preferredUri
            trackingTeaserClick
            trackingTeaserImpression
            subtypeValue: advertisingTypeValue
            advertisingTypeLabel
            link {
              path
              label
            }
            sponsor {
              id
              title
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
          ...ImageGalleryTeaserFragment
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
