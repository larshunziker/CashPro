import { gql } from '@apollo/client';

export const keywordListFragment = gql`
  fragment KeywordListFragment on KeywordConnection {
    count
    edges {
      node {
        id
        label
        preferredUri
        entities {
          count
        }
      }
    }
  }
`;
