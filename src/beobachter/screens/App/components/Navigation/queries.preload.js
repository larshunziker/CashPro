import { gqldata } from 'helpers/gqldata-tag';

export const GET_NAVIGATION = gqldata`
  query PrimaryNavigation @api(name: cms) {
    navigationSecondaryMenu: menuByName(name: "beo-navigation-secondary") {
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
    navigationQuickAccessMenu: menuByName(name: "beo-navigation-quickaccess") {
      id
      name
      links(limit: 100) {
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
  fragment MenuLinkFragment on MenuLink {
    label
    description
    path
    routed
    expanded
    linkRel
  }
`;
