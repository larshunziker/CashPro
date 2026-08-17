/* istanbul ignore file */

import { gql } from '@apollo/client';
import { contentBoxFragment } from '../../../ContentBox/fragments';

export const contentParagraphFragment = gql`
  fragment ContentParagraphFragment on ContentParagraph {
    id
    contentReference {
      ...ContentBoxFragment
    }
  }
  ${contentBoxFragment}
`;
