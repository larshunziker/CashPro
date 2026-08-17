import { gql } from '@apollo/client';

export const articleFooterFragment = gql`
  fragment ArticleFooterFragment on ProfileKeywordUnionConnection {
    edges {
      node {
        ... on Person {
          id
          preferredUri
          label: title
          nid
        }
        ... on Organization {
          id
          preferredUri
          label: title
          nid
        }
        ... on Keyword {
          id
          label
          tid
        }
      }
    }
  }
`;

export const articleFooterKeywordsFragment = gql`
  fragment ArticleFooterKeywordsFragment on KeywordConnection {
    edges {
      node {
        preferredUri
        label
        tid
      }
    }
  }
`;
