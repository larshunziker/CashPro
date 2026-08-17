import { gql } from '@apollo/client';
import { embedParagraphFragment } from '../EmbedParagraph/fragments';
import { imageParagraphFragment } from '../ImageParagraph/fragments';
import { linkBoxParagraphFragment } from '../LinkBoxParagraph/fragments';
import { ministageParagraphFragment } from '../MinistageParagraph/fragments';
import { teaserParagraphFragment } from '../TeaserParagraph/fragments';
import { textParagraphFragment } from '../TextParagraph/fragments';

export const infoBoxParagraphFragment = gql`
  fragment InfoBoxParagraphFragment on InfoBoxParagraph {
    anchorId
    infoBox {
      style
      isCollapsible
      title
      body {
        ...ImageParagraphFragment
        ...TextParagraphFragment
        ...TeaserParagraphFragment
        ...EmbedParagraphFragment
        ...LinkBoxParagraphFragment
        ...MinistageParagraphFragment
      }
    }
  }

  ${imageParagraphFragment}
  ${textParagraphFragment}
  ${teaserParagraphFragment}
  ${embedParagraphFragment}
  ${linkBoxParagraphFragment}
  ${ministageParagraphFragment}
`;
