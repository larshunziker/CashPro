/**
 *
 */

import { gql } from '@apollo/client';

export const textParagraphFragment = gql`
  fragment TextParagraphFragment on TextParagraph {
    id
    anchorId
    header
    text
    characterCount
    isLastOfGroup
    styleValue
  }
`;
