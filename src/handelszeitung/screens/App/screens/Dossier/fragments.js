import { gql } from '@apollo/client';

export const dossierFragment = gql`
  fragment DossierFragment on Dossier {
    nid
    id
    gcid
    canonicalUri
    title
    lead
    metaTitle
    metaDescription
    metaCanonicalUrl
    metaOgTitle
    metaOgDescription
    editContentUri
    editRelationUri
    cloneContentUri
    restrictionStatus
    publication
    createDate
    publicationDate
    changeDate
    channel {
      id
      title
      suppressAds
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
    }
    activeMenuTrail {
      edges {
        node {
          label
          link
        }
      }
    }
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
    keywords(limit: 100) {
      edges {
        node {
          label
        }
      }
    }
    articles(limit: $dossierPageSize, offset: $dossierOffset) {
      count
      edges {
        node {
          ... on Article {
            id
            channel {
              id
              title
            }
            title
            lead
            restrictionStatus
            shortTitle
            changeDate
            publicationDate
            preferredUri
            subtypeValue: articleType
            hasVideo
            teaserImage {
              id
              image {
                id
                file(style: "large", calculateDimensions: true) {
                  id
                  alt
                  relativeOriginPath
                  focalPointX
                  focalPointY
                  width
                  height
                }
              }
            }
            authors {
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
            useAutoHyphens
          }
          ... on NativeAdvertising {
            id
            gcid
            title
            lead
            shortTitle
            changeDate
            trackingTeaserImpression
            trackingTeaserClick
            publication
            publicationDate
            preferredUri
            subtypeValue: advertisingTypeValue
            advertisingTypeLabel
            authors(limit: 10) {
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
            channel {
              id
              title
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
            }
            link {
              path
              label
            }
            sponsor {
              id
              title
              preferredUri
              teaserImage {
                id
                title
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
            hasVideo
            teaserImage {
              id
              caption
              image {
                id
                file(style: "large", calculateDimensions: true) {
                  id
                  alt
                  relativeOriginPath
                  focalPointX
                  focalPointY
                  width
                  height
                }
              }
            }
            useAutoHyphens
          }
        }
      }
    }
  }
`;
