/**
 * @file   Navigation Queries
 * @author Alexandra Geier <alexandra.geier@ringieraxelspringer.ch>
 * @date   2019-10-07
 */

import { gqldata } from 'helpers/gqldata-tag';

export const GET_NAVIGATION = gqldata`
  query PrimaryNavigation {
    navigationMenuHZ: menuByName(name: "hz-navigation-primary-hz") {
      id
      name
      links(limit: 100) {
        edges {
          node {
            id
            link {
              ...MenuLinkFragment
            }
            subtree(limit: 100) {
              edges {
                node {
                  id
                  link {
                    ...MenuLinkFragment
                  }
                }
              }
            }
          }
        }
      }
    }
    navigationMenuBIL: menuByName(name: "hz-navigation-primary-bil") {
      id
      name
      links(limit: 100) {
        edges {
          node {
            id
            link {
              ...MenuLinkFragment
            }
            subtree(limit: 100) {
              edges {
                node {
                  id
                  link {
                    ...MenuLinkFragment
                  }
                }
              }
            }
          }
        }
      }
    }
    navigationMenuSV: menuByName(name: "hz-navigation-primary-sv") {
      id
      name
      links(limit: 100) {
        edges {
          node {
            id
            link {
              ...MenuLinkFragment
            }
            subtree(limit: 100) {
              edges {
                node {
                  id
                  link {
                    ...MenuLinkFragment
                  }
                }
              }
            }
          }
        }
      }
    }
    navigationMenuHZB: menuByName(name: "hz-navigation-primary-hzb") {
      id
      name
      links(limit: 100) {
        edges {
          node {
            id
            link {
              ...MenuLinkFragment
            }
            subtree(limit: 100) {
              edges {
                node {
                  id
                  link {
                    ...MenuLinkFragment
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  fragment MenuLinkFragment on MenuLink {
    label
    description
    path
    routed
    expanded
  }
`;
