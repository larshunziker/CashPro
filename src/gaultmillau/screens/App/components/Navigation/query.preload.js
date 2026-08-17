import { gqldata } from 'helpers/gqldata-tag';

export const GET_NAVIGATION = gqldata`
  query PrimaryNavigation {
    navigationPrimaryMenu: menuByName(name: "gm-navigation-primary") {
      id
      name
      links(first: 100) {
        edges {
          node {
            link {
              ...MenuLinkFragment
            }
            subtree(first: 100) {
              edges {
                node {
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

    navigationPrimaryMenuFr: menuByName(name: "gm-fr-navigation-primary") {
      id
      name
      links(first: 100) {
        edges {
          node {
            link {
              ...MenuLinkFragment
            }
            subtree(first: 100) {
              edges {
                node {
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

    navigationSecondaryMenu: menuByName(name: "gm-navigation-secondary") {
      id
      name
      links(first: 100) {
        edges {
          node {
            link {
              ...MenuLinkFragment
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
