import { gql } from '@apollo/client';
import { articleFragment } from './../../screens/Article/fragments';
import { authorFragment } from './../../screens/Author/fragments';
import { keywordArticlesListFragment } from './../../screens/Keywords/screens/KeywordArticlesList/fragments';
import { landingPageFragment } from './../../screens/LandingPage/fragments';
import { nativeAdvertisingFragment } from './../../screens/NativeAdvertising/fragments';
import { explainingArticleFragment } from './../../screens/././ExplainingArticles/screens/Article/fragments';
import { pageScreenFragment } from './../../screens/PageScreen/fragments';
import { sponsorFragment } from './../../screens/Sponsor/fragments';
import { videoFragment } from './../../screens/Video/fragments';
import { legalAdviceChannelItemFragment } from '../../screens/ArticlePage/components/ArticlePageLegalAdvice/queries';

export const ROUTER_ROUTE_BY_PATH_QUERY = gql`
  query RouteByPath(
    $path: String!
    $publication: PublicationEnum
    $additionalPublications: [PublicationEnum]
    $landingPageGridPageSize: Int!
    $landingPageGridOffset: Int!
    $keywordsPageSize: Int!
    $keywordsOffset: Int!
  ) @api(name: cms) {
    environment(
      publication: $publication
      additionalPublications: $additionalPublications
    ) {
      routeByPath(path: $path) {
        canonical
        preferred
        statusCode
        object {
          ...ArticleFragment
          ...AuthorFragment
          ...LandingPageFragment
          ...OnmedaArticleFragment
          ...KeywordArticlesListFragment
          ...SponsorFragment
          ...NativeAdvertisingFragment
          ...VideoFragment
          ...PageFragment
          ...LegalAdviceChannelFragment
        }
      }
    }
  }

  ${articleFragment}
  ${authorFragment}
  ${landingPageFragment}
  ${explainingArticleFragment}
  ${keywordArticlesListFragment}
  ${sponsorFragment}
  ${nativeAdvertisingFragment}
  ${videoFragment}
  ${pageScreenFragment}
  ${legalAdviceChannelItemFragment}
`;
