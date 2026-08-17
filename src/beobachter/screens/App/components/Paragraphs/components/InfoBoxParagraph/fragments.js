/**
 *
 */
import { gql } from '@apollo/client';
import { inputFormParagraphFragment } from '../WebformParagraph/fragments';
import { embedParagraphFragment } from 'Paragraphs/components/EmbedParagraph/fragments';
import { imageParagraphFragment } from 'Paragraphs/components/ImageParagraph/fragments';
import { ministageParagraphFragment } from 'Paragraphs/components/MinistageParagraph/fragments';
import { teaserParagraphFragment } from 'Paragraphs/components/TeaserParagraph/fragments';
import { textParagraphFragment } from 'Paragraphs/components/TextParagraph/fragments';

export const infoBoxParagraphFragment = gql`
  fragment InfoBoxParagraphFragment on InfoBoxParagraph {
    anchorId
    infoBox {
      isCollapsible
      style
      title
      body {
        ...EmbedParagraphFragment
        ...ImageParagraphFragment
        ...InputFormParagraphFragment
        ...LinkBoxParagraphFragment
        ...MinistageParagraphFragment
        ...TeaserParagraphFragment
        ...TextParagraphFragment
      }
    }
  }

  ${embedParagraphFragment}
  ${imageParagraphFragment}
  ${inputFormParagraphFragment}
  ${ministageParagraphFragment}
  ${teaserParagraphFragment}
  ${textParagraphFragment}
`;
