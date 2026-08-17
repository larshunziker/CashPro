import { gql } from '@apollo/client';

export const keywordListFragment = gql`
  fragment KeywordListFragment on KeywordConnection {
    edges {
      node {
        id
        label
        preferredUri
        tid
      }
    }
  }
`;
