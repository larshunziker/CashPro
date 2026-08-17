import { gql } from '@apollo/client';

export const pianoTemplateParagraphFragment = gql`
  fragment PianoTemplateParagraphFragment on PianoTemplateParagraph {
    id
    offerId
    templateId
    templateVariantId
  }
`;
