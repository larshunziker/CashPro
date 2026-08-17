import { gql } from '@apollo/client';
import { explainingArticleListFragment } from './components/./ExplainingList/fragments';

export const GET_EXPLAINING_PAGE = gql`
  query Onmeda(
    $char: CharEnum!
    $publication: PublicationEnum
    $category: ExplainingArticleCategoryEnum!
  ) @api(name: cms) {
    environment(publication: $publication) {
      onmedaByChar(limit: 1000, char: $char, category: $category) {
        ...ExplainingArticleListFragment
      }
    }
  }

  ${explainingArticleListFragment}
`;
