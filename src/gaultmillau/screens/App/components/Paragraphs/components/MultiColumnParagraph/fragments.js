/**
 * @file   multiColumnParagraph graphql fragments
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2019-10-17
 *
 */

import { gql } from '@apollo/client';
import { textParagraphFragment } from 'Paragraphs/components/TextParagraph/fragments';
import { teaserParagraphFragment } from 'Paragraphs/components/TeaserParagraph/fragments';
import { ministageParagraphFragment } from 'Paragraphs/components/MinistageParagraph/fragments';
import { imageParagraphFragment } from 'Paragraphs/components/ImageParagraph/fragments';
import { embedParagraphFragment } from 'Paragraphs/components/EmbedParagraph/fragments';
import { linkBoxParagraphFragment } from 'Paragraphs/components/LinkBoxParagraph/fragments';

export const multiColumnParagraphFragment = gql`
  fragment MultiColumnParagraphFragment on MultiColumnParagraph {
    anchorId
    id
    featured
    style
    body {
      ...ImageParagraphFragment
      ...TextParagraphFragment
      ...EmbedParagraphFragment
      ...LinkBoxParagraphFragment
      ...MinistageParagraphFragment
      ...TeaserParagraphFragment
    }
  }

  ${imageParagraphFragment}
  ${textParagraphFragment}
  ${embedParagraphFragment}
  ${linkBoxParagraphFragment}
  ${ministageParagraphFragment}
  ${teaserParagraphFragment}
`;
