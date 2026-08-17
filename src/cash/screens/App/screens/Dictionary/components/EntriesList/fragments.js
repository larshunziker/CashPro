import { gql } from '@apollo/client';

export const dictionaryArticleListFragment = gql`
  fragment DictionaryArticleListFragment on TitleAliasConnection {
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
