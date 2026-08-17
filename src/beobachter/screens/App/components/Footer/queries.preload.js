import { gqldata } from 'helpers/gqldata-tag';

export const GET_FOOTER = gqldata`
  query FooterNavigation @api(name: cms) {
    footerPrimaryMenu: menuByName(name: "beo-footer-primary") {
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
          link {
            label
          }
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
