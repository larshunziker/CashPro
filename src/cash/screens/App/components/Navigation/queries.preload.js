import { gqldata } from 'helpers/gqldata-tag';

export const query = gqldata`
query PrimaryNavigation {
  navigationPrimaryMenu: menuByName(name: "cash-navigation-primary") { 
    id
    name
    links(limit: 50) {
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
    }
  }
  navigationSecondaryMenu: menuByName(name: "cash-navigation-secondary") {
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
  isMainChannel
}
`;
