/**
 * @file   horoscope queries
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2019-07-09
 *
 */

import { gql } from '@apollo/client';
import { paragraphsFragment } from 'Paragraphs/fragments';

export const GET_HOROSCOPE_PAGE = gql`
  query HoroscopeRouteByPath(
    $publication: PublicationEnum
    $path: String!
    $entityQueueLimit: Int!
  ) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        canonical
        preferred
        object {
          ... on LandingPage {
            id
            nid
            gcid
            title
            metaTitle
            metaDescription
            metaOgTitle
            metaOgDescription
            metaCanonicalUrl
            lead
            preferredUri
            channel {
              id
              title
              suppressAds
            }
            createDate
            metaKeywords
            activeMenuTrail {
              edges {
                node {
                  id
                  label
                  link
                }
              }
            }
            body {
              ...ParagraphsFragment
            }
            teaserImage {
              id
              image {
                id
                file(style: "16x9_1130") {
                  id
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
  }
  ${paragraphsFragment}
`;
