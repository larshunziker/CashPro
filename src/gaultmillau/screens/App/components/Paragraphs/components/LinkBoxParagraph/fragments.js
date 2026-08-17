import { gql } from '@apollo/client';

export const linkBoxParagraphFragment = gql`
  fragment LinkBoxParagraphFragment on LinkBoxParagraph {
    anchorId
    title
    links(limit: 100) {
      edges {
        node {
          label
          path
          routed
        }
      }
    }
  }
`;
