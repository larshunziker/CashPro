import { gql } from '@apollo/client';
import { keywordSearchResultFragment } from './components/SearchResult/fragments';

export const keywordArticlesListFragment = gql`
  fragment KeywordArticlesListFragment on Keyword {
    label
    entities(offset: $keywordsOffset, limit: $keywordsPageSize) {
      count
      ...KeywordSearchResultFragment
    }
  }

  ${keywordSearchResultFragment}
`;
