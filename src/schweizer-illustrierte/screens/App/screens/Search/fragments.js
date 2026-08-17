import { gql } from '@apollo/client';
import { imageGalleryTeaserFragment } from 'Teaser/fragments';

export const searchResultFragment = gql`
  fragment SearchResultFragment on SearchableUnionConnection {
    edges {
      node {
        ... on Article {
          id
          preferredUri
          title
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
        ... on NativeAdvertising {
          gcid
          preferredUri
          id
          title
          shortTitle
          hasVideo
          trackingTeaserClick
          trackingTeaserImpression
          subtypeValue: advertisingTypeValue
          advertisingTypeLabel
          lead
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
        ... on LandingPage {
          id
          title
          lead
          shortTitle
          preferredUri
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
        ...ImageGalleryTeaserFragment
        ... on Keyword {
          id
          label
          preferredUri
          settings {
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

  ${imageGalleryTeaserFragment}
  }
`;
