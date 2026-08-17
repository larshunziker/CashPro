import { gql } from '@apollo/client';
import { contentBoxFragment } from '../ContentBox/fragments';

export const EDITORIALS_PICKS_QUERY = gql`
  query EditorialsPicks(
    $title: String!
    $contentTypes: [ContentTypeEnum]
    $publication: PublicationEnum
    $additionalPublications: [PublicationEnum]
  ) @api(name: cms) {
    environment(
      publication: $publication
      additionalPublications: $additionalPublications
    ) {
      content(name: $title, contentTypes: $contentTypes) {
        edges {
          node {
            ...ContentBoxFragment
          }
        }
      }
    }
  }
  ${contentBoxFragment}
`;
