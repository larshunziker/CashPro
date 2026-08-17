import { gqldata } from 'helpers/gqldata-tag';

export const query = gqldata`
query PrimaryNavigation {
  navigationPrimaryMenu: menuByName(name: "si-navigation-primary") {
    id
    name
    links(limit: 100) {
      edges {
        node {
          link {
            ...MenuLinkFragment
          }
          subtree(limit: 100) {
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
}

fragment MenuLinkFragment on MenuLink {
  label
  description
  path
  routed
  isMainChannel
}
`;
