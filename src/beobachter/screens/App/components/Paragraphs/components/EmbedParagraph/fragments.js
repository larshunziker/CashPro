/**
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
