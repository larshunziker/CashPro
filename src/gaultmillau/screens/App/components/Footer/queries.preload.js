import { gqldata } from 'helpers/gqldata-tag';

export const GET_FOOTER = gqldata`
  query FooterNavigation {
    footerPrimaryMenu: menuByName(name: "gm-footer-primary") {
      ...FooterMenuFragment
    }
    footerPrimaryMenuFr: menuByName(name: "gm-fr-footer") {
      ...FooterMenuFragment
    }
    publicationsMenu: menuByName(name: "publications") {
      ...FooterPublicationsFragment
    }
  }

  fragment FooterMenuFragment on Menu {
    id
    name
    links {
      edges {
        node {
          id
          subtree {
            edges {
              node {
                id
                link {
                  label
                  description
                  path
                  routed
                }
              }
            }
          }
        }
      }
    }
  }

  fragment FooterPublicationsFragment on Menu {
    id
    name
    links {
      edges {
        node {
          id
          link {
            label
            description
            path
            routed
          }
        }
      }
    }
  }
`;
