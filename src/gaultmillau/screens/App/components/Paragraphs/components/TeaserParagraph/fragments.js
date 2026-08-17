/**
 * @file   teaser paragraph fragments
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2018-07-30
 *
 */

import { gql } from '@apollo/client';

export const teaserParagraphFragment = gql`
  fragment TeaserParagraphFragment on TeaserParagraph {
    id
    anchorId
    detailView
    title
    teasers(limit: 1) {
      edges {
        node {
          ... on Recipe {
            id
            shortTitle
            organization {
              address
              city
              zipCode
              phone
              website
              organizationData {
                id
                restaurantName
                secondaryName
              }
            }
            cookingTime
            energy
            ingredients
            instructions {
              ... on TextParagraph {
                id
                header
                text
              }
            }
            preparationTime
            quantity
            useAutoHyphens
          }

          ... on RouteObjectInterface {
            preferredUri
          }

          ... on Product {
            id
            description
            link {
              label
              path
            }
            useAutoHyphens
          }

          ... on Article {
            id
            subtypeValue: articleType
            useAutoHyphens
          }

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
      }
    }
    style
  }
`;
