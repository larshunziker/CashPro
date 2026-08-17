import { gql } from '@apollo/client';
import { keywordListFragment } from 'Keywords/components/KeywordList/fragments';

export const GET_KEYWORDS = gql`
  query KeywordListing($searchString: String!, $publication: PublicationEnum)
  @api(name: cms) {
    environment(publication: $publication) {
      keywordsByChar(searchString: $searchString, limit: 700) {
        ...KeywordListFragment
      }
    }
  }

  ${keywordListFragment}
`;
