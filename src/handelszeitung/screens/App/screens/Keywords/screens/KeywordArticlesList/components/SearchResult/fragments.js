import { gql } from '@apollo/client';

export const keywordSearchResultFragment = gql`
  fragment KeywordSearchResultFragment on SearchableUnionConnection {
    edges {
      node {
        ... on NativeAdvertising {
          id
          gcid
          title
          lead
          trackingTeaserImpression
          trackingTeaserClick
          subtypeValue: advertisingTypeValue
          advertisingTypeLabel
          shortTitle
          preferredUri
          sponsor {
            id
            title
          }
          link {
            path
            label
          }
          authors(first: 10) {
            edges {
              node {
                id
                name
              }
            }
          }
          teaserImage {
            id
            image {
              id
              file(style: "large", calculateDimensions: true) {
                id
                alt
                relativeOriginPath
                width
                height
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
          lead
          shortTitle
          preferredUri
          restrictionStatus
          channel {
            id
            title
          }
          teaserImage {
            id
            image {
              id
              file(style: "large", calculateDimensions: true) {
                id
                alt
                relativeOriginPath
                width
                height
                focalPointX
                focalPointY
              }
            }
          }
          useAutoHyphens
        }
        ... on Article {
          id
          title
          subtypeValue: articleType
          changeDate
          restrictionStatus
          shortTitle
          lead
          preferredUri
          hasVideo
          publicationDate
          channel {
            id
            title
          }
          authors(limit: 5) {
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
          relatedPersons(limit: 2) {
            edges {
              node {
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
              }
            }
          }
          teaserImage {
            id
            image {
              id
              file(style: "large", calculateDimensions: true) {
                id
                alt
                relativeOriginPath
                width
                height
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
`;
