import { gql } from '@apollo/client';
import { dictionaryArticleListFragment } from 'Dictionary/components/EntriesList/fragments';

export const GET_DICTIONARY_LISTING = gql`
  query Onmeda(
    $char: CharEnum!
    $publication: PublicationEnum
    $category: ExplainingArticleCategoryEnum!
  ) @api(name: cms) {
    environment(publication: $publication) {
      onmedaByChar(char: $char, category: $category) {
        ...DictionaryArticleListFragment
      }
    }
    routeByPath(path: "Boersenlexikon") {
      canonical
      preferred
      object {
        ... on LandingPage {
          publication
          id
          gcid
          nid
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

  ${dictionaryArticleListFragment}
`;
