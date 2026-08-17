import { gql } from '@apollo/client';

export const teaserParagraphFragment = gql`
  fragment TeaserParagraphFragment on TeaserParagraph {
    anchorId
    id
    teasers {
      edges {
        node {
          ... on Product {
            id
            title
            shortTitle
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
            price
            pricePrefix
            link {
              label
              path
            }
            useAutoHyphens
          }
          ... on Teaser {
            id
            shortTitle
            title
            lead
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
        }
      }
    }
  }
`;
