import { gql } from '@apollo/client';
import { pianoTemplateParagraphFragment } from '../PianoTemplateParagraph/fragments';
import { embedParagraphFragment } from 'Paragraphs/components/EmbedParagraph/fragments';
import { imageParagraphFragment } from 'Paragraphs/components/ImageParagraph/fragments';
import { textParagraphFragment } from 'Paragraphs/components/TextParagraph/fragments';

export const multiColumnParagraphFragment = gql`
  fragment MultiColumnParagraphFragment on MultiColumnParagraph {
    anchorId
    id
    style
    body {
      ...ImageParagraphFragment
      ...EmbedParagraphFragment
      ...TextParagraphFragment
      ...PianoTemplateParagraphFragment
    }
  }

  ${imageParagraphFragment}
  ${embedParagraphFragment}
  ${textParagraphFragment}
  ${pianoTemplateParagraphFragment}
`;
