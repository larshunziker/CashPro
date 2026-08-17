/**
 * @file   multi column paragraph graphql fragments
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2019-06-21
 *
 */

import { gql } from '@apollo/client';
import { imageParagraphFragment } from 'Paragraphs/components/ImageParagraph/fragments';

export const multiColumnParagraphFragment = gql`
  fragment MultiColumnParagraphFragment on MultiColumnParagraph {
    anchorId
    id
    style
    body {
      ...ImageParagraphFragment
    }
  }

  ${imageParagraphFragment}
`;
