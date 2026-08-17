/**
 * @file   input form paragraph graphql fragments
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2019-06-21
 *
 */

import { gql } from '@apollo/client';

export const inputFormParagraphFragment = gql`
  fragment InputFormParagraphFragment on InputFormParagraph {
    id
    anchorId
    webform
  }
`;
