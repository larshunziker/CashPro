import { gql } from '@apollo/client';
import { videoRecommendationFragment } from './fragments';

export const GET_ALL_VIDEO_RECOMMENDATIONS = gql`
  query VideoDetailRecommendationsAllVideos(
    $publication: PublicationEnum
    $path: String!
    $termId: Int
  ) @api(name: cms) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        object {
          ... on Video {
            id
            newer: timeRelatedContent(
              mode: Newer
              channelIds: [$termId]
              limit: 6
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
              limit: 6
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
