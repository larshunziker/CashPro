import { gql } from '@apollo/client';

export const SAVE_WEBFORM = gql`
  mutation SaveWebform($input: String, $webformId: String!) @api(name: cms) {
    saveWebform(input: $input, webform_id: $webformId) {
      status
      message
      error
    }
  }
`;
