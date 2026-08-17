import { gql } from '@apollo/client';

export const blockquoteParagraphFragment = gql`
  fragment BlockquoteParagraphFragment on BlockquoteParagraph {
    anchorId
    id
    text
    source
  }
`;
