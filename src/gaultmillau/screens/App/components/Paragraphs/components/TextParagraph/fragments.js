import { gql } from '@apollo/client';

export const textParagraphFragment = gql`
  fragment TextParagraphFragment on TextParagraph {
    anchorId
    id
    header
    text
    styleValue
  }
`;
