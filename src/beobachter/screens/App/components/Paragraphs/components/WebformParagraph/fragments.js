import { gql } from '@apollo/client';

export const inputFormParagraphFragment = gql`
  fragment InputFormParagraphFragment on InputFormParagraph {
    id
    anchorId
    form
    headerText
    webform
  }
`;
