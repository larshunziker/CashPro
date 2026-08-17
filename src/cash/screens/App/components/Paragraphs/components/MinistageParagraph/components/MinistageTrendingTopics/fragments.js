//
import { gql } from '@apollo/client';

export const ministageTrendingTopicsFragment = gql`
  fragment MinistageTrendingTopicsFragment on MinistageTrendingTopics {
    headline
    # INFO: keywords also contains referenced channels from cms
    keywords(limit: 12) {
      edges {
        node {
          id
          label
          preferredUri
          link
        }
      }
    }
  }
`;
