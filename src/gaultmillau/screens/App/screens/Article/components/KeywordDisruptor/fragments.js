import { gql } from '@apollo/client';

export const keywordDisruptorFragment = gql`
  fragment KeywordDisruptorFragment on KeywordConnection {
    edges {
      node {
        id
        label
        preferredUri
        image {
          source
        }
      }
    }
  }
`;
