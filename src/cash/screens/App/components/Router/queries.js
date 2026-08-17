import { gql } from '@apollo/client';
import { articleFragment } from 'Article/fragments';
import { authorFragment } from 'Author/fragments';
import { explainingArticleFragment } from 'ExplainingArticle/fragments';
import { landingPageFragment } from 'LandingPage/fragments';
import { nativeAdvertisingFragment } from 'NativeAdvertising/fragments';
import { pageScreenFragment } from 'PageScreen/fragments';
import { sponsorFragment } from 'Sponsor/fragments';
import { videoFragment } from 'Video/fragments';

export const ROUTER_ROUTE_BY_PATH_QUERY = gql`
  query RouterRouteByPath(
    $path: String!
    $publication: PublicationEnum
    $landingPageGridPageSize: Int!
    $landingPageGridOffset: Int!
    $sort: SortTypeEnum
  ) @api(name: cms) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        canonical
        preferred
        statusCode
        object {
          ...ArticleFragment
          ...NativeAdvertisingFragment
          ...LandingPageFragment
          ...PageScreenFragment
          ...VideoFragment
          ...SponsorFragment
          ...ExplainingArticleFragment
          ...AuthorFragment
        }
      }
    }
  }
  ${articleFragment}
  ${nativeAdvertisingFragment}
  ${landingPageFragment}
  ${pageScreenFragment}
  ${videoFragment}
  ${sponsorFragment}
  ${explainingArticleFragment}
  ${authorFragment}
`;
