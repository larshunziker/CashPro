import { gql } from '@apollo/client';

export const explainingArticleListFragment = gql`
  fragment ExplainingArticleListFragment on TitleAliasConnection {
    edges {
      node {
        id
        title
        target {
          preferredUri
        }
      }
    }
  }
`;
