/**
 * @file   video graphql queries
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-01-29 13:16:06
 *
 */

import { gql } from '@apollo/client';
import { videoRecommendationFragment } from './fragments';

export const GET_ALL_VIDEO_RECOMMENDATIONS = gql`
  query VideoDetailRecommendationsAllVideos(
    $publication: PublicationEnum
    $path: String!
    $termId: Int
  ) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        object {
          ... on Video {
            id
            newer: timeRelatedContent(
              mode: Newer
              channelIds: [$termId]
              limit: 4
            ) {
              edges {
                node {
                  ...VideoRecommendation
                }
              }
            }
            older: timeRelatedContent(
              mode: Older
              channelIds: [$termId]
              limit: 4
            ) {
              edges {
                node {
                  ...VideoRecommendation
                }
              }
            }
          }
        }
      }
    }
  }
  ${videoRecommendationFragment}
`;
