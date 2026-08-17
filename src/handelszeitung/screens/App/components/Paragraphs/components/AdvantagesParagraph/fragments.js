import { gql } from '@apollo/client';

export const advantagesParagraphFragment = gql`
  fragment AdvantagesParagraphFragment on AdvantagesParagraph {
    header
    advantagesItems {
      id
      text
      link {
        path
        routed
        label
      }
      image {
        filename
        source
      }
    }
  }
`;
