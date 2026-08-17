import { gql } from '@apollo/client';

export const onmedaArticleListFragment = gql`
  fragment OnmedaArticleListFragment on TitleAliasConnection {
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
