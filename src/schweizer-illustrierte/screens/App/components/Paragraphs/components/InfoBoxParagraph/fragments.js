import { gql } from '@apollo/client';
import { embedParagraphFragment } from 'Paragraphs/components/EmbedParagraph/fragments';
import { imageParagraphFragment } from 'Paragraphs/components/ImageParagraph/fragments';
import { textParagraphFragment } from 'Paragraphs/components/TextParagraph/fragments';

export const infoBoxParagraphFragment = gql`
  fragment InfoBoxParagraphFragment on InfoBoxParagraph {
    anchorId
    infoBox {
      isCollapsible
      title
      body {
        ...EmbedParagraphFragment
        ...ImageParagraphFragment
        ...TextParagraphFragment
      }
    }
  }

  ${imageParagraphFragment}
  ${embedParagraphFragment}
  ${textParagraphFragment}
`;
