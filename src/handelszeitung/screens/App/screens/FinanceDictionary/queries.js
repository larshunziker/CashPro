import { gql } from '@apollo/client';
import { onmedaArticleListFragment } from 'FinanceDictionary/components/EntriesList/fragments';

export const GET_ONMEDA_LISTING = gql`
  query Onmeda(
    $char: CharEnum!
    $publication: PublicationEnum
    $category: ExplainingArticleCategoryEnum!
  ) {
    environment(publication: $publication) {
      onmedaByChar(char: $char, category: $category) {
        ...OnmedaArticleListFragment
      }
    }
    routeByPath(path: "finanzlexikon") {
      canonical
      preferred
      object {
        ... on LandingPage {
          publication
          id
          nid
          gcid
          title
          shortTitle
          preferredUri
          changeDate: changedDate
          createDate
          publicationDate
          metaCanonicalUrl
          sponsor {
            id
            title
          }
          channel {
            id
            title
            suppressAds
          }
        }
      }
    }
  }

  ${onmedaArticleListFragment}
`;
