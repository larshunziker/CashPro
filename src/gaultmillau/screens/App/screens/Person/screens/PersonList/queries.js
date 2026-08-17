import { gql } from '@apollo/client';
import { personListItemsFragment } from '../../components/PersonListItems/fragments';

export const GET_PERSON_LIST_QUERY = gql`
  query PersonByChar($char: CharEnum!, $publication: PublicationEnum) {
    environment(publication: $publication) {
      personByChar(char: $char, type: chiefcook, limit: 1000) {
        ...PersonListItemsFragment
      }
    }
  }

  ${personListItemsFragment}
`;
