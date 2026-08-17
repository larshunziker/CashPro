/**
 * @file   navigation menu queries
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2019-03-08
 *
 */

import { gql } from '@apollo/client';

export const NAVIGATION_MENU_ROUTE = gql`
  query NavigationMenuRouteByPath {
    environment(publication: SI) {
      routeByPath(path: "si-menu-teaser") {
        canonical
        preferred
        object {
          ... on LandingPage {
            id
            body {
              ... on EntityQueueParagraph {
                entityQueue {
                  items {
                    edges {
                      node {
                        ... on Teaser {
                          id
                          shortTitle
                          title
                          style
                          trackingEnabled
                          trackingTeaserImpression
                          trackingTeaserClick
                          teaserImage {
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
              }
            }
          }
        }
      }
    }
  }
`;
