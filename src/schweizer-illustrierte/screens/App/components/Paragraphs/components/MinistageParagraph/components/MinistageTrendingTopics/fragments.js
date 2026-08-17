import { gql } from '@apollo/client';

export const ministageTrendingTopicsFragment = gql`
  fragment MinistageTrendingTopicsFragment on MinistageTrendingTopics {
    headline
    keywords(limit: 12) {
      edges {
        node {
          id
          label
          preferredUri
        }
      }
    }
  }
`;
