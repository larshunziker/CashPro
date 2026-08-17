import { gql } from '@apollo/client';

const suggestionsQuery = gql`
  query GetSuggestions($SearchValue: String!) @api(name: "graphql-service") {
    suggestionsResults(searchValue: $SearchValue) {
      name
      type
    }
  }
`;

export default suggestionsQuery;
