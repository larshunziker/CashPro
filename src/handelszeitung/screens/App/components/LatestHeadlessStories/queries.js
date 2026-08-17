/**
 * @file   Latest Headless Stories graphQL queries
 * @author Alexandra Geier <alexandra.geier@ringieraxelspringer.ch>
 * @date   2019-07-03
 */

import { gql } from '@apollo/client';

export const GET_LATEST_HEADLESS_STORIES = gql`
  query GetLatestStories($limit: Int, $publication: PublicationEnum) {
    environment(publication: $publication) {
      latestHeadlessStories: headlessArticles(limit: $limit) {
        edges {
          node {
            ... on Article {
              id
              title
              restrictionStatus
              preferredUri
              publicationDate
              useAutoHyphens
            }
          }
        }
      }
    }
  }
`;
