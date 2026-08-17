import { gql } from '@apollo/client';
import { keywordListFragment } from './components/KeywordList/fragments';

export const GET_KEYWORDS_QUERY = gql`
  query KeywordListing(
    $searchString: String
    $publication: PublicationEnum
    $offset: Int
    $pageSize: Int
  ) {
    environment(publication: $publication) {
      keywordsByChar(
        searchString: $searchString
        offset: $offset
        limit: $pageSize
      ) {
        ...KeywordListFragment
      }
    }
  }

  ${keywordListFragment}
`;
