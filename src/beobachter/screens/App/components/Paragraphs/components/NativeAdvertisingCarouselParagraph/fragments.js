import { gql } from '@apollo/client';

export const nativeAdvertisingCarouselParagraphFragment = gql`
  fragment NativeAdvertisingCarouselParagraphFragment on NativeAdvertisingCarouselParagraph {
    id
    anchorId
    nativeAdvertising {
      edges {
        node {
          ... on NativeAdvertising {
            id
            title
            lead
            subtypeValue: advertisingTypeValue
            advertisingTypeLabel
            shortTitle
            publicationDate
            changeDate
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
            link {
              path
              label
            }
            authors(first: 10) {
              edges {
                node {
                  id
                  name
                  imageParagraph {
                    id
                    image {
                      id
                      file(style: "8x3_1130", calculateDimensions: true) {
                        id
                        alt
                        width
                        height
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
              teaserImage {
                id
                title
                image {
                  id
                  file(style: "large", calculateDimensions: true) {
                    id
                    alt
                    width
                    height
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
