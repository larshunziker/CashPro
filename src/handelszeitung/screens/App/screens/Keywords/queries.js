import { gql } from '@apollo/client';
import { keywordListFragment } from 'Keywords/components/KeywordList/fragments';

export const GET_KEYWORD_LISTING = gql`
  query KeywordListing($searchString: String!, $publication: PublicationEnum) {
    environment(publication: $publication) {
      keywordsByChar(searchString: $searchString, limit: 500) {
        ...KeywordListFragment
      }
      routeByPath(path: "stichworte") {
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
  }

  ${keywordListFragment}
`;
