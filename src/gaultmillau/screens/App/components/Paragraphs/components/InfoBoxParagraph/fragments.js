/**
 * @file   info box paragraph fragments
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2019-05-09
 *
 */
import { gql } from '@apollo/client';
import { embedParagraphFragment } from 'Paragraphs/components/EmbedParagraph/fragments';
import { imageParagraphFragment } from 'Paragraphs/components/ImageParagraph/fragments';
import { linkBoxParagraphFragment } from 'Paragraphs/components/LinkBoxParagraph/fragments';
import { ministageParagraphFragment } from 'Paragraphs/components/MinistageParagraph/fragments';
import { teaserParagraphFragment } from 'Paragraphs/components/TeaserParagraph/fragments';
import { textParagraphFragment } from 'Paragraphs/components/TextParagraph/fragments';

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
        ...EmbedParagraphFragment
        ...LinkBoxParagraphFragment
        ...TeaserParagraphFragment
        ...MinistageParagraphFragment
      }
    }
  }

  ${imageParagraphFragment}
  ${textParagraphFragment}
  ${embedParagraphFragment}
  ${linkBoxParagraphFragment}
  ${ministageParagraphFragment}
  ${teaserParagraphFragment}
`;
