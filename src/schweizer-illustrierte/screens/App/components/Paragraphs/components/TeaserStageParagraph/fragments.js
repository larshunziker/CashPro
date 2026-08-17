import { gql } from '@apollo/client';
import { imageGalleryTeaserFragment } from '../../../Teaser/fragments';

export const teaserStageParagraphFragment = gql`
  fragment TeaserStageParagraphFragment on TeaserStageParagraph {
    anchorId
    hasSponsoring
    id
    style
    termReference {
      ... on Channel {
        id
        landingPage {
          id
          preferredUri
          title
          shortTitle
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
        title
        preferredUri
        channelType
        logoChoice
        sponsors(limit: 1) {
          edges {
            node {
              id
              title
              prefix
              teaserImage {
                id
                link {
                  path
                }
              }
              logoStandalone {
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
        partners(limit: 3) {
          edges {
            node {
              ... on Sponsor {
                id
                title
                canonicalUri
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
      }
      ... on Keyword {
        id
        label
        preferredUri
        settings {
          channel {
            id
            channelType
          }
        }
      }
    }
    title
    imageFormat
    image {
      source
    }
    entities(
      filter: [
        Article
        Recipe
        ImageGallery
        NativeAdvertising
        Video
        LandingPage
        Teaser
      ]
      additionalPublications: [GM, HZ, BEO, TELE]
    ) {
      edges {
        node {
          ... on Video {
            id
            title
            preferredUri(additionalPublications: [GM, HZ, BEO, TELE])
            publication(additionalPublications: [GM, HZ, BEO, TELE])
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
          ... on ImageGallery {
            id
            title
            preferredUri(additionalPublications: [GM, HZ, BEO, TELE])
            publication(additionalPublications: [GM, HZ, BEO, TELE])
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
          ... on Article {
            gcid
            id
            title
            preferredUri(additionalPublications: [GM, HZ, BEO, TELE])
            publication(additionalPublications: [GM, HZ, BEO, TELE])
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
          ... on Recipe {
            nid
            id
            title
            lead
            shortTitle
            createDate
            canonicalUri
            preferredUri(additionalPublications: [GM, HZ, BEO, TELE])
            publication(additionalPublications: [GM, HZ, BEO, TELE])
            recipeType
            hasVideo
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
            useAutoHyphens
          }
          ... on NativeAdvertising {
            gcid
            id
            title
            preferredUri(additionalPublications: [GM, HZ, BEO, TELE])
            publication(additionalPublications: [GM, HZ, BEO, TELE])
            shortTitle
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
          ... on Teaser {
            id
            title
            link {
              path
              label
            }
            shortTitle
            trackingEnabled
            trackingTeaserImpression
            trackingTeaserClick
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

          ... on LandingPage {
            gcid
            id
            title
            preferredUri(additionalPublications: [GM, HZ, BEO, TELE])
            publication(additionalPublications: [GM, HZ, BEO, TELE])
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
  }
  ${imageGalleryTeaserFragment}
`;
