/**
 * @file   router queries
 *
 */

import { gql } from '@apollo/client';
import { articleFragment } from 'Article/fragments';
import { authorFragment } from 'Author/fragments';
import { branchFragment } from 'Branch/fragments';
import { dossierFragment } from 'Dossier/fragments';
import { explainingArticleFragment } from 'ExplainingArticle/fragments';
import { imageGalleryArticleFragment } from 'ImageGalleryArticle/fragments';
import { keywordArticlesListFragment } from 'Keywords/screens/KeywordArticlesList/fragments';
import { landingPageFragment } from 'LandingPage/fragments';
import { nativeAdvertisingFragment } from 'NativeAdvertising/fragments';
import { organizationFragment } from 'Organization/fragments';
import { pageScreenFragment } from 'PageScreen/fragments';
import { personFragment } from 'Person/fragments';
import { rankingFragment } from 'Ranking/fragments';
import { sponsorFragment } from 'Sponsor/fragments';
import { videoFragment } from 'Video/fragments';

export const ROUTER_ROUTE_BY_PATH_QUERY = gql`
  query RouteByPath(
    $path: String!
    $publication: PublicationEnum
    $additionalPublications: [PublicationEnum]
    $landingPageGridPageSize: Int!
    $landingPageGridOffset: Int!
    $branchPageSize: Int!
    $branchOffset: Int!
    $keywordsPageSize: Int!
    $keywordsOffset: Int!
    $dossierPageSize: Int!
    $dossierOffset: Int!
    $sponsorLimit: Int
    $sponsorSortBy: SortTypeEnum
    $sponsorSortOrder: SortOrderEnum
    $sponsorOffset: Int!
    $organizationOffset: Int
    $organizationLimit: Int
    $organizationSortBy: ArticleSortEnum
    $organizationSortOrder: SortOrderEnum
  ) {
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
          ...ExplainingArticleFragment
          ...ImageGalleryArticleFragment
          ...LandingPageFragment
          ...KeywordArticlesListFragment
          ...SponsorFragment
          ...NativeAdvertisingFragment
          ...DossierFragment
          ...OrganizationFragment
          ...BranchFragment
          ...PageScreenFragment
          ...VideoFragment
          ...RankingFragment
          ...PersonFragment
        }
      }
    }
  }

  ${articleFragment}
  ${authorFragment}
  ${explainingArticleFragment}
  ${imageGalleryArticleFragment}
  ${keywordArticlesListFragment}
  ${sponsorFragment}
  ${nativeAdvertisingFragment}
  ${dossierFragment}
  ${organizationFragment}
  ${branchFragment}
  ${pageScreenFragment}
  ${landingPageFragment}
  ${videoFragment}
  ${rankingFragment}
  ${personFragment}
`;
