import { gql } from '@apollo/client';

export const articleFooterFragment = gql`
  fragment ArticleFooterFragment on ProfileKeywordUnionConnection {
    edges {
      node {
        ... on Person {
          preferredUri
          label: title
          nid
        }
        ... on Organization {
          preferredUri
          label: title
          nid
        }
        ... on Keyword {
          preferredUri
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
