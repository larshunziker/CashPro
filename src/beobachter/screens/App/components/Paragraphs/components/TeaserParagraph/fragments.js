/**
 *
 */

import { gql } from '@apollo/client';

export const teaserParagraphFragment = gql`
  fragment TeaserParagraphFragment on TeaserParagraph {
    anchorId
    teasers(limit: 1) {
      edges {
        node {
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
          ... on RouteObjectInterface {
            preferredUri
          }
          ... on Product {
            id
            link {
              path
            }
            useAutoHyphens
          }
          ... on Article {
            id
            subtypeValue: articleType
            useAutoHyphens
            badgeLabel
            badgeColor
          }
        }
      }
    }
  }
`;
