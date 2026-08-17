/**
 *
 */

import { gql } from '@apollo/client';
import { keywordSearchResultFragment } from 'Keywords/screens/KeywordArticlesList/components/SearchResult/fragments';

export const keywordArticlesListFragment = gql`
  fragment KeywordArticlesListFragment on Keyword {
    label
    tid
    entities(
      publication: BEO
      offset: $keywordsOffset
      limit: $keywordsPageSize
    ) {
      count
      ...KeywordSearchResultFragment
    }
  }

  ${keywordSearchResultFragment}
`;
