/**
 * @file   router queries
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-05-20 16:19:53
 *
 */

import { gql } from '@apollo/client';
import { articleFragment } from 'Article/fragments';
import { authorFragment } from 'Author/fragments';
import { channelFragment } from 'Channel/fragments';
import { imageGalleryArticleFragment } from 'ImageGalleryArticle/fragments';
import { keywordFragment } from 'Keyword/fragments';
import { landingPageFragment } from 'LandingPage/fragments';
import { nativeAdvertisingFragment } from 'NativeAdvertising/fragments';
import { pageScreenFragment } from 'PageScreen/fragments';
import { topicFragment } from 'Topic/fragments';
import { videoFragment } from 'Video/fragments';

export const ROUTER_ROUTE_BY_PATH_QUERY = gql`
  query RouterRouteByPath(
    $path: String!
    $publication: PublicationEnum
    $overviewPageSize: Int!
    $overviewPageOffset: Int!
    $landingPageGridSize: Int!
    $landingPageGridOffset: Int!
    $entityQueueLimit: Int!
  ) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        canonical
        preferred
        statusCode
        object {
          ...ArticleFragment
          ...AuthorFragment
          ...ChannelFragment
          ...ImageGalleryArticleFragment
          ...KeywordFragment
          ...LandingPageFragment
          ...NativeAdvertisingFragment
          ...PageFragment
          ...TopicFragment
          ...VideoFragment
        }
      }
    }
  }
  ${articleFragment}
  ${authorFragment}
  ${channelFragment}
  ${imageGalleryArticleFragment}
  ${keywordFragment}
  ${landingPageFragment}
  ${nativeAdvertisingFragment}
  ${pageScreenFragment}
  ${topicFragment}
  ${videoFragment}
`;
