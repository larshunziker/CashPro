/**
 * @file   embed paragraph fragment
 * @author Alexandra Geier <alexandra.geier@ringieraxelspringer.ch>
 * @date   2019-05-14
 *
 */

import { gql } from '@apollo/client';

export const embedParagraphFragment = gql`
  fragment EmbedParagraphFragment on EmbedParagraph {
    anchorId
    header
    embedCode
    embedWidth
    autoAdjustHeight
    disableLazyloading
    disableCookieConsent
  }
`;
