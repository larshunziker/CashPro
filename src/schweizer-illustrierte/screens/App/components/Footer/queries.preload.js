import { gqldata } from 'helpers/gqldata-tag';

export const query = gqldata`
query FooterNavigation {
  menuByName(name: "si-footer-primary") {
    ...FooterMenuFragment
  }
}

fragment FooterMenuFragment on Menu {
  id
  name
  links {
    edges {
      node {
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
