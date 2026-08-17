import { gql } from '@apollo/client';
import { articleFragment } from '../../screens/Article/fragments';
import { keywordArticlesListFragment } from '../../screens/Keywords/screens/KeywordArticlesList/fragments';
import { landingPageFragment } from '../../screens/LandingPage/fragments';
import { organizationFragment } from '../../screens/Organization/fragments';
import { pageScreenFragment } from '../../screens/PageScreen/fragments';
import { recipeFragment } from '../../screens/Recipe/fragments';
import { authorFragment } from 'Author/fragments';

export const ROUTER_ROUTE_BY_PATH_QUERY = gql`
  query RouteByPath(
    $path: String!
    $landingPageGridLimit: Int!
    $landingPageGridOffset: Int!
    $keywordsPageSize: Int!
    $keywordsOffset: Int!
    $publication: PublicationEnum
    $language: String
    $additionalPublications: [PublicationEnum!]
  ) {
    environment(publication: $publication, language: $language, additionalPublications: $additionalPublications) {
      routeByPath(path: $path) {
        canonical
        preferred
        object {
          ...ArticleFragment
          ...AuthorFragment
          ...OrganizationFragment
          ...LandingPageFragment
          ...RecipeFragment
          ...KeywordArticlesListFragment
          ...PageScreenFragment
        }
      }
    }
  }

  ${landingPageFragment}
  ${recipeFragment}
  ${articleFragment}
  ${authorFragment}
  ${organizationFragment}
  ${keywordArticlesListFragment}
  ${pageScreenFragment}
`;
