import { gql } from '@apollo/client';

export const nativeAdvertisingCarouselParagraphFragment = gql`
  fragment NativeAdvertisingCarouselParagraphFragment on NativeAdvertisingCarouselParagraph {
    anchorId
    id
    nativeAdvertising(additionalPublications: [HZ]) {
      edges {
        node {
          ... on NativeAdvertising {
            id
            gcid
            title
            lead
            subtypeValue: advertisingTypeValue
            advertisingTypeLabel
            shortTitle
            changeDate
            publicationDate
            trackingTeaserImpression
            trackingTeaserClick
            preferredUri
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
            sponsor {
              id
              title
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
            useAutoHyphens
          }
        }
      }
    }
  }
`;
