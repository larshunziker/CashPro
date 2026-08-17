/**
 * @file    Text Paragraph fragments
 * @author  Grégory Witmer <gregory.witmer@ringieraxelspringer.ch>
 * @date    2019-05-07
 *
 */

import { gql } from '@apollo/client';

export const textParagraphFragment = gql`
  fragment TextParagraphFragment on TextParagraph {
    id
    anchorId
    header
    text
    characterCount
    isLastOfGroup
    styleValue
  }
`;
