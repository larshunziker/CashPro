import { gql } from '@apollo/client';

export const teaserParagraphFragment = gql`
  fragment TeaserParagraphFragment on TeaserParagraph {
    id
    anchorId
    teasers(limit: 1) {
      edges {
        node {
          ... on Teaser {
            id
            link {
              path
            }
            trackingEnabled
            trackingTeaserImpression
            trackingTeaserClick
            title
            shortTitle
            lead
            teaserImage {
              caption
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
        }
      }
    }
  }
`;
