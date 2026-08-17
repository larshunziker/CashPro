import { gql } from '@apollo/client';
import { ImageGalleryTeaserFragment } from 'Teaser/fragments';

export const topicFragment = gql`
  fragment TopicFragment on Topic {
    id
    nid
    gcid
    canonicalUri
    preferredUri
    editContentUri
    editRelationUri
    changedDate
    createDate
    revisionDate
    changeDate
    publicationDate
    publicationDomain
    publication
    type
    title
    seoTitle
    seoDescription
    description
    heroImageBody {
      ... on ImageParagraph {
        id
        image {
          id
          file {
            id
            relativeOriginPath
          }
        }
      }
    }
    metaTitle
    metaDescription
    metaOgTitle
    metaOgDescription
    entities(limit: $overviewPageSize, offset: $overviewPageOffset) {
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
          ... on Recipe {
            nid
            id
            title
            lead
            shortTitle
            createDate
            canonicalUri
            preferredUri
            publication
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
        }
      }
    }
  }
`;
