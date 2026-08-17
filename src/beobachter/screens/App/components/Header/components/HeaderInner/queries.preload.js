import { gqldata } from 'helpers/gqldata-tag';

export const GET_NAVIGATION = gqldata`
  query PrimaryNavigation @api(name: cms) {
    navigationPrimaryMenu: menuByName(name: "beo-navigation-primary") {
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
  }
  fragment MenuLinkFragment on MenuLink {
    label
    description
    path
    routed
    expanded
    linkRel
  }
`;
