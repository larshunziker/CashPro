import { gql } from '@apollo/client';
import { imageGalleryTeaserFragment } from 'Teaser/fragments';

export const entityQueueParagraphFragment = gql`
  fragment EntityQueueParagraphFragment on EntityQueueParagraph {
    anchorId
    id
    title
    style
    landingPage {
      id
      title
      preferredUri
    }
    entityQueue {
      items(limit: $entityQueueLimit) {
        edges {
          node {
            ... on LandingPage {
              id
              gcid
              title
              lead
              shortTitle
              preferredUri
              useNativeAdvertising
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
                channelType
                settings {
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
            ...ImageGalleryTeaserFragment
            ... on Teaser {
              id
              shortTitle
              title
              style
              trackingEnabled
              trackingTeaserImpression
              trackingTeaserClick
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
              link {
                path
                label
              }
              useAutoHyphens
            }
            ... on Article {
              gcid
              id
              title
              lead
              shortTitle
              badgeLabel
              badgeColor
              hasVideo
              preferredUri
              useNativeAdvertising
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
            ... on NativeAdvertising {
              gcid
              id
              title
              lead
              shortTitle
              hasVideo
              preferredUri
              trackingTeaserClick
              trackingTeaserImpression
              subtypeValue: advertisingTypeValue
              advertisingTypeLabel
              channel {
                id
                title
                channelType
                suppressAds
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
            ... on Video {
              id
              title
              shortTitle
              preferredUri
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
  ${imageGalleryTeaserFragment}
`;
